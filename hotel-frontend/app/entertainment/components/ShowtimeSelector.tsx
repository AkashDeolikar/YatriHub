"use client";

import { useState } from "react";

const theatres = [
  {
    name: "PVR Cinemas",
    shows: [
      { time: "10:00 AM", price: 150 },
      { time: "1:30 PM", price: 200 },
    ],
  },
  {
    name: "INOX",
    shows: [
      { time: "4:00 PM", price: 250 },
      { time: "7:30 PM", price: 300 },
    ],
  },
];

export default function ShowtimeSelector({ onSelect }: any) {
  const [selected, setSelected] = useState<any>(null);

  const handleSelect = (theatre: string, show: any) => {
    const data = { theatre, ...show };
    setSelected(data);
    onSelect?.(data);
  };

  return (
    <div className="space-y-6">
      {theatres.map((theatre) => (
        <div
          key={theatre.name}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <h3 className="font-semibold mb-3">{theatre.name}</h3>

          <div className="flex gap-3 flex-wrap">
            {theatre.shows.map((show) => {
              const isActive =
                selected?.time === show.time &&
                selected?.theatre === theatre.name;

              return (
                <button
                  key={show.time}
                  onClick={() => handleSelect(theatre.name, show)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all duration-300
                  ${
                    isActive
                      ? "bg-indigo-600 scale-105 shadow-md"
                      : "bg-white/10 hover:bg-indigo-500/70"
                  }`}
                >
                  <div>{show.time}</div>
                  <div className="text-xs text-gray-300">
                    ₹{show.price}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}