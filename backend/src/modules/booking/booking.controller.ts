import { Controller, Post, Body, UseGuards, Req, Get, Patch, Param } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Query } from "@nestjs/common";
import { BookingStatus } from "@prisma/client";
import { AdminBookingQueryDto } from "./dto/admin-booking-query.dto";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from "../auth/role.enum";

@Controller("bookings")
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createBooking(
    @Req() req: Request & { user: { userId: string } },
    @Body() dto: CreateBookingDto
  ) {
    return this.bookingService.createBooking(req.user.userId, dto);
  }

  // @Patch("cancel/:id")
  // async cancelBooking(@Param("id") id: string) {
  //   return this.bookingService.cancelBooking(id);
  // }
  @Patch("cancel/:id")
  @UseGuards(AuthGuard("jwt"))
  cancelBooking(
    @Param("id") id: string,
    @Req() req: Request & { user: { userId: string } }
  ) {
    return this.bookingService.cancelBooking(id, req.user.userId);
  }

  @Get("my")
  @UseGuards(AuthGuard("jwt"))
  getMyBookings(
    @Req() req: Request & { user: { userId: string } }
  ) {
    return this.bookingService.getUserBookings(req.user.userId);
  }

  @Get("admin/analytics")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(Role.ADMIN)
  getAnalytics() {
    return this.bookingService.getAnalytics();
  }

  @Get("admin/all")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(Role.ADMIN)
  getAllBookings(@Query() query: AdminBookingQueryDto) {
    return this.bookingService.getAllBookings(
      query.page ?? 1,
      query.limit ?? 10,
      query.status
    );
  }

  // @Get("admin/stats")
  // async getStats() {
  //   return this.bookingService.getAdminStats();
  // }
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(Role.ADMIN)
  @Get("admin/stats")
  async getStats() {
    return this.bookingService.getAdminStats();
  }

  @Get("room/:roomId/unavailable")
  getUnavailableDates(@Param("roomId") roomId: string) {
    return this.bookingService.getUnavailableDates(roomId);
  }

}
