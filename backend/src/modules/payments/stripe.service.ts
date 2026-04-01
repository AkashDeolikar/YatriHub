import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-01-28.clover",
    });
  }

  async createCheckoutSession(
    bookingId: string,
    amount: number
  ) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Hotel Booking ${bookingId}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId,
      },

      payment_intent_data: {
        metadata: {
          bookingId,
        },
      },

      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    return session;
  }
}

// import { Injectable } from "@nestjs/common";
// import Stripe from "stripe";

// @Injectable()
// export class StripeService {
//   private stripe: Stripe;

//   constructor() {
//     this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//       apiVersion: "2026-01-28.clover",
//     });
//   }

//   async createCheckoutSession(
//     bookingId: string,
//     amount: number
//   ) {
//     return this.stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: "Hotel Room Booking",
//             },
//             unit_amount: amount * 100, // Stripe uses paise
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         bookingId,
//       },
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//     });
//   }
// }
