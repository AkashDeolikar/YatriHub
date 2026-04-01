"use client";
import { useState } from "react";
import { useBookingStore } from "../../store/bookingStore";

export default function SeatMap({ onNext, passengerCount }: { onNext: () => void, passengerCount: number }) {
  const setSeats = useBookingStore((s) => s.setSeats);
  const rows = 15;
  const cols = ["A", "B", "C", "D", "E", "F"];
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (seat: string) => {
    if (selected.includes(seat)) {
      setSelected(selected.filter(s => s !== seat));
    } else {
      if (selected.length < passengerCount) {
        setSelected([...selected, seat]);
      } else {
        alert(`Limit reached: ${passengerCount} seats allowed.`);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#121826] p-8 rounded-2xl">
      <h2 className="text-xl font-bold mb-6 text-center text-indigo-400">Select {passengerCount} Seats</h2>
      <div className="flex flex-col gap-3 items-center">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4">
            {cols.map((c, idx) => (
              <button
                key={`${r}${c}`}
                onClick={() => toggle(`${r + 1}${c}`)}
                className={`w-10 h-10 rounded-lg text-xs font-bold transition-all ${idx === 3 ? 'ml-6' : ''} ${
                  selected.includes(`${r + 1}${c}`) ? "bg-indigo-600 scale-110" : "bg-gray-800"
                }`}
              >
                {r + 1}{c}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button 
        disabled={selected.length !== passengerCount}
        onClick={() => { setSeats(selected); onNext(); }} 
        className="w-full bg-indigo-600 disabled:opacity-50 py-4 rounded-xl mt-10 font-bold"
      >
        Confirm {selected.length} Seats
      </button>
    </div>
  );
}