import { Module } from "@nestjs/common";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { PrismaModule } from "../../prisma/prisma.module";
import { StripeModule } from "../../stripe/stripe.module";
import { MailModule } from "../mail/mail.module";
import { InvoiceModule } from "../invoice/invoice.module";

@Module({
  imports: [PrismaModule, StripeModule, MailModule, InvoiceModule],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingsModule {}

// import { forwardRef, Module } from "@nestjs/common";
// import { BookingController } from "./booking.controller";
// import { BookingService } from "./booking.service";
// import { PrismaModule } from "../../prisma/prisma.module";
// import { StripeModule } from "../../stripe/stripe.module";

// @Module({
//   imports: [PrismaModule, StripeModule],
//   controllers: [BookingController],
//   providers: [BookingService],
//   // exports: [BookingService],
// })
// export class BookingsModule {}
