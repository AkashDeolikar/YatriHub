import { Controller, Post, Body, Get, Param, Req, UseGuards } from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightBookingDto } from './dto/create-flight-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('flights')
export class FlightController {
  constructor(private flightService: FlightService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('book')
  async create(
    @Req() req: Request & { user: any },
    @Body() dto: CreateFlightBookingDto,
  ) {
    return this.flightService.createBooking(req.user.id, dto);
  }

  @Get(':pnr')
  async getByPNR(@Param('pnr') pnr: string) {
    return this.flightService.getBookingByPNR(pnr);
  }
}