import { Injectable, BadRequestException, NotFoundException, UnauthorizedException} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.services";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { BookingStatus } from "@prisma/client"
// import { StripeService } from "../payments/stripe.service";
import { StripeService } from "src/stripe/stripe.service";
import { EmailService } from "../mail/email.service";
import { InvoiceService } from "../invoice/invoice.service";
@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeService: StripeService,
    private readonly emailService: EmailService,
    private invoiceService: InvoiceService,
  ) { }
  // -----------------------------
  // Stripe idempotency (placeholder for now)
  // -----------------------------
  async isStripeEventProcessed(eventId: string) {
    const event = await this.prisma.stripeEvent.findUnique({
      where: { id: eventId },
    });

    return !!event; // true if found
  }

  async markStripeEventProcessed(eventId: string) {
    await this.prisma.stripeEvent.create({
      data: { id: eventId },
    });
  }

  // -----------------------------
  // Confirm booking after payment
  // -----------------------------
  async confirmBooking(id: string) {
    const booking = await this.prisma.booking.update({
      where: { id },
      data: {
        status: BookingStatus.CONFIRMED,
        paidAt: new Date(),
      },
      include: {
        user: true,
      },
    });
    // Generate Invoice
  const invoicePath = await this.invoiceService.generateInvoice(booking);
    await this.emailService.sendBookingConfirmation(
      booking.user.email,
      booking.id,
      booking.checkIn,
      booking.checkOut,
      booking.totalAmount,
      invoicePath,
    );
    return booking;
  }


  // -----------------------------
  // Find booking by ID
  // -----------------------------
  async findById(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
    });
  }


  // -----------------------------
  // Create Booking (with overlap protection)
  // -----------------------------
  // async create(dto: CreateBookingDto) 
  async createBooking(userId: string, dto: CreateBookingDto) {
    // Check if room is already booked in selected date range
    const overlappingBooking = await this.prisma.booking.findFirst({
      where: {
        roomId: dto.roomId,
        status: {
          in: [BookingStatus.PENDING_PAYMENT, BookingStatus.CONFIRMED], // ignore cancelled
        },
        AND: [
          {
            checkIn: {
              lt: new Date(dto.checkOut),
            },
          },
          {
            checkOut: {
              gt: new Date(dto.checkIn),
            },
          },
        ],
      },
    });

    if (overlappingBooking) {
      throw new BadRequestException(
        'Room is not available for selected dates',
      );
    }

    const checkInDate = new Date(dto.checkIn);
    const checkOutDate = new Date(dto.checkOut);

    if (
      isNaN(checkInDate.getTime()) ||
      isNaN(checkOutDate.getTime())
    ) {
      throw new BadRequestException("Invalid date format");
    }

    // if (checkInDate >= checkOutDate) {
    //   throw new BadRequestException("Check-out must be after check-in");
    // }


    const checkIn = new Date(dto.checkIn);
    const checkOut = new Date(dto.checkOut);

    // if (checkOut <= checkIn) {
    //   throw new Error("Invalid date range");
    // }

    const room = await this.prisma.room.findUnique({
      where: { id: dto.roomId },
    });

    if (!room) {
      throw new NotFoundException("Room not found");
    }

    const available = await this.isRoomAvailable(
      dto.roomId,
      checkIn,
      checkOut
    );

    if (!available) {
      throw new BadRequestException("Room not available for selected dates");
    }

    const nights =
      (checkOut.getTime() - checkIn.getTime()) /
      (1000 * 60 * 60 * 24);

    const totalAmount = nights * room.price;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const booking = await this.prisma.booking.create({
      data: {
        userId,
        roomId: dto.roomId,
        checkIn,
        checkOut,
        totalAmount,
        status: BookingStatus.PENDING_PAYMENT,
        expiresAt,
      },
    });

    const session = await this.stripeService.createCheckoutSession(
      booking.id,
      totalAmount,
    );

    return {
      booking,
      checkoutUrl: session.url,
    };
  }

  //Get Unavailable booking
  async getUnavailableDates(roomId: string) {
  const bookings = await this.prisma.booking.findMany({
    where: {
      roomId,
      status: {
        in: [BookingStatus.CONFIRMED, BookingStatus.PENDING_PAYMENT],
      },
    },
    select: {
      checkIn: true,
      checkOut: true,
    },
  });

  return bookings;
}

  //cancel booking
  // async cancelBooking(id: string) {
  //   const booking = await this.prisma.booking.findUnique({
  //     where: { id },
  //   });

  //   if (!booking) {
  //     throw new NotFoundException("Booking not found");
  //   }

  //   if (booking.status === "CANCELLED") {
  //     throw new BadRequestException("Booking already cancelled");
  //   }

  //   return this.prisma.booking.update({
  //     where: { id },
  //     data: { status: "CANCELLED" },
  //   });
  // }
  // booking.service.ts

