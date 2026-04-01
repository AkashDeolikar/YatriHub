import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { BookingService } from "./booking.service";

@Injectable()
export class BookingScheduler {
  constructor(private readonly bookingService: BookingService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleExpiredBookings() {
    await this.bookingService.cancelExpiredBookings();
  }
}
