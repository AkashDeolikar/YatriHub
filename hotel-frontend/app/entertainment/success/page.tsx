"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();

  const movie = params.get("movie") || "Movie";
  const seats = params.get("seats") || "N/A";
  const time = params.get("time") || "N/A";
  const theatre = params.get("theatre") || "Cinema";
  const total = params.get("total") || "0";

  const bookingId = "BK" + Math.floor(Math.random() * 1000000);

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-4 py-12">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-4xl">

        {/* SUCCESS HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-green-500 mb-3 animate-pulse">
            🎉 Booking Confirmed
          </h1>
          <p className="text-gray-400">
            Your seats are reserved. Enjoy your show 🍿
          </p>
        </div>

        {/* 🎟 TICKET */}
        <div className="relative bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.8)]">

          {/* SIDE CUT EFFECT */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full" />

          {/* CONTENT */}
          <div className="grid md:grid-cols-2">

            {/* LEFT - MOVIE INFO */}
            <div className="p-8 space-y-4 border-b md:border-b-0 md:border-r border-white/10">

              <h2 className="text-2xl font-bold">{movie}</h2>

              <div className="text-sm text-gray-400 space-y-2">
                <p>
                  🎬 <span className="text-gray-500">Theatre:</span> {theatre}
                </p>
                <p>
                  ⏰ <span className="text-gray-500">Showtime:</span> {time}
                </p>
                <p>
                  💺 <span className="text-gray-500">Seats:</span> {seats}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="flex justify-between text-lg">
                  <span>Total Paid</span>
                  <span className="font-bold text-green-400">₹{total}</span>
                </p>
              </div>

            </div>

            {/* RIGHT - QR / BOOKING */}
            <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">

              {/* FAKE QR */}
              <div className="w-32 h-32 bg-white/10 grid grid-cols-6 gap-[2px] p-2 rounded">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${
                      Math.random() > 0.5 ? "bg-white" : "bg-transparent"
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs text-gray-400">
                Scan at theatre entry
              </p>

              <div className="border-t border-dashed border-white/20 w-full pt-4 text-xs text-gray-400">
                Booking ID
                <p className="text-white text-sm font-semibold mt-1">
                  {bookingId}
                </p>
              </div>

            </div>
          </div>

          {/* BOTTOM STRIP */}
          <div className="border-t border-dashed border-white/10 text-center text-xs text-gray-500 py-3">
            🎥 Enjoy the show • No refunds after showtime
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">

          <Link
            href="/entertainment"
            className="px-8 py-3 bg-red-600 rounded-full font-semibold hover:bg-red-500 transition"
          >
            Back to Home
          </Link>

          <button
            onClick={() => window.print()}
            className="px-8 py-3 bg-white/10 rounded-full font-semibold hover:bg-white/20 transition"
          >
            Download Ticket
          </button>
        </div>

      </div>
    </div>
  );
}