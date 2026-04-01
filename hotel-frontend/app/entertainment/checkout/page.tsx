"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();

  const seatsData = params.get("seats");
  const seats = seatsData ? JSON.parse(seatsData) : [];

  const total = seats.reduce((sum: number, s: any) => sum + s.price, 0);

  if (!seats.length) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p>No seats selected</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Booking Summary */}
      <div className="bg-[#111] p-6 rounded mb-6">
        <h2 className="text-xl mb-4">Booking Summary</h2>

        <p className="mb-2">
          Seats: {seats.map((s: any) => s.id).join(", ")}
        </p>

        <p className="text-xl font-bold">Total: ₹{total}</p>
      </div>

      {/* Payment Options */}
      <div className="bg-[#111] p-6 rounded mb-6">
        <h2 className="text-xl mb-4">Payment</h2>

        <div className="flex flex-col gap-3">
          <button className="bg-indigo-600 py-2 rounded">
            Pay with UPI
          </button>
          <button className="bg-indigo-600 py-2 rounded">
            Pay with Card
          </button>
          <button className="bg-indigo-600 py-2 rounded">
            Net Banking
          </button>
        </div>
      </div>

      {/* Confirm */}
      <button
        onClick={() => router.push("/entertainment/success")}
        className="w-full py-3 bg-green-600 rounded text-lg font-bold"
      >
        Confirm Booking
      </button>
    </div>
  );
}