async cancelBooking(id: string, userId: string) { // Added userId here
  const booking = await this.prisma.booking.findUnique({
    where: { id }
  });

  // Now you can actually use the userId to verify ownership!
  if (!booking || booking.userId !== userId) {
    throw new UnauthorizedException('You do not own this booking');
  }

  return this.prisma.booking.update({
    where: { id },
    data: { status: 'CANCELLED' },
  });
}

  //Backend Admin Stats Endpoint
  async getAdminStats() {
    const totalBookings = await this.prisma.booking.count();
    const confirmedBookings = await this.prisma.booking.count({
      where: { status: "CONFIRMED" },
    });
    const cancelledBookings = await this.prisma.booking.count({
      where: { status: "CANCELLED" },
    });
    const revenue = await this.prisma.booking.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: "CONFIRMED",
      },
    });

    return {
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      totalRevenue: revenue._sum.totalAmount || 0,
    };
  }

  // -----------------------------
  // Auto-cancel expired bookings (10 min rule)
  // -----------------------------
  async cancelExpiredBookings() {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    return this.prisma.booking.updateMany({
      where: {
        status: BookingStatus.PENDING_PAYMENT,
        createdAt: {
          lt: tenMinutesAgo,
        },
      },
      data: {
        status: BookingStatus.CANCELLED,
      },
    });
  }

  async getUserBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        room: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async isRoomAvailable(
    roomId: string,
    checkIn: Date,
    checkOut: Date
  ) {
    const overlappingBooking = await this.prisma.booking.findFirst({
      where: {
        roomId,
        status: {
          not: BookingStatus.CANCELLED,
        },
        checkIn: {
          lt: checkOut,
        },
        checkOut: {
          gt: checkIn,
        },
      },
    });
    return !overlappingBooking;
  }

  async getAllBookings(
    page: number,
    limit: number,
    status?: BookingStatus
  ) {
    const skip = (page - 1) * limit;

    const whereCondition = status
      ? { status }
      : undefined;

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where: whereCondition,
        include: {
          room: true,
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      this.prisma.booking.count({
        where: whereCondition,
      }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: bookings,
    };
  }

  async getAnalytics() {
    const totalBookings = await this.prisma.booking.count();

    const confirmedBookings = await this.prisma.booking.count({
      where: { status: "CONFIRMED" },
    });

    const cancelledBookings = await this.prisma.booking.count({
      // where: { status: "CANCELLED" },
      where: { status: BookingStatus.CANCELLED },
    });

    const revenue = await this.prisma.booking.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: { status: "CONFIRMED" },
    });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyRevenue = await this.prisma.booking.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: "CONFIRMED",
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    return {
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      totalRevenue: revenue._sum.totalAmount || 0,
      monthlyRevenue: monthlyRevenue._sum.totalAmount || 0,
    };
  }
}
console.log(BookingStatus.CONFIRMED);