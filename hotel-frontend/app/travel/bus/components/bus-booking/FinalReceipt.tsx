import { motion } from "framer-motion";
import { Bus, Passenger } from "../../types/bus";
import { FaDownload, FaShareNodes, FaBusSimple } from "react-icons/fa6";

interface ReceiptProps {
  id: string;
  bus: Bus;
  seats: number[];
  passenger: Passenger;
  onReset: () => void;
}

export default function FinalReceipt({ id, bus, seats, passenger, onReset }: ReceiptProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      {/* TICKET CONTAINER */}
      <div className="bg-[#0A0A0A] rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl shadow-pink-500/10">
        
        {/* TOP SECTION: ROUTE INFO */}
        <div className="p-8 bg-gradient-to-b from-pink-500/10 to-transparent">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center text-black">
              <FaBusSimple size={24} />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-pink-500 tracking-widest uppercase">Confirmed_Entry</p>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">Boarding Pass</h2>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4 mb-4">
            <div>
              <p className="text-[10px] font-mono text-gray-500 uppercase">From</p>
              <p className="text-xl font-black tracking-tighter uppercase">{bus.origin}</p>
            </div>
            <div className="flex-1 border-t border-dashed border-white/20 relative">
               <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#db2777]" />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-gray-500 uppercase">To</p>
              <p className="text-xl font-black tracking-tighter uppercase">{bus.destination}</p>
            </div>
          </div>
        </div>

        {/* TEAR LINE AESTHETIC */}
        <div className="relative flex items-center px-2">
          <div className="w-6 h-6 rounded-full bg-black -ml-5 border-r border-white/5" />
          <div className="flex-1 border-t-2 border-dashed border-white/10" />
          <div className="w-6 h-6 rounded-full bg-black -mr-5 border-l border-white/5" />
        </div>

        {/* BOTTOM SECTION: PASSENGER & QR */}
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-y-6">
            <div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Passenger</p>
              <p className="font-bold uppercase tracking-tighter">{passenger.name}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Seats</p>
              <p className="font-bold text-pink-500">{seats.map(s => String(s).padStart(2, '0')).join(", ")}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Departure</p>
              <p className="font-bold">{bus.departure}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Trans_ID</p>
              <p className="font-mono text-[10px] text-white/60">{id.split('-')[1]}</p>
            </div>
          </div>

          {/* SIMULATED QR CODE */}
          <div className="bg-white p-4 rounded-3xl w-40 h-40 mx-auto group cursor-none relative overflow-hidden">
            <div className="grid grid-cols-4 gap-1 opacity-80">
                {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className={`h-7 w-7 ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`} />
                ))}
            </div>
            <div className="absolute inset-0 bg-pink-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
          </div>

          <p className="text-center text-[9px] font-mono text-gray-600 tracking-[0.4em] uppercase">Scan at Terminal for Entry</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <button 
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
        >
          <FaDownload /> PDF_TICKET
        </button>
        <button 
          onClick={onReset}
          className="bg-pink-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-500 shadow-lg shadow-pink-500/20 transition-all"
        >
          New Session
        </button>
      </div>
    </motion.div>
  );
}