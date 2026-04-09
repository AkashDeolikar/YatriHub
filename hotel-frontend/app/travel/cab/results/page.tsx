"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronLeft, FaShieldAlt, FaUsers, FaClock } from "react-icons/fa";
import { FiCompass, FiTarget } from "react-icons/fi";
import Link from "next/link";

// Dynamic import with a loading placeholder for better UX
const Map = dynamic(() => import("../components/MapComponent"), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#050505] animate-pulse flex items-center justify-center text-gray-700 font-mono text-xs uppercase tracking-widest">Initialising Global Grid...</div>
});

export default function CabResults() {
  const params = useSearchParams();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Enhanced Fleet Data
  const fleet = useMemo(() => [
    { id: 1, type: "Standard", name: "Yatri Lite", price: 245, time: "2 min", seats: 4, pos: [19.075, 72.88], desc: "Affordable, daily commutes" },
    { id: 2, type: "Comfort", name: "Yatri Prime", price: 410, time: "5 min", seats: 4, pos: [19.085, 72.89], desc: "Top-rated drivers, newer cars" },
    { id: 3, type: "Spacious", name: "Yatri Max", price: 680, time: "7 min", seats: 6, pos: [19.065, 72.87], desc: "Perfect for families & luggage" },
    { id: 4, type: "Premium", name: "Yatri Elite", price: 1250, time: "4 min", seats: 4, pos: [19.095, 72.91], desc: "Luxury sedans, professional chauffeurs" },
  ], []);

  const selectedCab = useMemo(() => fleet.find(f => f.id === selectedId), [selectedId, fleet]);

  return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col lg:grid lg:grid-cols-[450px_1fr] overflow-hidden">
      
      {/* Sidebar Interface */}
      <aside className="relative z-20 flex flex-col bg-[#080808] border-r border-white/5 shadow-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="p-8 pb-4">
          <Link href="/travel/cab" className="group inline-flex items-center gap-2 text-[10px] font-black text-gray-500 mb-8 uppercase tracking-[0.2em] hover:text-teal-400 transition-colors">
            <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl font-black tracking-tighter ">CHOOSE <span className="text-teal-400">CAB </span></h1>
            
            {/* Route Visualiser */}
            <div className="relative pl-6 space-y-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-teal-400 before:to-indigo-500">
              <div className="relative">
                <div className="absolute -left-[23px] top-1.5 w-2 h-2 rounded-full bg-teal-400 ring-4 ring-teal-400/20" />
                <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Pickup</p>
                <p className="text-sm font-bold truncate pr-4">{params.get("pickup") || "Current Location"}</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[23px] top-1.5 w-2 h-2 rounded-full bg-indigo-500" />
                <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Drop-off</p>
                <p className="text-sm font-bold truncate pr-4">{params.get("drop") || "Destination"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fleet List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 custom-scrollbar">
          {fleet.map((cab, index) => (
            <motion.div
              key={cab.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedId(cab.id)}
              className={`group p-5 rounded-[2rem] cursor-pointer border transition-all duration-500 ${
                selectedId === cab.id 
                ? 'bg-teal-500 border-teal-400 shadow-[0_0_30px_-10px_rgba(20,184,166,0.5)]' 
                : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.07]'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${selectedId === cab.id ? 'bg-black/20 text-white' : 'bg-teal-500/10 text-teal-400'}`}>
                      {cab.type}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                      <FaUsers size={10} /> {cab.seats}
                    </div>
                  </div>
                  <h3 className={`text-xl font-black tracking-tight ${selectedId === cab.id ? 'text-black' : 'text-white'}`}>
                    {cab.name}
                  </h3>
                  <p className={`text-[11px] mt-1 leading-tight ${selectedId === cab.id ? 'text-black/60' : 'text-gray-500'}`}>
                    {cab.desc}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className={`text-2xl font-black italic leading-none ${selectedId === cab.id ? 'text-black' : 'text-white'}`}>
                    ₹{cab.price}
                  </p>
                  <div className={`flex items-center gap-1 text-[10px] mt-2 font-bold justify-end ${selectedId === cab.id ? 'text-black/60' : 'text-teal-500'}`}>
                    <FaClock className="animate-pulse" /> {cab.time}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="p-8 bg-[#0a0a0a] border-t border-white/5 space-y-4">
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
               <FaShieldAlt className="text-teal-500" /> Secure Payment
             </div>
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
               Visa •••• 4242
             </div>
          </div>
          
          <button 
            disabled={!selectedId}
            onClick={() => setIsBooking(true)}
            className="w-full relative overflow-hidden group/btn bg-white text-black py-5 rounded-[1.8rem] font-black uppercase tracking-[0.2em] transition-all duration-500 disabled:opacity-20 active:scale-95"
          >
            <span className="relative z-10 group-hover/btn:text-white transition-colors">
              Confirm {selectedCab ? selectedCab.name : 'Selection'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-indigo-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </aside>

      {/* Map Viewport */}
      <section className="relative h-[45vh] lg:h-full overflow-hidden order-first lg:order-last">
        <Map 
          pickup={[19.076, 72.877]} // In real SaaS, convert params.pickup to latlng via geocoding
          drop={[19.113, 72.869]}   // Mock coords
          fleet={fleet} 
        />
        
        {/* Floating Map Controls */}
        <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
           <button className="p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:bg-teal-500 transition-colors">
             <FiCompass size={20} />
           </button>
           <button className="p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:bg-teal-500 transition-colors">
             <FiTarget size={20} />
           </button>
        </div>
      </section>

      {/* Booking Modal Overlay */}
      <AnimatePresence>
        {isBooking && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <div className="max-w-sm w-full text-center space-y-8">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-4 border-teal-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-4 bg-teal-500/10 rounded-full flex items-center justify-center">
                  <FiCompass className="text-teal-400 text-3xl animate-pulse" />
                </div>
              </div>
              
              <div>
                <h2 className="text-4xl font-black italic tracking-tighter mb-3">DISPATCHING...</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Validating route with <span className="text-white font-bold">{selectedCab?.name}</span>. 
                  Your driver will be notified immediately.
                </p>
              </div>

              <button 
                onClick={() => setIsBooking(false)}
                className="w-full py-4 bg-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 transition-all"
              >
                Abort Mission
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}