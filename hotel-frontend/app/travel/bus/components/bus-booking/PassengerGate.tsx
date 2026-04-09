"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Passenger } from "../../types/bus";
import { FaUserSecret, FaIdCard, FaCreditCard, FaShieldHalved } from "react-icons/fa6";

interface PassengerGateProps {
  total: number;
  onComplete: (p: Passenger) => void;
}

export default function PassengerGate({ total, onComplete }: PassengerGateProps) {
  const [p, setP] = useState<Passenger>({ name: "", age: "", gender: "" });
  const [error, setError] = useState("");
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleValidation = () => {
    // Basic PaaS-grade Validation
    if (!p.name || p.name.length < 3) {
      setError("VALIDATION_ERROR: NAME_STRING_TOO_SHORT");
      return;
    }
    if (!p.age || Number(p.age) <= 0 || Number(p.age) > 120) {
      setError("VALIDATION_ERROR: INVALID_AGE_STAMP");
      return;
    }
    if (!p.gender) {
      setError("VALIDATION_ERROR: BIOLOGICAL_NODE_UNDEFINED");
      return;
    }

    setError("");
    setIsAuthorizing(true);
    
    // Simulate Encryption/Handshake delay
    setTimeout(() => {
      onComplete(p);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto selection:bg-pink-500/30">
      <div className="bg-[#080808] p-8 md:p-12 rounded-[3.5rem] border border-white/5 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* SECURE OVERLAY DECOR */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none select-none">
          <FaShieldHalved size={80} className="text-zinc-500" />
        </div>

        <header className="mb-12 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-pink-500/10 rounded-lg">
              <FaIdCard className="text-pink-500" size={20} />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Manifest.</h2>
          </div>
          <div className="flex items-center gap-4 font-mono text-[9px] text-zinc-500 uppercase tracking-[0.4em]">
            <span>Identity_Verification</span>
            <span className="h-px w-8 bg-zinc-800" />
            <span>Escrow_Lock</span>
          </div>
        </header>

        <div className="space-y-8 relative z-10">
          {/* NAME INPUT */}
          <div className="space-y-3">
            <label className="text-[10px] font-mono text-zinc-500 uppercase ml-4 tracking-widest flex justify-between">
              <span>Legal_Full_Name</span>
              <span className="text-zinc-700">Type: String</span>
            </label>
            <div className="relative group">
              <FaUserSecret className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-pink-500 transition-colors duration-300" />
              <input 
                className="w-full bg-black border border-white/10 p-5 pl-16 rounded-2xl font-mono text-sm outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all text-white placeholder:text-zinc-800" 
                placeholder="PROMPT_USER_IDENTITY" 
                autoComplete="off"
                value={p.name}
                onChange={e => setP({...p, name: e.target.value.toUpperCase()})} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AGE INPUT */}
            <div className="space-y-3">
              <label className="text-[10px] font-mono text-zinc-500 uppercase ml-4 tracking-widest">Age_Stamp</label>
              <input 
                type="number"
                className="w-full bg-black border border-white/10 p-5 rounded-2xl font-mono text-sm outline-none focus:border-pink-500/50 transition-all text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                placeholder="00" 
                value={p.age}
                onChange={e => setP({...p, age: e.target.value})} 
              />
            </div>

            {/* GENDER SELECT */}
            <div className="space-y-3">
              <label className="text-[10px] font-mono text-zinc-500 uppercase ml-4 tracking-widest">Biological_Node</label>
              <div className="relative">
                <select 
                  className="w-full bg-black border border-white/10 p-5 rounded-2xl font-mono text-sm outline-none focus:border-pink-500/50 transition-all text-white appearance-none cursor-pointer"
                  value={p.gender}
                  onChange={e => setP({...p, gender: e.target.value})}
                >
                  <option value="" className="text-zinc-700">NULL_SELECTION</option>
                  <option value="Male" className="bg-zinc-900">MALE_NODE</option>
                  <option value="Female" className="bg-zinc-900">FEMALE_NODE</option>
                  <option value="Other" className="bg-zinc-900">NON_BINARY_NODE</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                  ▼
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SETTLEMENT AREA */}
        <div className="mt-14 pt-10 border-t border-white/5 relative z-10">
          <div className="flex justify-between items-end mb-8 px-4">
            <div>
              <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest block mb-1">Total_Settlement</span>
              <span className="text-4xl font-black tracking-tighter text-white italic">₹{total.toLocaleString()}</span>
            </div>
            <div className="text-right">
              <span className="text-[8px] font-mono text-green-500/50 uppercase tracking-tighter">Verified_Gateway</span>
              <div className="flex gap-1 mt-1 justify-end">
                {[...Array(3)].map((_, i) => <div key={i} className="w-4 h-1 bg-green-500/20 rounded-full" />)}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                exit={{ opacity: 0, height: 0 }} 
                className="bg-pink-500/5 border border-pink-500/20 p-4 rounded-xl text-[10px] font-mono text-pink-500 text-center mb-6 overflow-hidden"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={handleValidation}
            disabled={isAuthorizing}
            className={`
              group w-full py-7 rounded-2xl transition-all duration-500 relative overflow-hidden font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4
              ${isAuthorizing 
                ? "bg-zinc-800 text-zinc-500 cursor-wait" 
                : "bg-white text-black hover:bg-pink-500 hover:text-white"}
            `}
          >
            {isAuthorizing ? (
              <>
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
                />
                Syncing_Ledger
              </>
            ) : (
              <>
                <FaCreditCard className="text-lg" />
                Authorize Escrow
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.6em]">
          By authorizing, you commit to fleet_transport_infrastructure v.2.4
        </p>
        <div className="h-1 w-24 bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
            animate={{ x: [-100, 100] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="h-full w-1/2 bg-zinc-800" 
          />
        </div>
      </div>
    </div>
  );
}