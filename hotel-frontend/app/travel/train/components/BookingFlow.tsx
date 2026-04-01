"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaCheckCircle, FaDownload, FaPrint, FaTrain, FaUser, FaCreditCard, FaArrowLeft, FaQrcode } from "react-icons/fa";

interface BookingFlowProps {
  train: any;
  source: string;
  destination: string;
  selectedClass: string;
  onClose: () => void;
}

export default function BookingFlow({ train, source, destination, selectedClass, onClose }: BookingFlowProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const pnr = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase())[0];

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 lg:p-10">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={step !== 'success' ? onClose : undefined}
      />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]"
      >
        {/* Left Side: Summary (Always visible) */}
        <div className="md:w-1/3 bg-indigo-600 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <FaTrain className="text-xl" />
            </div>
            <h2 className="text-2xl font-black tracking-tighter uppercase mb-1">{train.name}</h2>
            <p className="text-indigo-200 text-xs font-mono">#{train.number} | {selectedClass}</p>
            
            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <div className="w-[1px] h-10 border-l border-dashed border-white/30 my-1" />
                  <div className="w-2 h-2 rounded-full border border-white" />
                </div>
                <div className="flex flex-col justify-between py-0.5">
                  <span className="text-xs font-bold leading-none">{source}</span>
                  <span className="text-xs font-bold leading-none opacity-60">{destination}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/20">
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Total Payable</p>
            <p className="text-3xl font-black italic">₹{train.price[selectedClass]}</p>
          </div>
        </div>

        {/* Right Side: Dynamic Steps */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === 'details' && (
              <motion.div key="details" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <FaUser className="text-indigo-500" /> Passenger Details
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="First Name" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-indigo-500 transition" />
                    <input placeholder="Last Name" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-indigo-500 transition" />
                  </div>
                  <input placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-indigo-500 transition" />
                  <button onClick={() => setStep('payment')} className="w-full bg-indigo-600 py-5 rounded-2xl font-bold uppercase tracking-widest mt-8 hover:bg-indigo-700 transition">
                    Continue to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div key="payment" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <FaCreditCard className="text-indigo-500" /> Secure Payment
                </h3>
                <div className="space-y-4">
                  <div className="p-6 bg-white/5 border border-indigo-500/50 rounded-2xl mb-6 flex items-center justify-between">
                    <span className="text-sm font-medium">UPI / QR Code</span>
                    <div className="w-4 h-4 rounded-full border-4 border-indigo-500" />
                  </div>
                  <button 
                    onClick={() => setStep('success')}
                    className="w-full bg-indigo-600 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-indigo-700 transition"
                  >
                    Pay ₹{train.price[selectedClass]}
                  </button>
                  <button onClick={() => setStep('details')} className="w-full text-gray-500 text-xs font-bold uppercase tracking-widest py-2">
                    Go Back
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheckCircle className="text-green-500 text-4xl" />
                </div>
                <h3 className="text-2xl font-black mb-2">Tickets Confirmed!</h3>
                <p className="text-gray-500 text-sm mb-8">PNR: <span className="text-white font-mono">{pnr}</span></p>
                
                <div className="p-6 bg-white rounded-3xl mb-8 inline-block mx-auto">
                   <FaQrcode className="text-black text-6xl" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition">
                      <FaDownload /> Ticket
                   </button>
                   <button onClick={onClose} className="bg-indigo-600 p-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition text-white">
                      Done
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}