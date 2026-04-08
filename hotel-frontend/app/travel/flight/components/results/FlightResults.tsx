"use client";

import { useBookingStore, Flight } from "../../store/bookingStore";
import { motion } from "framer-motion";
import { Plane, Clock, Info } from "lucide-react";

interface Props {
  flights: Flight[];
  onNext: () => void;
}

export default function FlightResults({ flights, onNext }: Props) {
  const setFlight = useBookingStore((s: any) => s.setFlight);

  // Helper to format 2026 timestamps
  const formatTime = (iso: string) => 
    new Date(iso).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* SECTION HEADER */}
      <div className="flex justify-between items-end px-4">
        <div>
          <h2 className="text-[10px] font-black tracking-[0.5em] text-white uppercase">Available Transits</h2>
          <p className="text-[7px] text-zinc-500 tracking-widest uppercase mt-1">Select your preferred temporal path</p>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-teal-500 font-mono tracking-tighter animate-pulse">● SYSTEM ONLINE</span>
        </div>
      </div>

      <div className="space-y-4">
        {flights.map((f, i) => (
          <motion.div
            key={f.flightNo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-[#050505] border border-white/[0.03] hover:border-teal-500/30 transition-all duration-500"
          >
            <div className="flex flex-col lg:flex-row items-stretch">
              
              {/* AIRLINE IDENTIFIER */}
              <div className="lg:w-48 p-8 border-b lg:border-b-0 lg:border-r border-white/[0.03] flex flex-col justify-center">
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Carrier</span>
                <h3 className="text-sm font-light text-white tracking-widest uppercase">{f.airline}</h3>
                <p className="text-[9px] font-mono text-zinc-500 mt-1">{f.flightNo}</p>
              </div>

              {/* TIMELINE VISUALIZER */}
              <div className="flex-1 p-8 flex items-center justify-between gap-8">
                {/* DEPARTURE */}
                <div className="text-center lg:text-left">
                  <span className="block text-[18px] font-light text-white tracking-tighter">
                    {formatTime(f.dep)}
                  </span>
                  <span className="block text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">
                    {f.from}
                  </span>
                </div>

                {/* JOURNEY PATH */}
                <div className="flex-1 flex flex-col items-center px-4 max-w-[200px]">
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-[7px] text-zinc-700 uppercase font-black tracking-widest">Non-Stop</span>
                    <Clock size={10} className="text-zinc-800" />
                  </div>
                  <div className="relative w-full h-[1px] bg-zinc-900">
                    <motion.div 
                      className="absolute top-1/2 -translate-y-1/2 left-0"
                      initial={{ left: "0%" }}
                      whileInView={{ left: "100%" }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Plane size={10} className="text-teal-500/40 rotate-90" />
                    </motion.div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-zinc-800 border border-[#050505]" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-zinc-800 border border-[#050505]" />
                  </div>
                  <p className="text-[7px] text-zinc-600 mt-3 uppercase tracking-[0.3em]">3H 00M Transit</p>
                </div>

                {/* ARRIVAL */}
                <div className="text-center lg:text-right">
                  <span className="block text-[18px] font-light text-white tracking-tighter">
                    {formatTime(f.arr)}
                  </span>
                  <span className="block text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">
                    {f.to}
                  </span>
                </div>
              </div>

              {/* PRICING & CTA */}
              <div className="lg:w-64 p-8 bg-zinc-900/10 flex flex-col justify-center items-center lg:items-end border-t lg:border-t-0 lg:border-l border-white/[0.03]">
                <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest mb-1">Standard Fare</span>
                <div className="text-2xl font-light text-white tracking-tighter mb-4">
                  ₹{f.basePrice.toLocaleString()}
                </div>
                
                <button
                  onClick={() => {
                    setFlight(f);
                    onNext();
                  }}
                  className="w-full relative group overflow-hidden bg-white text-black py-3 px-8 rounded-sm text-[9px] font-black uppercase tracking-[0.4em] transition-all hover:text-teal-400"
                >
                  <span className="relative z-10">Select Path</span>
                  <motion.div 
                    className="absolute inset-0 bg-[#020202]" 
                    initial={{ x: "-100%" }} 
                    whileHover={{ x: 0 }} 
                    transition={{ duration: 0.4, ease: "circOut" }} 
                  />
                </button>
              </div>

            </div>

            {/* HOVER ACCENT */}
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-teal-500/50 group-hover:w-full transition-all duration-1000" />
          </motion.div>
        ))}
      </div>

      {/* FOOTER INFO */}
      <div className="flex items-center gap-4 opacity-20 justify-center mt-12">
        <Info size={12} />
        <p className="text-[7px] tracking-[0.3em] uppercase">All timings are local to the respective terminal nodes</p>
      </div>
    </div>
  );
}