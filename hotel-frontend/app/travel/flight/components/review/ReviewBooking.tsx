"use client";

import { useBookingStore } from "../../store/bookingStore";
import { bookFlight } from "../../lib/flightApi";
import { useState } from "react";
import { Loader2, ShieldCheck, ArrowRight, PlaneTakeoff } from "lucide-react";
import { motion } from "framer-motion";
import { FareBreakdown } from "./BookingSummary";

export default function ReviewBooking() {
  const { flight, passengers, seats } = useBookingStore();
  const [loading, setLoading] = useState(false);

  if (!flight) return (
    <div className="py-20 text-center text-[10px] tracking-[0.5em] text-zinc-500 uppercase">
      No Active Manifest Found.
    </div>
  );

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await bookFlight({ flight, passengers, seats }, "mock-token");
      window.location.href = res.url; 
    } catch (err) {
      console.error("Link Failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT: ITINERARY & NODES (8 Columns) */}
        <div className="lg:col-span-7 space-y-12">
          <header className="space-y-2">
            <h2 className="text-2xl font-light text-white tracking-tighter flex items-center gap-4">
              Review Final Manifest <PlaneTakeoff size={20} className="text-teal-500/50" />
            </h2>
            <p className="text-[8px] text-zinc-500 tracking-[0.3em] uppercase">Synchronize your itinerary details before execution.</p>
          </header>

          {/* TRIP CARD */}
          <div className="relative p-8 bg-zinc-900/10 border-l border-teal-500/30">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-[7px] font-black text-zinc-600 tracking-widest uppercase">Flight ID</p>
                <p className="text-sm font-light text-white uppercase tracking-widest">{flight.airline} {flight.flightNo}</p>
              </div>
              <div className="text-right">
                <p className="text-[7px] font-black text-zinc-600 tracking-widest uppercase">Class</p>
                <p className="text-[10px] text-teal-500 uppercase tracking-widest">Standard Economy</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <span className="text-xl font-light text-white">06:30</span>
                <span className="block text-[9px] font-bold text-zinc-500 tracking-widest uppercase mt-1">{flight.from}</span>
              </div>
              
              <div className="flex flex-col items-center flex-[2]">
                <div className="w-full h-[1px] bg-zinc-800 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
                </div>
                <span className="text-[7px] text-zinc-700 uppercase mt-2 tracking-widest">Non-Stop Transit</span>
              </div>

              <div className="flex-1 text-right">
                <span className="text-xl font-light text-white">09:30</span>
                <span className="block text-[9px] font-bold text-zinc-500 tracking-widest uppercase mt-1">{flight.to}</span>
              </div>
            </div>
          </div>

          {/* PASSENGER NODES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {passengers.map((p, idx) => (
              <div key={idx} className="p-4 border border-white/[0.03] flex items-center justify-between group hover:border-teal-500/20 transition-colors">
                <div>
                  <p className="text-[7px] text-zinc-600 uppercase tracking-widest mb-1">Node 0{idx + 1}</p>
                  <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-bold">{p.firstName} {p.lastName}</p>
                </div>
                <div className="text-right">
                   <p className="text-[7px] text-zinc-600 uppercase tracking-widest">Seat</p>
                   <p className="text-[10px] text-teal-500 font-mono uppercase">{seats[idx] || "--"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: FINANCIAL GATEWAY (5 Columns) */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 space-y-8">
            <div className="p-10 bg-[#050505] border border-white/[0.03] shadow-2xl">
              <FareBreakdown price={flight.basePrice} count={passengers.length} />
              
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="w-full mt-10 relative group bg-white text-black py-5 rounded-sm text-[10px] font-black uppercase tracking-[0.5em] transition-all overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-teal-400 transition-colors flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="animate-spin" size={14} /> : "Finalize Booking"}
                  {!loading && <ArrowRight size={14} />}
                </span>
                <motion.div 
                  className="absolute inset-0 bg-[#020202]" 
                  initial={{ x: "-100%" }} 
                  whileHover={{ x: 0 }} 
                  transition={{ duration: 0.4, ease: "circOut" }} 
                />
              </button>

              <div className="mt-8 flex items-center gap-3 justify-center">
                <ShieldCheck size={12} className="text-zinc-700" />
                <span className="text-[7px] text-zinc-700 tracking-widest uppercase">End-to-End Encrypted Link</span>
              </div>
            </div>

            <div className="px-6 space-y-4">
                <p className="text-[7px] text-zinc-500 leading-relaxed uppercase tracking-widest">
                  By confirming, you acknowledge the <span className="text-zinc-300">Transit Protocol Conditions</span> and verify that all passenger nodes match government identification.
                </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}