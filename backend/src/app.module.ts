import { Module } from "@nestjs/common";
import { PaymentsModule } from "./modules/payments/payments.module";
import { BookingsModule } from "./modules/booking/bookings.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from "./modules/auth/auth.module";
import { RoomsController } from "./modules/rooms/rooms.controller";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./common/guards/roles.guard";
import { StripeModule } from "./stripe/stripe.module";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { AuthController } from "./modules/auth/auth.controller";
import { AuthService } from "./modules/auth/auth.service";
import { MailModule } from "./modules/mail/mail.module";
import { InvoiceModule } from "./modules/invoice/invoice.module";
import { FoodModule } from './modules/food/food.module';
import { BusModule } from "./modules/bus/bus.module";
import { FlightModule } from "./modules/flight/flight.module";

@Module({
    imports: [
    RoomsModule,
    BookingsModule,
    PaymentsModule,
    PrismaModule,
    StripeModule,
    AuthModule,
    ScheduleModule.forRoot(),
    MailModule,
    InvoiceModule,
    FoodModule,
    BusModule,
    FlightModule,
  ],
    // controllers: [RoomsController],
})
export class AppModule { }
