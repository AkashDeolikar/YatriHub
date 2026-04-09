"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOCATIONS } from "../../lib/bus-utils";
import { 
  FaLocationDot, 
  FaMapPin, 
  FaCalendarDay, 
  FaArrowsRotate 
} from "react-icons/fa6";

interface SearchHeroProps {
  onProceed: (route: { from: string; to: string; date: string }) => void;
}

export default function SearchHero({ onProceed }: SearchHeroProps) {
  const [form, setForm] = useState({ from: "", to: "", date: "" });

  // Get today's date in YYYY-MM-DD for the min attribute
  const today = new Date().toISOString().split("T")[0];

  const swapLocations = () => {
    setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const isFormValid = 
    form.from && 
    form.to && 
    form.date && 
    form.from !== form.to;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-zinc-900/40 border border-white/5 p-8 md:p-12 rounded-[3.5rem] backdrop-blur-md overflow-hidden"
    >
      {/* PAAS DECOR: CORNER SCANNER */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none" />

      <header className="mb-14 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-[2px] w-16 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
          <span className="text-[10px] font-mono text-pink-500 uppercase tracking-[0.6em] font-bold">
            Network_Initialization
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
          Define <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-pink-400 to-zinc-200">
            Travel_Vector.
          </span>
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 relative z-10">
        {/* ORIGIN SELECTION */}
        <div className="md:col-span-4 group">
          <label className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase ml-4 mb-3 tracking-widest">
            <span>Origin_Node</span>
            {form.from && <span className="text-pink-500/50">LOCKED</span>}
          </label>
          <div className="relative flex items-center bg-black/50 border border-white/10 rounded-2xl p-2 focus-within:border-pink-500/50 focus-within:ring-1 focus-within:ring-pink-500/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500">
              <FaLocationDot size={18} />
            </div>
            <select
              value={form.from}
              className="bg-transparent w-full p-4 font-mono text-sm outline-none appearance-none cursor-pointer text-white"
              onChange={(e) => setForm({ ...form, from: e.target.value })}
            >
              <option value="" className="bg-zinc-900">SELECT_SOURCE</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l} className="bg-zinc-900">{l.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>

        {/* SWAP CONTROLLER */}
        <div className="md:col-span-1 flex items-end justify-center pb-4">
          <button
            onClick={swapLocations}
            className="w-12 h-12 rounded-full border border-white/10 bg-zinc-800/50 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-all duration-500 group shadow-lg"
            title="Swap Vectors"
          >
            <FaArrowsRotate className="text-zinc-500 group-hover:text-white group-active:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        {/* TARGET SELECTION */}
        <div className="md:col-span-4">
          <label className="text-[9px] font-mono text-zinc-500 uppercase ml-4 mb-3 tracking-widest block">Target_Node</label>
          <div className="relative flex items-center bg-black/50 border border-white/10 rounded-2xl p-2 focus-within:border-pink-500/50 focus-within:ring-1 focus-within:ring-pink-500/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
              <FaMapPin size={18} />
            </div>
            <select
              value={form.to}
              className="bg-transparent w-full p-4 font-mono text-sm outline-none appearance-none cursor-pointer text-white"
              onChange={(e) => setForm({ ...form, to: e.target.value })}
            >
              <option value="" className="bg-zinc-900">SELECT_DESTINATION</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l} className="bg-zinc-900">{l.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>

        {/* DATE STAMP */}
        <div className="md:col-span-3">
          <label className="text-[9px] font-mono text-zinc-500 uppercase ml-4 mb-3 tracking-widest block">Date_Stamp</label>
          <div className="relative flex items-center bg-black/50 border border-white/10 rounded-2xl p-2 focus-within:border-pink-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
              <FaCalendarDay size={18} />
            </div>
            <input
              type="date"
              min={today}
              value={form.date}
              className="bg-transparent w-full p-4 font-mono text-sm outline-none text-white [color-scheme:dark] cursor-pointer"
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="mt-14">
        <button
          onClick={() => onProceed(form)}
          disabled={!isFormValid}
          className="group relative w-full overflow-hidden bg-white disabled:opacity-10 py-7 rounded-2xl transition-all duration-300"
        >
          {/* HOVER SLIDE EFFECT */}
          <div className="absolute inset-0 w-0 bg-pink-600 group-hover:w-full transition-all duration-500 ease-out" />
          
          <span className="relative z-10 text-black group-hover:text-white font-black uppercase tracking-[0.4em] text-sm flex items-center justify-center gap-4 transition-colors duration-300">
            Initialize Fleet Protocol
            <motion.span 
              animate={{ x: [0, 6, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </span>
        </button>

        <AnimatePresence>
          {form.from && form.from === form.to && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 border border-pink-500/20 bg-pink-500/5 rounded-xl"
            >
              <p className="text-[10px] font-mono text-pink-500 text-center uppercase tracking-[0.2em]">
                Critical Error: Origin and Target nodes are synchronized. Adjust travel vector to continue.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}