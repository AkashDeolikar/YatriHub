"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaArrowLeftLong, 
  FaClock, 
  FaBolt, 
  FaMicrochip, 
  FaSignal 
} from "react-icons/fa6";

// Match these to your shared types file
interface Bus {
  id: string;
  busNo: string;
  name: string;
  type: string;
  price: number;
  origin: string;
  destination: string;
  departure: string;
  totalSeats: number;
  availableSeats: number[];
}

interface FleetListProps {
  items: Bus[];
  route: { from: string; to: string; date: string };
  onSelect: (b: Bus) => void;
  onBack: () => void;
}

export default function FleetList({ items, route, onSelect, onBack }: FleetListProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 20 }}
      className="max-w-5xl mx-auto selection:bg-pink-500/30"
    >
      {/* SYSTEM NAVIGATION */}
      <button 
        onClick={onBack} 
        className="group flex items-center gap-3 text-[10px] font-mono text-zinc-600 hover:text-pink-500 transition-all mb-10 tracking-[0.2em] border border-white/5 px-4 py-2 rounded-full hover:bg-pink-500/5 hover:border-pink-500/20"
      >
        <FaArrowLeftLong className="group-hover:-translate-x-1 transition-transform" /> 
        REINITIALIZE_SEARCH_PROTOCOL
      </button>
      
      {/* ROUTE TELEMETRY */}
      <div className="mb-14 px-4 border-l-2 border-zinc-800 focus-within:border-pink-500 transition-colors">
        <div className="flex items-center gap-3 mb-4">
           <div className="flex gap-1">
             {[...Array(3)].map((_, i) => (
               <div key={i} className="w-1 h-3 bg-pink-500/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
             ))}
           </div>
           <span className="text-[10px] font-mono text-pink-500 uppercase tracking-[0.4em] font-bold">Active_Pathways</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white mb-6">
          {route.from} <span className="text-pink-500 font-thin mx-2 opacity-50">/</span> {route.to}
        </h2>

        <div className="flex flex-wrap gap-8 items-center">
           <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-lg border border-white/5">
             <FaClock className="text-pink-500" size={12} />
             <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{route.date}</span>
           </div>
           <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-lg border border-white/5">
             <FaBolt className="text-green-500" size={12} />
             <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{items.length} Instances_Available</span>
           </div>
           <div className="hidden md:flex items-center gap-3 text-[9px] font-mono text-zinc-600 uppercase">
             <FaSignal /> 100% Uplink_Stable
           </div>
        </div>
      </div>

      {/* FLEET GRID */}
      <div className="grid gap-5">
        <AnimatePresence>
          {items.map((bus, idx) => (
            <motion.div 
              key={bus.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => onSelect(bus)}
              className="group relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between p-8 bg-zinc-900/20 border border-white/5 rounded-[2.5rem] hover:bg-white/[0.02] hover:border-pink-500/30 transition-all cursor-pointer shadow-xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-zinc-800 p-2 rounded-lg text-zinc-500 group-hover:text-pink-500 transition-colors">
                    <FaMicrochip size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-pink-500/80 uppercase font-bold tracking-tighter">ID: {bus.busNo}</p>
                    <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{bus.type}</p>
                  </div>
                </div>

                <h3 className="text-3xl font-black uppercase text-white group-hover:text-pink-500 transition-colors tracking-tight">
                  {bus.name}
                </h3>

                <div className="flex items-center gap-6 mt-4">
                  <div className="space-y-1">
                    <p className="text-[8px] font-mono text-zinc-600 uppercase">Deployment</p>
                    <p className="text-xs font-mono text-zinc-300">{bus.departure}</p>
                  </div>
                  <div className="h-6 w-px bg-white/10" />
                  <div className="space-y-1">
                    <p className="text-[8px] font-mono text-zinc-600 uppercase">Available_Slots</p>
                    <p className="text-xs font-mono text-zinc-300">{bus.availableSeats.length} Units</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-8 md:mt-0 flex items-center gap-10">
                 <div className="text-right">
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Compute_Cost</p>
                    <p className="text-4xl font-black italic tracking-tighter text-white">
                      ₹{bus.price.toLocaleString()}
                    </p>
                 </div>
                 
                 <button className="relative overflow-hidden bg-white text-black h-16 px-10 rounded-2xl font-black uppercase tracking-widest text-xs group-hover:bg-pink-600 group-hover:text-white transition-all shadow-2xl">
                   <span className="relative z-10">Allocate</span>
                 </button>
              </div>

              <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-pink-500/20 transition-all" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <footer className="mt-12 flex justify-center gap-10 py-6 border-t border-white/5">
         <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-700 uppercase">
           <span className="w-1 h-1 rounded-full bg-green-500" /> API_Response: 24ms
         </div>
         <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-700 uppercase">
           <span className="w-1 h-1 rounded-full bg-zinc-800" /> Fleet_Version: 3.1.2
         </div>
      </footer>
    </motion.div>
  );
}