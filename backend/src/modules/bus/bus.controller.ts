import { Controller, Get, Post, Body } from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Get()
  getBuses() {
    return this.busService.getAllBuses();
  }

  @Post('book')
  bookBus(@Body() body: CreateBookingDto) {
    return this.busService.createBooking(body);
  }
}