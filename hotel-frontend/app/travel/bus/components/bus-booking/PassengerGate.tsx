import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Passenger } from "../../types/bus";
import { FaUserSecret, FaIdCard, FaCreditCard } from "react-icons/fa6";

export default function PassengerGate({ total, onComplete }: { total: number, onComplete: (p: Passenger) => void }) {
  const [p, setP] = useState<Passenger>({ name: "", age: "", gender: "" });
  const [error, setError] = useState("");

  const handleValidation = () => {
    if (!p.name || !p.age || !p.gender) {
      setError("CRITICAL: ALL IDENTITY FIELDS REQUIRED");
      return;
    }
    setError("");
    onComplete(p);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#0A0A0A] p-10 rounded-[3.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
        {/* DECORATIVE TERMINAL ACCENT */}
        <div className="absolute top-0 right-0 p-6 opacity-5 font-mono text-[8px] uppercase leading-none pointer-events-none">
          Auth_Protocol_Active<br />Encryption_256bit<br />Ledger_Verified
        </div>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <FaIdCard className="text-pink-500" />
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">Manifest.</h2>
          </div>
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">Identity Verification & Escrow</p>
        </header>

        <div className="space-y-6">
          {/* NAME INPUT */}
          <div className="space-y-2">
            <label className="text-[9px] font-mono text-gray-600 uppercase ml-4 tracking-widest">Legal_Full_Name</label>
            <div className="relative group">
              <FaUserSecret className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-pink-500 transition-colors" />
              <input 
                className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl font-mono text-sm outline-none focus:border-pink-500 transition-all placeholder:text-gray-700" 
                placeholder="ENTER_IDENTITY" 
                value={p.name}
                onChange={e => setP({...p, name: e.target.value.toUpperCase()})} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* AGE INPUT */}
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-gray-600 uppercase ml-4 tracking-widest">Age_Stamp</label>
              <input 
                type="number"
                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl font-mono text-sm outline-none focus:border-pink-500 transition-all" 
                placeholder="00" 
                value={p.age}
                onChange={e => setP({...p, age: e.target.value})} 
              />
            </div>

            {/* GENDER SELECT */}
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-gray-600 uppercase ml-4 tracking-widest">Biological_Node</label>
              <select 
                className="w-full bg-[#0A0A0A] border border-white/10 p-5 rounded-2xl font-mono text-sm outline-none focus:border-pink-500 transition-all appearance-none cursor-pointer"
                value={p.gender}
                onChange={e => setP({...p, gender: e.target.value})}
              >
                <option value="">GENDER</option>
                <option value="Male">MALE</option>
                <option value="Female">FEMALE</option>
                <option value="Other">OTHER</option>
              </select>
            </div>
          </div>
        </div>

        {/* PRICE SUMMARY */}
        <div className="mt-10 pt-8 border-t border-white/5">
          <div className="flex justify-between items-center mb-6 px-4">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Total_Settlement</span>
            <span className="text-3xl font-black italic tracking-tighter text-white">₹{total}</span>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-[10px] font-mono text-red-500 text-center mb-4"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={handleValidation}
            className="group w-full bg-white hover:bg-pink-600 py-6 rounded-3xl transition-all duration-500 relative overflow-hidden"
          >
            <span className="relative z-10 text-black group-hover:text-white font-black uppercase italic tracking-[0.4em] flex items-center justify-center gap-3">
              <FaCreditCard className="text-sm" />
              Authorize Escrow
            </span>
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-[8px] font-mono text-gray-700 uppercase tracking-[0.5em]">
        By clicking authorize, you agree to the fleet_transport protocols
      </p>
    </div>
  );
}