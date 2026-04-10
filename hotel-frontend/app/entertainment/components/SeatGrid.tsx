"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "../store/bookingStore";
import { Armchair, CreditCard } from "lucide-react";

const rows = ["A", "B", "C", "D", "E", "F", "G"];
const cols = 10; // Expanded for a wider cinematic feel
const maxSeats = 6;

const getPrice = (row: string) => {
  if (["A", "B"].includes(row)) return 150;
  if (["C", "D", "E"].includes(row)) return 250;
  return 350;
};

const bookedSeats = ["A3", "B5", "C2", "D6", "E4", "G1", "G2"];

export default function SeatGrid({ movie, show }: any) {
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  // Assuming your store actions are named like this
  const { setSeats, setMovie, setShow } = useBookingStore();

  const toggleSeat = (seat: string) => {
    if (bookedSeats.includes(seat)) return;

    if (selected.includes(seat)) {
      setSelected((prev) => prev.filter((s) => s !== seat));
    } else {
      if (selected.length >= maxSeats) {
        setError("Maximum 6 seats allowed per booking");
        setTimeout(() => setError(""), 3000);
        return;
      }
      setSelected((prev) => [...prev, seat]);
    }
  };

  const total = selected.reduce((sum, seat) => sum + getPrice(seat[0]), 0);

  const handleCheckout = () => {
    setMovie(movie);
    setShow(show);
    setSeats(selected);
    router.push("/entertainment/checkout");
  };

  return (
    <div className="text-white space-y-12 pb-40 select-none">
      
      {/* 🎬 CINEMATIC CURVED SCREEN */}
      <div className="relative mb-20">
        <div className="w-full h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-[100%] blur-sm opacity-50" />
        <div className="w-full h-16 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-[100%] mt-2" />
        <p className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] text-cyan-400/60 tracking-[0.8em] font-bold uppercase">
          Digital Cinema Screen
        </p>
      </div>

      {/* 💺 SEAT LAYOUT */}
      <div className="flex flex-col items-center gap-4 px-4 overflow-x-auto no-scrollbar">
        {rows.map((row) => (
          <div key={row} className="flex gap-2 items-center">
            <span className="w-6 text-[10px] font-bold text-gray-600 mr-2">{row}</span>
            
            <div className="flex gap-1.5 md:gap-3">
              {Array.from({ length: cols }).map((_, i) => {
                const seatId = `${row}${i + 1}`;
                const isSelected = selected.includes(seatId);
                const isBooked = bookedSeats.includes(seatId);
                const price = getPrice(row);

                return (
                  <div key={seatId} className="flex items-center">
                    {/* Aisle logic: Gap after 3rd and 7th seat */}
                    {(i === 2 || i === 8) && <div className="w-4 md:w-8" />}
                    
                    <button
                      onClick={() => toggleSeat(seatId)}
                      disabled={isBooked}
                      className={`
                        relative group w-8 h-8 md:w-10 md:h-10 rounded-t-lg transition-all duration-300
                        flex items-center justify-center
                        ${isBooked ? "cursor-not-allowed text-gray-700" : "cursor-pointer"}
                        ${isSelected ? "scale-110 shadow-[0_0_25px_-5px_#22c55e]" : "hover:scale-110"}
                      `}
                    >
                      {/* Seat Icon Component */}
                      <Armchair 
                        size={24} 
                        className={`
                          transition-colors duration-300
                          ${isBooked ? "text-zinc-800" : 
                            isSelected ? "text-green-500 fill-green-500/20" : 
                            price === 350 ? "text-purple-600/80 hover:text-purple-400" :
                            price === 250 ? "text-blue-600/80 hover:text-blue-400" :
                            "text-zinc-500 hover:text-zinc-300"}
                        `}
                      />
                      
                      {/* Tooltip on Hover */}
                      {!isBooked && !isSelected && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-bold whitespace-nowrap z-10">
                          {seatId} • ₹{price}
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 🎨 PREMIUM LEGEND */}
      <div className="flex justify-center flex-wrap gap-8 py-6 border-y border-white/5 mx-auto max-w-3xl">
        <LegendItem icon={<Armchair size={14} className="text-zinc-500"/>} label="Economy" />
        <LegendItem icon={<Armchair size={14} className="text-blue-600"/>} label="Premium" />
        <LegendItem icon={<Armchair size={14} className="text-purple-600"/>} label="VIP" />
        <LegendItem icon={<Armchair size={14} className="text-green-500 fill-green-500/20"/>} label="Selected" />
        <LegendItem icon={<Armchair size={14} className="text-zinc-800"/>} label="Booked" />
      </div>

      {/* 💳 DYNAMIC CHECKOUT BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-2xl border-t border-white/10 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 z-[60]">
        
        {error && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-4 py-2 rounded-full shadow-lg animate-bounce">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center gap-4 text-center md:text-left">
          <div className="space-y-1">
             <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Seats Selected</p>
             <div className="flex gap-2 flex-wrap justify-center md:justify-start">
               {selected.length > 0 ? selected.map(s => (
                 <span key={s} className="bg-white/10 px-2 py-0.5 rounded text-xs font-mono">{s}</span>
               )) : <span className="text-sm italic text-gray-600">No seats picked yet</span>}
             </div>
          </div>
          <div className="hidden md:block w-[1px] h-10 bg-white/10" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Total Payable</p>
            <p className="text-2xl font-black text-white">₹{total}</p>
          </div>
        </div>

        <button
          disabled={selected.length === 0}
          onClick={handleCheckout}
          className={`
            group flex items-center gap-3 px-10 py-4 rounded-2xl font-black uppercase tracking-tighter transition-all duration-500
            ${selected.length === 0 
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50" 
              : "bg-green-600 hover:bg-green-500 text-white shadow-[0_10px_40px_-10px_rgba(22,163,74,0.5)] active:scale-95"}
          `}
        >
          <CreditCard size={20} className="group-hover:rotate-12 transition-transform"/>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}

function LegendItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {icon}
      <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">{label}</span>
    </div>
  );
}