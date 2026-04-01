import { Module } from "@nestjs/common";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { PrismaModule } from "../../prisma/prisma.module";
import { BookingsModule } from "../booking/bookings.module";
import { StripeController } from "./stripe.controller";
import { StripeService } from "./stripe.service";

@Module({
  imports: [PrismaModule, BookingsModule],
  controllers: [PaymentsController, StripeController],
  providers: [PaymentsService, StripeService],
  exports: [StripeService],
})
export class PaymentsModule {}
