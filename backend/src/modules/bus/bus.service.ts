import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BusService {
  constructor(private prisma: PrismaService) {}

  async getAllBuses() {
    return this.prisma.bus.findMany();
  }

  generateBookingId() {
    return (
      'BUS' +
      Date.now().toString().slice(-6) +
      Math.floor(100 + Math.random() * 900)
    );
  }

  async createBooking(data: CreateBookingDto) {
    return this.prisma.busBooking.create({
      data: {
        bookingId: this.generateBookingId(),
        busId: data.busId,
        seats: data.seats,
        passengerName: data.passengerName,
        passengerAge: data.passengerAge,
        passengerGender: data.passengerGender,
        totalAmount: data.totalAmount,
        paymentStatus: 'PAID',
      },
    });
  }
}