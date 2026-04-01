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
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-green-500 mb-4">
        🎉 Booking Confirmed!
      </h1>

      <p className="mb-8 text-gray-400">Enjoy your movie 🍿</p>

      {/* 🎟 TICKET CARD */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 w-full max-w-md space-y-4 shadow-lg">

        <h2 className="text-xl font-semibold">{movie}</h2>

        <div className="text-sm text-gray-300 space-y-1">
          <p><span className="text-gray-500">Theatre:</span> {theatre}</p>
          <p><span className="text-gray-500">Showtime:</span> {time}</p>
          <p><span className="text-gray-500">Seats:</span> {seats}</p>
        </div>

        <div className="border-t border-white/10 pt-3 text-sm">
          <p className="flex justify-between">
            <span>Total Paid</span>
            <span className="font-semibold">₹{total}</span>
          </p>
        </div>

        <div className="border-t border-dashed border-white/20 pt-3 text-xs text-gray-400">
          Booking ID: <span className="text-white">{bookingId}</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4 mt-8">
        <Link
          href="/entertainment"
          className="px-6 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Back to Home
        </Link>

        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-white/10 rounded hover:bg-white/20"
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
}