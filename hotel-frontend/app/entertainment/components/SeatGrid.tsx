"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "../store/bookingStore";

const rows = ["A", "B", "C", "D", "E", "F", "G"];
const cols = 8;
const maxSeats = 6;

// 🎯 Pricing tiers
const getPrice = (row: string) => {
  if (["A", "B"].includes(row)) return 150; // Economy
  if (["C", "D"].includes(row)) return 250; // Premium
  return 350; // VIP
};

// 🎯 Static booked seats
const bookedSeats = ["A3", "B5", "C2", "D6", "E4"];

export default function SeatGrid({ movie, show }: any) {
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const setSeatsStore = useBookingStore((s) => s.setSeats);
  const setMovieStore = useBookingStore((s) => s.setMovie);
  const setShowStore = useBookingStore((s) => s.setShow);

  const toggleSeat = (seat: string) => {
    if (bookedSeats.includes(seat)) return;

    if (selected.includes(seat)) {
      setSelected((prev) => prev.filter((s) => s !== seat));
    } else {
      if (selected.length >= maxSeats) {
        setError("You can select max 6 seats");
        setTimeout(() => setError(""), 2000);
        return;
      }
      setSelected((prev) => [...prev, seat]);
    }
  };

  const total = selected.reduce((sum, seat) => {
    return sum + getPrice(seat[0]);
  }, 0);

  const handleCheckout = () => {
    setMovieStore(movie);
    setShowStore(show);
    setSeatsStore(selected);
    router.push("/entertainment/checkout");
  };

  return (
    <div className="text-white space-y-8">

      {/* 🎬 SCREEN */}
      <div className="text-center space-y-2">
        <div className="h-2 bg-gradient-to-r from-gray-500 to-white rounded-full w-2/3 mx-auto" />
        <p className="text-xs text-gray-400 tracking-widest">SCREEN</p>
      </div>

      {/* ❗ ERROR TOAST */}
      {error && (
        <div className="text-center text-red-400 text-sm animate-pulse">
          {error}
        </div>
      )}

      {/* 🪑 SEATS */}
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row} className="flex justify-center gap-3 items-center">

            {/* ROW LABEL */}
            <span className="w-4 text-xs text-gray-400">{row}</span>

            {Array.from({ length: cols }).map((_, i) => {
              const seat = `${row}${i + 1}`;
              const isSelected = selected.includes(seat);
              const isBooked = bookedSeats.includes(seat);

              const price = getPrice(row);

              return (
                <div key={seat} className="flex items-center">

                  {/* AISLE GAP */}
                  {i === 4 && <div className="w-6" />}

                  <button
                    onClick={() => toggleSeat(seat)}
                    disabled={isBooked}
                    className={`
                      w-9 h-9 rounded-md text-[10px] font-medium
                      transition-all duration-200

                      ${isBooked && "bg-gray-800 text-gray-500 cursor-not-allowed"}

                      ${
                        !isBooked && !isSelected &&
                        (price === 150
                          ? "bg-gray-700 hover:bg-gray-600"
                          : price === 250
                          ? "bg-blue-900 hover:bg-blue-700"
                          : "bg-purple-900 hover:bg-purple-700")
                      }

                      ${isSelected && "bg-green-500 scale-110 shadow-lg"}
                    `}
                  >
                    {seat}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 🎨 LEGEND */}
      <div className="flex justify-center flex-wrap gap-6 text-xs text-gray-400">
        <Legend color="bg-gray-700" label="Economy ₹150" />
        <Legend color="bg-blue-900" label="Premium ₹250" />
        <Legend color="bg-purple-900" label="VIP ₹350" />
        <Legend color="bg-green-500" label="Selected" />
        <Legend color="bg-gray-800" label="Booked" />
      </div>

      {/* 💳 STICKY FOOTER */}
      <div className="fixed bottom-0 left-0 w-full bg-black/95 border-t border-white/10 px-6 py-4 flex items-center justify-between z-50">

        <div>
          <p className="text-sm font-semibold">
            {selected.length} Seat(s)
          </p>
          <p className="text-xs text-gray-400">
            {selected.join(", ") || "No seats selected"}
          </p>
        </div>

        <button
          disabled={selected.length === 0}
          onClick={handleCheckout}
          className={`px-6 py-2 rounded font-semibold transition ${
            selected.length === 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          Pay ₹{total}
        </button>
      </div>
    </div>
  );
}

// 🎨 Legend Component
function Legend({ color, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded ${color}`} />
      {label}
    </div>
  );
}