"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaStar, FaChevronLeft, FaShieldAlt } from "react-icons/fa";
import Link from "next/link";

const Map = dynamic(() => import("../components/MapComponent"), { ssr: false });

export default function CabResults() {
  const params = useSearchParams();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const fleet = useMemo(() => [
    { id: 1, type: "Hatchback", name: "Drift Go", price: 245, time: "2 min", pos: [19.075, 72.88] },
    { id: 2, type: "Sedan", name: "Drift Sedan", price: 410, time: "5 min", pos: [19.085, 72.89] },
    { id: 3, type: "SUV", name: "Drift XL", price: 680, time: "7 min", pos: [19.065, 72.87] },
    { id: 4, type: "Luxury", name: "Black Label", price: 1250, time: "4 min", pos: [19.095, 72.91] },
  ], []);

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col lg:flex-row">
      {/* Interface Sidebar */}
      <aside className="w-full lg:w-[420px] bg-[#080808] border-r border-white/10 z-20 flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          <Link href="/travel/cab" className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-8 uppercase tracking-tighter">
            <FaChevronLeft /> Back to locations
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl font-black italic mb-1">SELECT RIDE</h1>
            <p className="text-gray-500 text-sm truncate">{params.get("pickup")} → {params.get("drop")}</p>
          </div>

          <div className="space-y-3">
            {fleet.map((cab) => (
              <motion.div
                key={cab.id}
                onClick={() => setSelectedId(cab.id)}
                whileTap={{ scale: 0.98 }}
                className={`p-5 rounded-3xl cursor-pointer border transition-all ${
                  selectedId === cab.id ? 'bg-indigo-600 border-indigo-400 shadow-lg' : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold uppercase opacity-60 tracking-widest">{cab.type}</span>
                    <h3 className="text-xl font-bold">{cab.name}</h3>
                    <p className="text-xs opacity-70 mt-1">Arrival: {cab.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black">₹{cab.price}</p>
                    <div className="flex items-center gap-1 text-[10px] text-yellow-500 justify-end">
                      <FaStar /> 4.9
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 bg-black/50 backdrop-blur-md border-t border-white/5">
          <button 
            disabled={!selectedId}
            onClick={() => setIsBooking(true)}
            className="w-full bg-white text-black py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-20"
          >
            Request {selectedId ? fleet.find(f => f.id === selectedId)?.name : 'Ride'}
          </button>
        </div>
      </aside>

      {/* Map Content */}
      <section className="flex-1 relative order-first lg:order-last h-[40vh] lg:h-full">
        <Map pickup={params.get("pickup")} drop={params.get("drop")} fleet={fleet} />
      </section>

      {/* Booking Status Overlay */}
      <AnimatePresence>
        {isBooking && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="max-w-md w-full text-center">
              <div className="w-24 h-24 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-8" />
              <h2 className="text-4xl font-black italic mb-2">CONNECTING...</h2>
              <p className="text-gray-400 mb-8">Securing the nearest {fleet.find(f => f.id === selectedId)?.name} for your route.</p>
              <button 
                onClick={() => setIsBooking(false)}
                className="px-8 py-3 bg-white/10 rounded-full text-sm font-bold border border-white/10"
              >
                Cancel Request
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}