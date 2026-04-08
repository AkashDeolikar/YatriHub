"use client";

import React, { useState, useEffect } from "react";
import { useBookingStore } from "../../store/bookingStore";
import { motion, AnimatePresence } from "framer-motion";
import { Armchair, Info, ChevronRight } from "lucide-react";

interface Props {
  onNext: () => void;
  passengerCount: number;
}

export default function SeatMap({ onNext, passengerCount }: Props) {
  // Accessing the store action
  const setSeats = useBookingStore((s: any) => s.setSeats);
  
  // Configuration
  const rows = 12;
  const cols = ["A", "B", "C", "D", "E", "F"];
  const occupiedSeats = ["1A", "2F", "4C", "4D", "8A", "8B", "10E"];

  const [selected, setSelected] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const toggleSeat = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;
    
    if (selected.includes(seatId)) {
      setSelected(selected.filter((s) => s !== seatId));
    } else if (selected.length < passengerCount) {
      setSelected([...selected, seatId]);
    }
  };

  // Fixed Confirm Handler
  const handleConfirmAllocation = async () => {
    if (selected.length !== passengerCount) return;

    setIsSyncing(true);
    try {
      // 1. Update the global store
      setSeats(selected);
      
      // 2. Small delay to ensure state consistency before transition
      setTimeout(() => {
        onNext();
      }, 100);
    } catch (error) {
      console.error("Allocation sync failed:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-40 pt-10 px-4">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="text-left">
          <h2 className="text-[10px] font-black tracking-[0.4em] text-white uppercase mb-2">
            Cabin Configuration
          </h2>
          <p className="text-[14px] font-light text-zinc-400">Select {passengerCount} preferred nodes</p>
        </div>
        
        <div className="flex gap-6 border border-white/[0.03] p-4 bg-zinc-900/10 backdrop-blur-sm">
          <LegendItem label="Available" color="bg-zinc-800" />
          <LegendItem label="Selected" color="bg-teal-500" />
          <LegendItem label="Occupied" color="bg-zinc-950 border border-white/10 opacity-40" isOccupied />
        </div>
      </div>

      {/* SEAT MAP CONTAINER */}
      <div className="relative flex justify-center py-20 bg-[#050505] border border-white/[0.02] rounded-t-[140px] shadow-2xl overflow-hidden">
        {/* FUSELAGE GRADIENT */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] h-32 bg-gradient-to-b from-zinc-900/20 to-transparent rounded-t-[140px] border-t border-white/5" />
        
        <div className="relative z-10">
          {/* COLUMN LABELS */}
          <div className="flex gap-4 mb-8 justify-center">
            {cols.map((c, i) => (
              <React.Fragment key={c}>
                <div className="w-10 text-center text-[10px] font-mono text-zinc-700">{c}</div>
                {i === 2 && <div className="w-12" />}
              </React.Fragment>
            ))}
          </div>

          {/* ROWS */}
          <div className="space-y-3">
            {Array.from({ length: rows }).map((_, r) => {
              const rowNum = r + 1;
              return (
                <div key={r} className="flex items-center gap-4 group">
                  {cols.slice(0, 3).map((c) => (
                    <Seat 
                      key={rowNum + c}
                      id={rowNum + c}
                      isSelected={selected.includes(rowNum + c)}
                      isOccupied={occupiedSeats.includes(rowNum + c)}
                      onToggle={() => toggleSeat(rowNum + c)}
                    />
                  ))}
                  <div className="w-12 flex justify-center">
                    <span className="text-[9px] font-mono text-zinc-800">{rowNum < 10 ? `0${rowNum}` : rowNum}</span>
                  </div>
                  {cols.slice(3).map((c) => (
                    <Seat 
                      key={rowNum + c}
                      id={rowNum + c}
                      isSelected={selected.includes(rowNum + c)}
                      isOccupied={occupiedSeats.includes(rowNum + c)}
                      onToggle={() => toggleSeat(rowNum + c)}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* THE FLOATING ACTION BAR */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div 
            initial={{ y: 100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 100, x: "-50%", opacity: 0 }}
            className="fixed bottom-8 left-1/2 w-[95%] max-w-xl z-50"
          >
            <div className="bg-white p-1 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-white border-b border-zinc-100">
                <div className="flex gap-4 items-center">
                   <div>
                     <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Allocated</p>
                     <p className="text-sm font-mono font-bold text-black uppercase">{selected.join(", ")}</p>
                   </div>
                   <div className="h-8 w-[1px] bg-zinc-100 hidden md:block" />
                   <div className="hidden md:block">
                     <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Manifest</p>
                     <p className="text-xs font-bold text-black uppercase">{selected.length} / {passengerCount} Units</p>
                   </div>
                </div>

                <button
                  disabled={selected.length !== passengerCount || isSyncing}
                  onClick={handleConfirmAllocation}
                  className="mt-4 md:mt-0 flex items-center gap-3 bg-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-teal-500 transition-all disabled:bg-zinc-200 disabled:text-zinc-400 active:scale-95"
                >
                  {isSyncing ? "Syncing..." : "Confirm Allocation"} <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// SUB-COMPONENTS
function Seat({ id, isSelected, isOccupied, onToggle }: any) {
  return (
    <button
      disabled={isOccupied}
      onClick={onToggle}
      className={`
        relative w-10 h-11 rounded-t-lg rounded-b-sm transition-all duration-300 group/seat
        flex flex-col items-center justify-center border-t-2
        ${isOccupied 
          ? "bg-zinc-950 border-zinc-900 cursor-not-allowed" 
          : isSelected 
            ? "bg-teal-500/20 border-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.15)]" 
            : "bg-zinc-900 border-zinc-800 hover:border-zinc-500"
        }
      `}
    >
      <Armchair 
        size={14} 
        className={isSelected ? "text-teal-400" : isOccupied ? "text-zinc-800" : "text-zinc-700"} 
      />
    </button>
  );
}

function LegendItem({ label, color, isOccupied = false }: any) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-sm ${color}`} />
      <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}