import {Controller, Post, Req, Headers, HttpCode} from '@nestjs/common';
import { Request } from 'express';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';
import { BookingService } from '../booking/booking.service';

@Controller('stripe')
export class StripeController {
  private stripe: Stripe;

  constructor(
    private readonly stripeService: StripeService,
    private readonly bookingService: BookingService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-01-28.clover',
    });
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret,
      );
    } catch (err) {
      console.log('Webhook signature verification failed.');
      throw err;
    }

    // Payment successful
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        await this.bookingService.confirmBooking(bookingId);
      }
    }

    return { received: true };
  }
}

// import { Controller, Post, Param } from "@nestjs/common";
// import { StripeService } from "./stripe.service";

// @Controller("payments")
// export class StripeController {
//   constructor(private readonly stripeService: StripeService) {}

//   @Post("create-session/:bookingId")
//   async createSession(@Param("bookingId") bookingId: string) {
//     return this.stripeService.createCheckoutSession(
//       bookingId,
//       5000 // ₹5000 example
//     );
//   }
// }
