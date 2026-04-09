"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Bus } from "../../types/bus";
import { FaCouch } from "react-icons/fa6";
import { RiBaseStationLine } from "react-icons/ri";

interface SeatMapperProps {
  bus: Bus;
  selected: number[];
  onToggle: (n: number) => void;
  onProceed: () => void;
}

export default function SeatMapper({ bus, selected, onToggle, onProceed }: SeatMapperProps) {
  // Real-world SaaS: Occupied seats usually come from an API/Socket
  const occupiedSeats = useMemo(() => [3, 7, 12, 18, 22], []);
  
  const SEAT_CAPACITY = 24;
  const COLUMNS = 5; // Including Aisle

  return (
    <div className="space-y-8 max-w-2xl mx-auto selection:bg-pink-500/30">
      {/* HEADER: TELEMETRY DATA */}
      <header className="flex justify-between items-start border-l-2 border-pink-500 pl-4">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
            SEAT<span className="text-pink-500">_CONFIG</span>
          </h2>
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
            <RiBaseStationLine className="text-green-500 animate-pulse" />
            Node: {bus.id} // Deck: Lower_Primary
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">Unit_Rate</p>
          <p className="text-xl font-bold text-white">₹{bus.price.toLocaleString()}</p>
        </div>
      </header>

      {/* MAIN CABIN CONTAINER */}
      <div className="bg-[#080808] p-6 md:p-10 rounded-[3rem] border border-white/5 relative shadow-2xl">
        {/* CABIN SCANNER EFFECT (Visual Polish) */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent pointer-events-none opacity-20" />
        
        {/* FRONT SECTION: DRIVER & ENTRY */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10">
          <div className="flex flex-col gap-1">
            <div className="w-12 h-8 rounded-md bg-zinc-900 border border-white/10 flex items-center justify-center">
              <div className="w-1 h-4 bg-zinc-700 rounded-full" />
            </div>
            <span className="text-[8px] font-mono text-zinc-600 uppercase text-center">Steering</span>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Access_Gate</span>
             <div className="h-1 w-12 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="h-full w-1/2 bg-pink-500/40" 
                />
             </div>
          </div>
        </div>

        {/* SEAT GRID ENGINE */}
        <div className="grid grid-cols-5 gap-4 md:gap-6 relative">
          {Array.from({ length: SEAT_CAPACITY }, (_, i) => {
            const seatNum = i + 1;
            const isOccupied = occupiedSeats.includes(seatNum);
            const isSelected = selected.includes(seatNum);
            const isAisle = (seatNum % COLUMNS === 3);

            if (isAisle) {
              return (
                <div 
                  key={`aisle-${seatNum}`} 
                  className="flex items-center justify-center font-mono text-[9px] text-zinc-800 tracking-tighter uppercase rotate-90"
                >
                  Aisle
                </div>
              );
            }

            return (
              <motion.button
                key={seatNum}
                whileHover={!isOccupied ? { y: -2, scale: 1.05 } : {}}
                whileTap={!isOccupied ? { scale: 0.95 } : {}}
                disabled={isOccupied}
                onClick={() => onToggle(seatNum)}
                className={`
                  relative h-14 w-full md:h-16 rounded-xl flex items-center justify-center transition-all border-2
                  ${isOccupied 
                    ? "bg-zinc-900 border-transparent text-zinc-700 cursor-not-allowed opacity-40" 
                    : isSelected 
                    ? "bg-pink-600/20 border-pink-500 text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.2)]" 
                    : "bg-black border-white/5 text-zinc-500 hover:border-white/20 hover:text-white"}
                `}
              >
                <FaCouch className={`transition-opacity ${isSelected ? "opacity-80" : "opacity-20"}`} size={14} />
                <span className="absolute bottom-1 right-1.5 text-[9px] font-mono font-medium">
                  {String(seatNum).padStart(2, '0')}
                </span>
                
                {/* Active Selection Ping */}
                {isSelected && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* LEGEND DASHBOARD */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-x-8 gap-y-4">
          <LegendItem label="Operational" color="bg-zinc-800 border-white/10" />
          <LegendItem label="Allocated" color="bg-pink-600" />
          <LegendItem label="Decommissioned" color="bg-zinc-900 opacity-40" />
        </div>
      </div>

      {/* TRANSACTION FOOTER */}
      <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Staged_Resources</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{selected.length}</span>
            <span className="text-zinc-500 font-mono text-sm uppercase">Units Found</span>
          </div>
        </div>

        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="hidden md:block text-right">
             <p className="text-[10px] font-mono text-zinc-500 uppercase">Subtotal</p>
             <p className="font-bold text-white font-mono">₹{(selected.length * bus.price).toLocaleString()}</p>
          </div>
          <button 
            onClick={onProceed} 
            disabled={selected.length === 0}
            className="flex-1 md:flex-none bg-white text-black h-14 px-12 rounded-xl font-bold uppercase tracking-tight hover:bg-pink-500 hover:text-white transition-all disabled:opacity-10 disabled:grayscale cursor-pointer active:scale-95"
          >
            Commit Mapping
          </button>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ label, color }: { label: string, color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-3 h-3 rounded-full ${color} shadow-sm`} />
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">{label}</span>
    </div>
  );
}