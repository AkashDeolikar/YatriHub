"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaPhone, FaShieldAlt, FaCar, FaCheckCircle, FaSpinner } from "react-icons/fa";

export default function CabBookingFlow({ cab, pickup, drop, onClose }: any) {
  const [stage, setStage] = useState<'requesting' | 'searching' | 'confirmed'>('requesting');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('searching'), 2000);
    const t2 = setTimeout(() => setStage('confirmed'), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-[#0f0f0f] border border-white/10 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <div className="p-8">
          <AnimatePresence mode="wait">
            {stage === 'requesting' ? (
              <motion.div key="1" exit={{ opacity: 0 }} className="text-center py-10">
                <FaSpinner className="animate-spin text-4xl text-indigo-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold">Verifying Payment...</h2>
                <p className="text-gray-500 text-sm">Securing fare with HotelOS Pay</p>
              </motion.div>
            ) : stage === 'searching' ? (
              <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full animate-ping" />
                  <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <FaCar className="absolute inset-0 m-auto text-3xl text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold">Connecting to Drivers</h2>
                <p className="text-gray-500 text-sm">Nearby {cab.name} units: 4</p>
              </motion.div>
            ) : (
              <motion.div key="3" initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold uppercase tracking-widest">Driver Assigned</span>
                    <h2 className="text-3xl font-black mt-2 italic">3 MINS AWAY</h2>
                  </div>
                  <FaShieldAlt className="text-indigo-500 text-3xl" />
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                  <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-xl">RK</div>
                  <div className="flex-1">
                    <p className="font-bold">Rajesh Kumar</p>
                    <p className="text-xs text-gray-400 font-mono">WHITE SWIFT • MH 01 AX 4492</p>
                  </div>
                  <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition"><FaPhone /></button>
                </div>

                <div className="p-4 rounded-2xl border border-dashed border-white/10 text-sm space-y-2">
                  <div className="flex justify-between text-gray-400"><span>Est. Fare</span><span className="text-white font-bold">₹{cab.price}</span></div>
                  <div className="flex justify-between text-gray-400"><span>OTP</span><span className="text-indigo-400 font-black text-lg">4492</span></div>
                </div>

                <button onClick={onClose} className="w-full bg-indigo-600 py-4 rounded-2xl font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20">Track Ride Live</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}