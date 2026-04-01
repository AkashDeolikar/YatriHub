import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import Stripe from "stripe";
import { BookingService } from "../../booking/booking.service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

@Controller("payments/webhook/stripe")
export class StripeWebhookController {
  constructor(
    private readonly bookingService: BookingService
  ) {}

  @Post()
  async handle(
    @Req() req: Request & { rawBody?: Buffer },
    @Res() res: Response
  ) {
    const sig = req.headers["stripe-signature"];

    if (!sig || !req.rawBody) {
      return res.status(400).send("Invalid webhook");
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      return res.status(400).send("Invalid signature");
    }

    // 🔒 Idempotency check
    const alreadyProcessed =
      await this.bookingService.isStripeEventProcessed(event.id);

    if (alreadyProcessed) {
      return res.status(200).json({ received: true });
    }

    // ✅ Handle event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        await this.bookingService.confirmBooking(bookingId);
      }
    }

    // mark event as processed
    await this.bookingService.markStripeEventProcessed(event.id);

    return res.status(200).json({ received: true });
  }
}