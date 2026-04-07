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
    <div className="space-y-8">
      {theatres.map((theatre) => (
        <div
          key={theatre.name}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]"
        >
          <h3 className="font-semibold text-lg mb-4 text-white">
            {theatre.name}
          </h3>

          <div className="flex gap-3 flex-wrap">
            {theatre.shows.map((show) => {
              const isActive =
                selected?.time === show.time &&
                selected?.theatre === theatre.name;

              return (
                <button
                  key={show.time}
                  onClick={() => handleSelect(theatre.name, show)}
                  className={`
                    px-5 py-3 rounded-xl text-sm transition-all duration-300
                    border

                    ${
                      isActive
                        ? "bg-indigo-600 border-indigo-400 scale-105 shadow-[0_10px_30px_rgba(99,102,241,0.6)]"
                        : "bg-white/5 border-white/10 hover:bg-indigo-500/20 hover:border-indigo-400"
                    }
                  `}
                >
                  <div className="font-medium">{show.time}</div>
                  <div className="text-xs text-gray-300 mt-1">
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