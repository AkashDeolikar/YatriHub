"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();

  const seatsData = params.get("seats");
  const movie = params.get("movie") || "Movie";
  const theatre = params.get("theatre") || "Cinema";
  const time = params.get("time") || "Time";

  const seats = seatsData ? JSON.parse(seatsData) : [];

  const [payment, setPayment] = useState("upi");

  const subtotal = seats.reduce((sum: number, s: any) => sum + s.price, 0);
  const fee = Math.round(subtotal * 0.05);
  const total = subtotal + fee;

  if (!seats.length) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p>No seats selected</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-20 py-10">

      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-bold mb-10">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* 🎟 LEFT: SUMMARY */}
        <div className="space-y-6">

          {/* MOVIE */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur">
            <h2 className="text-xl font-semibold mb-4">
              Booking Details
            </h2>

            <div className="space-y-2 text-sm text-gray-300">
              <p><span className="text-gray-500">Movie:</span> {movie}</p>
              <p><span className="text-gray-500">Theatre:</span> {theatre}</p>
              <p><span className="text-gray-500">Time:</span> {time}</p>
              <p><span className="text-gray-500">Seats:</span> {seats.map((s: any) => s.id).join(", ")}</p>
            </div>
          </div>

          {/* 💰 PRICE */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur">
            <h2 className="text-xl font-semibold mb-4">
              Price Details
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Convenience Fee</span>
                <span>₹{fee}</span>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

        </div>

        {/* 💳 RIGHT: PAYMENT */}
        <div className="space-y-6">

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur">
            <h2 className="text-xl font-semibold mb-4">
              Select Payment Method
            </h2>

            <div className="space-y-3">

              {[
                { id: "upi", label: "UPI / Google Pay / PhonePe" },
                { id: "card", label: "Credit / Debit Card" },
                { id: "netbanking", label: "Net Banking" },
              ].map((method) => (
                <div
                  key={method.id}
                  onClick={() => setPayment(method.id)}
                  className={`p-4 rounded-lg cursor-pointer border transition-all
                  ${
                    payment === method.id
                      ? "border-indigo-500 bg-indigo-500/20"
                      : "border-white/10 hover:bg-white/10"
                  }`}
                >
                  {method.label}
                </div>
              ))}

            </div>
          </div>

          {/* 🔒 TRUST */}
          <div className="text-xs text-gray-500">
            🔒 100% secure payments • No refund after booking
          </div>

        </div>

      </div>

      {/* 🚀 STICKY PAY BUTTON */}
      <div className="fixed bottom-0 left-0 w-full bg-black/95 border-t border-white/10 px-6 py-4 flex justify-between items-center">

        <div>
          <p className="text-sm text-gray-400">Total Payable</p>
          <p className="text-xl font-bold">₹{total}</p>
        </div>

        <button
          onClick={() =>
            router.push(
              `/entertainment/success?movie=${movie}&seats=${seats
                .map((s: any) => s.id)
                .join(",")}&time=${time}&theatre=${theatre}&total=${total}`
            )
          }
          className="px-8 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-500 transition"
        >
          Pay Now
        </button>

      </div>
    </div>
  );
}