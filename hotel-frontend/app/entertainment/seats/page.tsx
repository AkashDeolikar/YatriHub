"use client";

import { useEffect, useState } from "react";
import { generateSeats } from "../utils/seatGenerator";
import { useRouter } from "next/navigation";

export default function SeatsPage() {
  const [seats, setSeats] = useState<any[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const maxSeats = 6;

  useEffect(() => {
    setSeats(generateSeats());
  }, []);

  const handleSelect = (seat: any) => {
    if (seat.status === "booked") return;

    const exists = selectedSeats.find((s) => s.id === seat.id);

    if (exists) {
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
    } else {
      if (selectedSeats.length >= maxSeats) {
        setError("Max 6 seats allowed");
        setTimeout(() => setError(""), 2000);
        return;
      }
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  const getColor = (seat: any) => {
    if (seat.status === "booked")
      return "bg-gray-800 text-gray-500 cursor-not-allowed";

    if (selectedSeats.find((s) => s.id === seat.id))
      return "bg-green-500 scale-110 shadow-lg";

    return "bg-gray-700 hover:bg-gray-600 hover:scale-105";
  };

  const rows = Array.from(new Set(seats.map((s) => s.row)));

  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center px-4 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">Select Your Seats</h1>

      {/* 🎬 SCREEN (CURVED EFFECT) */}
      <div className="relative mb-10">
        <div className="w-[320px] h-[40px] bg-gradient-to-b from-gray-300 to-gray-500 rounded-[50%] blur-[2px]" />
        <p className="text-center text-xs text-gray-400 mt-2 tracking-widest">
          SCREEN
        </p>
      </div>

      {/* ❗ ERROR */}
      {error && (
        <div className="text-red-400 text-sm mb-4 animate-pulse">
          {error}
        </div>
      )}

      {/* 🪑 SEATS */}
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-3 justify-center">

            {/* ROW LABEL */}
            <span className="w-5 text-xs text-gray-400">{row}</span>

            {/* SEATS */}
            <div className="flex gap-2">
              {seats
                .filter((s) => s.row === row)
                .map((seat, i) => (
                  <div key={seat.id} className="flex items-center">

                    {/* AISLE GAP */}
                    {i === 4 && <div className="w-4" />}

                    <button
                      onClick={() => handleSelect(seat)}
                      disabled={seat.status === "booked"}
                      className={`
                        w-9 h-9 rounded-md text-[10px] font-medium
                        transition-all duration-200
                        ${getColor(seat)}
                      `}
                    >
                      {seat.number}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🎨 LEGEND */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-gray-400">
        <Legend color="bg-gray-700" label="Available" />
        <Legend color="bg-green-500" label="Selected" />
        <Legend color="bg-gray-800" label="Booked" />
      </div>

      {/* 💳 STICKY FOOTER */}
      <div className="fixed bottom-0 left-0 w-full bg-black/95 border-t border-white/10 px-6 py-4 flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold">
            {selectedSeats.length} Seat(s)
          </p>
          <p className="text-xs text-gray-400">
            {selectedSeats.map((s) => s.id).join(", ") || "None"}
          </p>
        </div>

        <button
          disabled={selectedSeats.length === 0}
          onClick={() =>
            router.push(
              `/entertainment/checkout?seats=${JSON.stringify(
                selectedSeats
              )}`
            )
          }
          className={`px-6 py-2 rounded font-semibold transition ${
            selectedSeats.length === 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          Pay ₹{total}
        </button>
      </div>
    </div>
  );
}

// 🎨 LEGEND
function Legend({ color, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded ${color}`} />
      {label}
    </div>
  );
}