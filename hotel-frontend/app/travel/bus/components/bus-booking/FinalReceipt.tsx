"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Bus, Passenger } from "../../types/bus";
import { 
  FaDownload, 
  FaBusSimple, 
  FaFingerprint,
  FaBuildingShield, 
  // FaShieldCheck,
} from "react-icons/fa6";

interface ReceiptProps {
  id: string;
  bus: Bus;
  seats: number[];
  passenger: Passenger;
  onReset: () => void;
}

export default function FinalReceipt({ id, bus, seats, passenger, onReset }: ReceiptProps) {
  // Stable random QR grid for visual consistency during re-renders
  const qrGrid = useMemo(() => 
    Array.from({ length: 49 }, () => Math.random() > 0.5), 
  []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto print:m-0 print:max-w-none"
    >
      {/* TICKET BODY */}
      <div className="relative bg-zinc-900 rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_30px_60px_-15px_rgba(219,39,119,0.3)] print:border-black print:shadow-none print:text-black print:bg-white">
        
        {/* TOP: IDENTITY & ROUTE */}
        <div className="p-8 bg-gradient-to-br from-pink-600/20 via-transparent to-transparent print:bg-none">
          <div className="flex justify-between items-start mb-10">
            <div className="p-4 bg-pink-600 rounded-2xl text-black shadow-lg shadow-pink-600/20 print:bg-black print:text-white">
              <FaBusSimple size={28} />
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-pink-500 font-bold tracking-[0.2em] mb-1">
                <FaBuildingShield /> VERIFIED_MANIFEST
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none italic">
                Boarding<br />Pass
              </h2>
            </div>
          </div>

          <div className="flex justify-between items-center gap-6">
            <div className="flex-1">
              <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Origin_Node</p>
              <p className="text-2xl font-black tracking-tight uppercase leading-none">{bus.origin || "MUM"}</p>
            </div>
            
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full border-t border-dashed border-zinc-700 relative">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#db2777] print:shadow-none" />
              </div>
              <p className="text-[8px] font-mono text-zinc-600">NON_STOP</p>
            </div>

            <div className="flex-1 text-right">
              <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Target_Node</p>
              <p className="text-2xl font-black tracking-tight uppercase leading-none">{bus.destination || "PNQ"}</p>
            </div>
          </div>
        </div>

        {/* TICKET PERFORATION (THE "TEAR" EFFECT) */}
        <div className="relative h-6 flex items-center justify-between px-2 overflow-visible">
          <div className="absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full bg-black border border-white/5 print:bg-white print:border-black" />
          <div className="flex-1 border-t-2 border-dashed border-zinc-800 mx-4" />
          <div className="absolute right-0 translate-x-1/2 w-8 h-8 rounded-full bg-black border border-white/5 print:bg-white print:border-black" />
        </div>

        {/* BOTTOM: DATA GRID */}
        <div className="p-8 space-y-10">
          <div className="grid grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-1">
              <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Bearer_Identity</p>
              <p className="font-bold text-lg uppercase tracking-tight truncate">{passenger.name}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Allocated_Slots</p>
              <p className="font-bold text-lg text-pink-500 font-mono">
                {seats.map(s => String(s).padStart(2, '0')).join(" / ")}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Scheduled_Dep</p>
              <p className="font-bold text-lg">{bus.departure}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Fleet_ID</p>
              <p className="font-mono text-sm text-zinc-400">{bus.busNo}</p>
            </div>
          </div>

          {/* SECURE QR DEPLOYMENT */}
          <div className="relative group max-w-[180px] mx-auto">
            <div className="absolute -inset-2 bg-pink-500/10 blur-xl group-hover:bg-pink-500/20 transition-all rounded-full print:hidden" />
            <div className="relative bg-white p-4 rounded-[2rem] shadow-inner print:p-2 print:border-2 print:border-black">
              <div className="grid grid-cols-7 gap-1">
                {qrGrid.map((active, i) => (
                  <div 
                    key={i} 
                    className={`h-4 w-4 rounded-sm transition-colors duration-500 ${active ? 'bg-black' : 'bg-transparent'}`} 
                  />
                ))}
              </div>
              <FaFingerprint className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500/20 text-4xl group-hover:text-pink-500/40 transition-all print:hidden" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-[9px] font-mono text-zinc-500 tracking-[0.4em] uppercase">Auth_Code: {id}</p>
            <p className="text-[8px] font-mono text-zinc-700 uppercase leading-relaxed max-w-[200px] mx-auto">
              Present this digital ledger at any fleet node terminal for immediate biometric validation.
            </p>
          </div>
        </div>
      </div>

      {/* SYSTEM ACTIONS */}
      <div className="grid grid-cols-2 gap-4 mt-10 print:hidden">
        <button 
          onClick={() => window.print()}
          className="group flex items-center justify-center gap-3 bg-zinc-900 border border-white/10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          <FaDownload className="group-hover:bounce" /> Export_Pass
        </button>
        <button 
          onClick={onReset}
          className="bg-white text-black py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-pink-600 hover:text-white shadow-xl shadow-pink-500/20 transition-all active:scale-95"
        >
          Flush Session
        </button>
      </div>
    </motion.div>
  );
}