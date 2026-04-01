import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateFlightBookingDto } from './dto/create-flight-booking.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class FlightService {
  constructor(private prisma: PrismaService) {}

  private generatePNR(): string {
    return randomBytes(3).toString('hex').toUpperCase();
  }

  async createBooking(userId: string, dto: CreateFlightBookingDto) {
    const pnr = this.generatePNR();

    const booking = await this.prisma.flightBooking.create({
      data: {
        userId,
        flightNo: dto.flightNo,
        airline: dto.airline,
        from: dto.from,
        to: dto.to,
        departure: new Date(dto.departure),
        arrival: new Date(dto.arrival),
        totalAmount: dto.totalAmount,
        pnr,
        passengers: {
          create: dto.passengers.map((p) => ({
            title: p.title,
            firstName: p.firstName,
            lastName: p.lastName,
            gender: p.gender,
            dob: new Date(p.dob),
            mealPref: p.mealPref,
            baggage: p.baggage,
          })),
        },
      },
      include: { passengers: true },
    });

    // Seat assignment
    for (let i = 0; i < dto.seatNumbers.length; i++) {
      await this.prisma.seatAssignment.create({
        data: {
          bookingId: booking.id,
          passengerId: booking.passengers[i].id,
          seatNumber: dto.seatNumbers[i],
        },
      });
    }

    return booking;
  }

  async getBookingByPNR(pnr: string) {
    return this.prisma.flightBooking.findUnique({
      where: { pnr },
      include: { passengers: true, seats: true },
    });
  }
}