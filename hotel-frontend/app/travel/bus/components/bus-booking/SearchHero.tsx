import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOCATIONS } from "../../lib/bus-utils";
import { FaLocationDot, FaMapPin, FaCalendarDay, FaArrowsRotate } from "react-icons/fa6";

export default function SearchHero({ onProceed }: { onProceed: (r: any) => void }) {
  const [form, setForm] = useState({ from: "", to: "", date: "" });

  const swapLocations = () => {
    setForm(prev => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const isFormValid = form.from && form.to && form.date && form.from !== form.to;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="relative bg-[#0A0A0A] border border-white/5 p-8 md:p-10 rounded-[3.5rem] overflow-hidden"
    >
      {/* BACKGROUND ACCENT */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 blur-[100px] rounded-full -mr-32 -mt-32" />

      <header className="mb-12 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[1px] w-12 bg-pink-500" />
          <span className="text-[10px] font-mono text-pink-500 uppercase tracking-[0.5em]">Network_Initialization</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
          Define <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-white">Travel_Vector.</span>
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10">
        {/* ORIGIN */}
        <div className="md:col-span-4 group">
          <label className="block text-[9px] font-mono text-gray-500 uppercase ml-5 mb-2 tracking-widest">Origin_Node</label>
          <div className="relative flex items-center bg-white/5 border border-white/10 rounded-[2rem] p-2 focus-within:border-pink-500/50 transition-all">
            <div className="w-12 h-12 rounded-[1.5rem] bg-pink-500/10 flex items-center justify-center text-pink-500">
              <FaLocationDot />
            </div>
            <select 
              value={form.from}
              className="bg-transparent w-full p-4 font-mono text-sm outline-none appearance-none cursor-pointer" 
              onChange={e => setForm({...form, from: e.target.value})}
            >
              <option value="" className="bg-[#0A0A0A]">SELECT_SOURCE</option>
              {LOCATIONS.map(l => <option key={l} value={l} className="bg-[#0A0A0A]">{l.toUpperCase()}</option>)}
            </select>
          </div>
        </div>

        {/* SWAP BUTTON */}
        <div className="md:col-span-1 flex items-end justify-center pb-3">
          <button 
            onClick={swapLocations}
            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 hover:rotate-180 transition-all duration-500 group"
          >
            <FaArrowsRotate className="text-gray-500 group-hover:text-white" />
          </button>
        </div>

        {/* TARGET */}
        <div className="md:col-span-4">
          <label className="block text-[9px] font-mono text-gray-500 uppercase ml-5 mb-2 tracking-widest">Target_Node</label>
          <div className="relative flex items-center bg-white/5 border border-white/10 rounded-[2rem] p-2 focus-within:border-pink-500/50 transition-all">
            <div className="w-12 h-12 rounded-[1.5rem] bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <FaMapPin />
            </div>
            <select 
              value={form.to}
              className="bg-transparent w-full p-4 font-mono text-sm outline-none appearance-none cursor-pointer"
              onChange={e => setForm({...form, to: e.target.value})}
            >
              <option value="" className="bg-[#0A0A0A]">SELECT_DESTINATION</option>
              {LOCATIONS.map(l => <option key={l} value={l} className="bg-[#0A0A0A]">{l.toUpperCase()}</option>)}
            </select>
          </div>
        </div>

        {/* DATE */}
        <div className="md:col-span-3">
          <label className="block text-[9px] font-mono text-gray-500 uppercase ml-5 mb-2 tracking-widest">Date_Stamp</label>
          <div className="relative flex items-center bg-white/5 border border-white/10 rounded-[2rem] p-2 focus-within:border-pink-500/50 transition-all">
            <div className="w-12 h-12 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-gray-400">
              <FaCalendarDay />
            </div>
            <input 
              type="date" 
              className="bg-transparent w-full p-4 font-mono text-sm outline-none invert brightness-200" 
              onChange={e => setForm({...form, date: e.target.value})} 
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <button 
          onClick={() => onProceed(form)} 
          disabled={!isFormValid}
          className="group relative w-full overflow-hidden bg-white disabled:opacity-20 py-6 rounded-[2rem] transition-all"
        >
          <div className="absolute inset-0 w-0 bg-pink-500 group-hover:w-full transition-all duration-500" />
          <span className="relative z-10 text-black group-hover:text-white font-black uppercase italic tracking-[0.3em] flex items-center justify-center gap-4">
            Initialize Fleet Protocol 
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity }}>→</motion.span>
          </span>
        </button>
        
        <AnimatePresence>
          {form.from && form.from === form.to && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-[10px] font-mono text-pink-500 text-center mt-4 uppercase tracking-widest"
            >
              Error: Origin and Target nodes cannot be identical.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}