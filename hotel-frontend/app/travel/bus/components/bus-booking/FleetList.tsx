// components/bus-booking/FleetList.tsx
import { motion } from "framer-motion";
import { Bus, Route } from "../../types/bus";
import { FaArrowLeftLong, FaClock, FaBolt } from "react-icons/fa6";

export default function FleetList({ items, route, onSelect, onBack }: { items: Bus[], route: Route, onSelect: (b: Bus) => void, onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
      <button onClick={onBack} className="group flex items-center gap-3 text-[10px] font-mono text-gray-500 hover:text-pink-500 transition-all mb-10 tracking-[0.2em]">
        <FaArrowLeftLong className="group-hover:-translate-x-1 transition-transform" /> 
        REINITIALIZE_SEARCH_PROTOCOL
      </button>
      
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
           <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
           <span className="text-[10px] font-mono text-pink-500 uppercase tracking-widest">Active_Pathways</span>
        </div>
        <h2 className="text-5xl md:text-5xl font-black uppercase tracking-tighter leading-none">
          {route.from} <span className="text-pink-500 font-light">→</span> {route.to}
        </h2>
        <div className="flex gap-6 mt-4">
           <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest flex items-center gap-2">
             <FaClock className="text-pink-500/50" /> {route.date}
           </p>
           <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest flex items-center gap-2">
             <FaBolt className="text-pink-500/50" /> {items.length} Units_Online
           </p>
        </div>
      </div>

      <div className="grid gap-6">
        {items.map((bus, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={bus.id} 
            className="group relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between p-8 bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] hover:border-pink-500/40 transition-all cursor-pointer"
            onClick={() => onSelect(bus)}
          >
            {/* Hover Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-[9px] font-mono text-pink-500 border border-pink-500/20 px-2 py-0.5 rounded uppercase">{bus.busNo}</p>
                <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">{bus.type}</p>
              </div>
              <h3 className="text-3xl font-bold uppercase group-hover:text-pink-500 transition-colors">{bus.name}</h3>
              <div className="flex items-center gap-4 mt-2 text-gray-500 font-mono text-[10px]">
                <span>DEP: {bus.departure}</span>
                <span className="text-white/10">|</span>
                <span>ARR: {bus.arrival}</span>
              </div>
            </div>

            <div className="text-right relative z-10 mt-6 md:mt-0 flex items-center gap-8 self-end md:self-center">
               <div className="text-right">
                  <p className="text-[10px] font-mono text-gray-600 uppercase mb-1">Fare_Rate</p>
                  <p className="text-4xl font-black italic tracking-tighter">₹{bus.price}</p>
               </div>
               <button className="bg-white text-black h-14 px-8 rounded-2xl font-black uppercase italic tracking-widest text-xs group-hover:bg-pink-500 group-hover:text-white transition-all shadow-xl shadow-black">
                 Allocate
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}