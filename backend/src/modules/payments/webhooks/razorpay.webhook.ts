import { Controller, Post, Req, Headers } from "@nestjs/common";
import * as crypto from "crypto";

@Controller("payments/webhook/razorpay")
export class RazorpayWebhookController {
  @Post()
  handle(
    @Req() req: any,
    @Headers("x-razorpay-signature") signature: string
  ) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    const expected = crypto
      .createHmac("sha256", secret)
      .update(req.rawBody)
      .digest("hex");

    if (expected !== signature) {
      throw new Error("Invalid signature");
    }

    const body = JSON.parse(req.rawBody.toString());

    if (body.event === "payment.captured") {
      const bookingId = body.payload.payment.entity.notes.bookingId;
      console.log("✅ Razorpay payment success:", bookingId);
    }

    return { status: "ok" };
  }
}
