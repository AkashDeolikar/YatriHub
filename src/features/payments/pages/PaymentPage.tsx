import { createPayment } from "../services/paymentApi";

export default function PaymentPage() {
  const pay = async () => {
    const res = await createPayment({
      amount: 9000,
      currency: "INR",
      provider: "razorpay",
      bookingId: "bk_123",
    });

    console.log(res.data);
  };

  return <button onClick={pay}>Pay Now</button>;
}
