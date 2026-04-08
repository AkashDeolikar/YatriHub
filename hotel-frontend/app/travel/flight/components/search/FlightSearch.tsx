"use client";

import React, { useState, useCallback } from "react";
import { PlaneTakeoff, PlaneLanding, Calendar, Users, Search, AlertCircle, ArrowRightLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FlightFormData {
  from: string;
  to: string;
  date: string;
  passengers: number;
}

interface Props {
  onSearch: (data: FlightFormData) => void;
}

export default function FlightSearch({ onSearch }: Props) {
  const [form, setForm] = useState<FlightFormData>({
    from: "",
    to: "",
    date: new Date().toISOString().split("T")[0],
    passengers: 1,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  }, [error]);

  const handleSearch = () => {
    if (!form.from || !form.to) {
      setError("ORIGIN_DESTINATION_REQUIRED");
      return;
    }
    if (form.from.toLowerCase() === form.to.toLowerCase()) {
      setError("INVALID_COORDINATES: SAME_LOCATION");
      return;
    }
    onSearch(form);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group bg-[#050505] border border-white/[0.05] p-2 rounded-sm shadow-2xl"
      >
        {/* SUBTLE SCANLINE EFFECT */}
        <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

        <div className="p-4 md:p-6 relative z-10">
          {/* HEADER: Technical & Minimal */}
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="space-y-1">
              <h2 className="text-[10px] font-black tracking-[0.5em] text-white uppercase">
                Transit Search
              </h2>
              <p className="text-[7px] text-zinc-600 tracking-widest uppercase">Select your path through the aether</p>
            </div>
            <div className="flex gap-4 items-center">
               <span className="text-[8px] font-mono text-teal-500/50 uppercase tracking-tighter">System: Active</span>
               <div className="h-1 w-1 bg-teal-500 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-zinc-900 border border-zinc-900 overflow-hidden rounded-sm">
            
            {/* FROM FIELD */}
            <div className="md:col-span-3 bg-[#080808] group/field relative p-4 transition-colors hover:bg-zinc-900/50">
              <label className="block text-[7px] font-black text-zinc-600 uppercase tracking-widest mb-2 group-focus-within/field:text-teal-400">Origin</label>
              <div className="flex items-center gap-3">
                <PlaneTakeoff size={14} className="text-zinc-700" />
                <input
                  name="from"
                  placeholder="DEL"
                  value={form.from}
                  onChange={handleChange}
                  className="w-full bg-transparent text-xs tracking-[0.2em] text-white outline-none placeholder:text-zinc-900 font-medium uppercase"
                />
              </div>
            </div>

            {/* SWAP ICON (Visual Only) */}
            <div className="hidden md:flex items-center justify-center bg-[#080808] z-20">
               <ArrowRightLeft size={12} className="text-zinc-800" />
            </div>

            {/* TO FIELD */}
            <div className="md:col-span-3 bg-[#080808] group/field relative p-4 transition-colors hover:bg-zinc-900/50">
              <label className="block text-[7px] font-black text-zinc-600 uppercase tracking-widest mb-2 group-focus-within/field:text-teal-400">Destination</label>
              <div className="flex items-center gap-3">
                <PlaneLanding size={14} className="text-zinc-700" />
                <input
                  name="to"
                  placeholder="BOM"
                  value={form.to}
                  onChange={handleChange}
                  className="w-full bg-transparent text-xs tracking-[0.2em] text-white outline-none placeholder:text-zinc-900 font-medium uppercase"
                />
              </div>
            </div>

            {/* DATE PICKER */}
            <div className="md:col-span-3 bg-[#080808] group/field relative p-4 transition-colors hover:bg-zinc-900/50">
              <label className="block text-[7px] font-black text-zinc-600 uppercase tracking-widest mb-2 group-focus-within/field:text-teal-400">Departure Date</label>
              <div className="flex items-center gap-3">
                <Calendar size={14} className="text-zinc-700" />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full bg-transparent text-xs tracking-widest text-white outline-none invert-[0.9] brightness-50 focus:brightness-100 transition-all uppercase"
                />
              </div>
            </div>

            {/* PASSENGERS */}
            <div className="md:col-span-2 bg-[#080808] group/field relative p-4 transition-colors hover:bg-zinc-900/50">
              <label className="block text-[7px] font-black text-zinc-600 uppercase tracking-widest mb-2 group-focus-within/field:text-teal-400">Units</label>
              <div className="flex items-center gap-3">
                <Users size={14} className="text-zinc-700" />
                <input
                  type="number"
                  min={1}
                  name="passengers"
                  value={form.passengers}
                  onChange={handleChange}
                  className="w-full bg-transparent text-xs tracking-widest text-white outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* SEARCH TRIGGER */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <div className="h-[1px] w-12 bg-zinc-900" />
               <p className="text-[6px] text-zinc-700 tracking-[0.5em] uppercase">Universal Terminal Protocol v2.6</p>
            </div>

            <button
              onClick={handleSearch}
              className="w-full md:w-auto min-w-[240px] relative group overflow-hidden bg-white text-black py-4 px-10 rounded-sm text-[10px] font-black uppercase tracking-[0.5em] transition-all hover:text-teal-400"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Initialize Search <Search size={14} />
              </span>
              <motion.div 
                className="absolute inset-0 bg-[#020202]" 
                initial={{ x: "-100%" }} 
                whileHover={{ x: 0 }} 
                transition={{ duration: 0.4, ease: "circOut" }} 
              />
            </button>
          </div>

          {/* ERROR DISPLAY */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 mt-6 text-red-500 font-mono text-[9px] uppercase tracking-tighter"
              >
                <AlertCircle size={12} />
                <span>Error Code: {error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}