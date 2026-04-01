import { Global, Module } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Global()
@Module({
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}


// import { forwardRef, Module } from "@nestjs/common";
// import { StripeService } from "./stripe.service";
// import { StripeController } from "../modules/payments/stripe.controller";
// import { BookingsModule } from "../modules/booking/bookings.module";

// @Module({
//   imports: [forwardRef(()=>BookingsModule)],
//   controllers: [StripeController],
//   providers: [StripeService],
//   exports: [StripeService],
// })
// export class StripeModule {}
