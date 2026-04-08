"use client";

import { useState } from "react";
import { useBookingStore, Passenger } from "../../store/bookingStore";
import { motion, AnimatePresence } from "framer-motion";
import { User, Calendar, Utensils, Briefcase } from "lucide-react"; // Optional: if you have lucide installed

interface PassengerFormProps {
  count: number;
  onNext: () => void;
}

export default function PassengerForm({ count, onNext }: PassengerFormProps) {
  const setPassengers = useBookingStore((s: any) => s.setPassengers);

  const [passengers, setLocal] = useState<Passenger[]>(
    Array.from({ length: count }).map(() => ({
      title: "Mr",
      firstName: "",
      lastName: "",
      gender: "Male",
      dob: "",
      mealPref: "Veg",
      baggage: "15kg",
    }))
  );

  const update = (i: number, field: keyof Passenger, value: string) => {
    const updated = [...passengers];
    updated[i] = { ...updated[i], [field]: value };
    setLocal(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassengers(passengers);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-16 max-w-5xl mx-auto pb-20">
      {/* HEADER SECTION */}
      <header className="text-center space-y-4 mb-20">
        <motion.div 
          initial={{ scaleX: 0 }} 
          animate={{ scaleX: 1 }} 
          className="h-px w-20 bg-teal-500/50 mx-auto" 
        />
        <h2 className="text-[12px] font-black tracking-[0.6em] text-white uppercase">
          Traveler Manifest <span className="text-zinc-700 ml-2">/ Phase 02</span>
        </h2>
        <p className="text-[7px] text-zinc-500 tracking-[0.3em] uppercase max-w-xs mx-auto leading-relaxed">
          Ensure all data matches government-issued identification for terminal clearance.
        </p>
      </header>

      <AnimatePresence>
        {passengers.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="group relative"
          >
            {/* BACKGROUND DECORATION */}
            <div className="absolute -inset-4 bg-zinc-900/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-l border-zinc-800 group-hover:border-teal-500/40 transition-colors pl-8 md:pl-12">
              
              {/* LEFT: IDENTIFIER */}
              <div className="lg:col-span-2 py-2">
                <span className="block text-[8px] font-black text-zinc-700 uppercase tracking-widest mb-1">Traveler</span>
                <span className="text-4xl font-light text-zinc-800 group-hover:text-white transition-colors duration-500">
                  0{i + 1}
                </span>
                <div className="mt-4 flex gap-1">
                  <div className="h-1 w-1 rounded-full bg-teal-500 animate-pulse" />
                  <div className="h-1 w-4 bg-zinc-800 group-hover:bg-teal-500/20 transition-colors" />
                </div>
              </div>

              {/* RIGHT: DATA FIELDS */}
              <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                
                {/* GIVEN NAMES */}
                <div className="group/field relative">
                  <div className="flex items-center gap-2 mb-2">
                    <User size={8} className="text-zinc-500" />
                    <label className="text-[7px] font-black tracking-[0.3em] text-zinc-600 group-focus-within/field:text-teal-400 transition-colors uppercase">
                      Given Names
                    </label>
                  </div>
                  <input
                    required
                    value={p.firstName}
                    placeholder="AS PER PASSPORT"
                    onChange={(e) => update(i, "firstName", e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-900 py-3 text-xs tracking-widest text-white outline-none transition-all focus:border-teal-500/50 placeholder:text-zinc-800 font-medium uppercase"
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-teal-500 group-focus-within/field:w-full transition-all duration-700" />
                </div>

                {/* FAMILY NAME */}
                <div className="group/field relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 border border-zinc-700 rounded-sm" />
                    <label className="text-[7px] font-black tracking-[0.3em] text-zinc-600 group-focus-within/field:text-teal-400 transition-colors uppercase">
                      Family Name
                    </label>
                  </div>
                  <input
                    required
                    value={p.lastName}
                    placeholder="SURNAME"
                    onChange={(e) => update(i, "lastName", e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-900 py-3 text-xs tracking-widest text-white outline-none transition-all focus:border-teal-500/50 placeholder:text-zinc-800 font-medium uppercase"
                  />
                </div>

                {/* TEMPORAL ORIGIN */}
                <div className="group/field relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={8} className="text-zinc-500" />
                    <label className="text-[7px] font-black tracking-[0.3em] text-zinc-600 group-focus-within/field:text-teal-400 transition-colors uppercase">
                      Date of Birth
                    </label>
                  </div>
                  <input
                    required
                    type="date"
                    value={p.dob}
                    onChange={(e) => update(i, "dob", e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-900 py-3 text-xs tracking-widest text-white outline-none transition-all focus:border-teal-500/50 invert-[0.9] brightness-50 focus:brightness-100 uppercase grayscale"
                  />
                </div>

                {/* PROTOCOL PREFERENCE */}
                <div className="group/field relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Utensils size={8} className="text-zinc-500" />
                    <label className="text-[7px] font-black tracking-[0.3em] text-zinc-600 group-focus-within/field:text-teal-400 transition-colors uppercase">
                      Sustenance Protocol
                    </label>
                  </div>
                  <select 
                    value={p.mealPref}
                    onChange={(e) => update(i, "mealPref", e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-900 py-3 text-[10px] tracking-[0.2em] text-zinc-400 outline-none transition-all focus:border-teal-500/50 appearance-none cursor-pointer uppercase font-bold"
                  >
                    <option value="Veg" className="bg-[#050505] text-white">Vegetarian Manifest</option>
                    <option value="Non-Veg" className="bg-[#050505] text-white">Standard Manifest</option>
                    <option value="Vegan" className="bg-[#050505] text-white">Plant-Based Protocol</option>
                  </select>
                  <div className="absolute right-0 bottom-4 pointer-events-none">
                     <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                  </div>
                </div>

              </div>
            </div>

            {/* SPACER FOR NODES */}
            {i !== passengers.length - 1 && (
              <div className="h-20 w-[1px] bg-gradient-to-b from-zinc-800 to-transparent ml-[1px]" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* FINAL SUBMISSION */}
      <footer className="flex flex-col items-center pt-20 border-t border-zinc-900 space-y-8">
        <div className="flex gap-12 items-center">
            <div className="text-right">
                <span className="block text-[6px] text-zinc-500 tracking-widest uppercase">Verified Nodes</span>
                <span className="text-[10px] text-white font-mono">{passengers.filter(p => p.firstName).length} / {count}</span>
            </div>
            <div className="h-8 w-px bg-zinc-800 rotate-12" />
            <div className="text-left">
                <span className="block text-[6px] text-zinc-500 tracking-widest uppercase">System Status</span>
                <span className="text-[10px] text-teal-500 animate-pulse uppercase tracking-tighter">Ready</span>
            </div>
        </div>

        <button
          type="submit"
          className="w-full max-w-sm relative group overflow-hidden bg-white text-black py-6 rounded-sm text-[10px] font-black uppercase tracking-[0.6em] transition-all hover:shadow-[0_0_40px_rgba(45,212,191,0.2)]"
        >
          <span className="relative z-10 transition-colors group-hover:text-teal-400">Validate & Proceed</span>
          <motion.div 
            className="absolute inset-0 bg-[#020202]" 
            initial={{ x: "-100%" }} 
            whileHover={{ x: 0 }} 
            transition={{ duration: 0.5, ease: "circOut" }} 
          />
        </button>
        
        <div className="flex items-center gap-4 opacity-30">
            <div className="h-[1px] w-12 bg-zinc-800" />
            <span className="text-[6px] tracking-[1em] text-zinc-500 uppercase">Secure Data Transmission</span>
            <div className="h-[1px] w-12 bg-zinc-800" />
        </div>
      </footer>
    </form>
  );
}