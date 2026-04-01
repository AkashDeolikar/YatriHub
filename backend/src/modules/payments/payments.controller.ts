import {
  Controller,
  Post,
  Param,
  Req,
  Headers,
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { Request } from "express";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("checkout/:bookingId")
  createCheckout(@Param("bookingId") bookingId: string) {
    return this.paymentsService.createCheckoutSession(bookingId);
  }

  @Post("webhook/stripe")
  async handleWebhook(
    @Req() req: Request,
    @Headers("stripe-signature") signature: string
  ) {
    return this.paymentsService.handleStripeWebhook(
      signature,
      req.body
    );
  }
}
