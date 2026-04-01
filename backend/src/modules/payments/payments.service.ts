import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { PrismaService } from "../../prisma/prisma.services";
import { BookingService } from "../booking/booking.service";
import { BookingStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  private stripe?: Stripe;

  constructor(
    private prisma: PrismaService,
    private bookingService: BookingService
  ) {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn("⚠️ Stripe secret key not provided. Payments disabled.");
      return;
    }

    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover", // use stable official version
    });
  }

  async createCheckoutSession(bookingId: string) {
    const stripe = this.stripe;

    if (!stripe) {
      throw new Error("Stripe is not configured");
    }

    const booking = await this.bookingService.findById(bookingId);

    if (!booking) {
      throw new Error("Booking not found");
    }

    // if (booking.status !== "PENDING_PAYMENT") {
    //   throw new Error("Booking already processed");
    // }
    if (booking.status === BookingStatus.CONFIRMED) {
      throw new Error("Booking already confirmed");
    }

    if (booking.status === BookingStatus.CANCELLED) {
      throw new Error("Booking cancelled");
    }

    if (booking.expiresAt && booking.expiresAt < new Date()) {
      throw new Error("Booking expired");
    }


    const room = await this.prisma.room.findUnique({
      where: { id: booking.roomId },
    });

    if (!room) {
      throw new Error("Room not found");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: room.name,
            },
            unit_amount: Math.round(booking.totalAmount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId: booking.id,
      },
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    await this.prisma.booking.update({
      where: { id: booking.id },
      data: {
        stripeSessionId: session.id,
      },
    });


    return { url: session.url };
  }

  async handleStripeWebhook(signature: string, payload: Buffer) {
    const stripe = this.stripe;

    if (!stripe) {
      throw new Error("Stripe is not configured");
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error("Stripe webhook secret not configured");
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const bookingId = session.metadata?.bookingId;

      if (!bookingId) return;

      const booking = await this.bookingService.findById(bookingId);

      if (!booking) return;

      if (booking.status === BookingStatus.CONFIRMED) {
        return; // prevent duplicate webhook processing
      }

      await this.prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.CONFIRMED,
          stripePaymentId: session.payment_intent as string,
        },
      });

      await this.bookingService.confirmBooking(bookingId);
    }

    return { received: true };
  }
}
