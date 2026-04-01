import { motion } from "framer-motion";
import { Bus } from "../../types/bus";
import { FaCouch,  } from "react-icons/fa6";
import { FaSteamSquare } from "react-icons/fa";

export default function SeatMapper({ bus, selected, onToggle, onProceed }: { bus: Bus, selected: number[], onToggle: (n: number) => void, onProceed: () => void }) {
  // Simulate some occupied seats for SaaS realism
  const occupiedSeats = [3, 7, 12, 18];

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic uppercase text-pink-500 tracking-tighter">Seat_Map</h2>
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{bus.name} // Deck_01</p>
        </div>
        <div className="text-right font-mono text-[10px] text-gray-400">
          UNIT_PRICE: <span className="text-white">₹{bus.price}</span>
        </div>
      </header>

      <div className="bg-[#0A0A0A] p-8 md:p-12 rounded-[4rem] border border-white/5 relative overflow-hidden">
        {/* BUS CABIN FRONT */}
        <div className="flex justify-between items-center mb-12 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-600">
              <FaSteamSquare size={20} className="animate-pulse" />
            </div>
            <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Entry_Gate</span>
          </div>
          <div className="h-2 w-20 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-pink-500/20 w-1/3" />
          </div>
        </div>

        {/* SEAT GRID WITH AISLE */}
        <div className="grid grid-cols-5 gap-y-6 relative">
          {Array.from({ length: 24 }, (_, i) => i + 1).map((n) => {
            const isOccupied = occupiedSeats.includes(n);
            const isSelected = selected.includes(n);
            const isAisle = (n % 5 === 3); // Creates a vertical aisle at index 3

            if (isAisle) return <div key={`aisle-${n}`} className="flex items-center justify-center text-[8px] font-mono text-white/5 rotate-90">AISLE</div>;

            return (
              <motion.button
                key={n}
                whileHover={!isOccupied ? { scale: 1.1 } : {}}
                whileTap={!isOccupied ? { scale: 0.9 } : {}}
                disabled={isOccupied}
                onClick={() => onToggle(n)}
                className={`
                  relative h-14 w-14 rounded-2xl flex items-center justify-center transition-all border
                  ${isOccupied ? "bg-red-400/30 border-transparent text-white cursor-not-allowed" : 
                    isSelected ? "bg-pink-600 border-pink-400 text-white shadow-[0_0_20px_rgba(219,39,119,0.4)]" : 
                    "bg-green-400/30 border-white/10 text-gray-500 hover:border-pink-500/50 hover:text-white"}
                `}
              >
                <FaCouch className={isSelected ? "opacity-40" : "opacity-20"} size={12} />
                <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold">
                  {String(n).padStart(2, '0')}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* LEGEND */}
        <div className="mt-12 pt-8 border-t border-white/5 flex justify-center gap-6">
          <LegendItem label="AVAIL" color="bg-green-600 border-white/10" />
          <LegendItem label="SEL" color="bg-pink-600" />
          <LegendItem label="SOLD" color="bg-red-600 opacity-20" />
        </div>
      </div>

      {/* FOOTER ACTION */}
      <div className="bg-pink-600/5 border border-pink-500/10 p-6 rounded-[2.5rem] flex items-center justify-between">
        <div>
          <p className="text-[10px] font-mono text-pink-500 uppercase">Current_Selection</p>
          <p className="text-xl font-black italic">{selected.length} SEATS <span className="text-gray-600 text-sm">/ ₹{selected.length * bus.price}</span></p>
        </div>
        <button 
          onClick={onProceed} 
          disabled={selected.length === 0}
          className="bg-white text-black h-14 px-10 rounded-2xl font-black uppercase italic tracking-widest hover:bg-pink-500 hover:text-white transition-all disabled:opacity-20"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

function LegendItem({ label, color }: { label: string, color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-sm ${color}`} />
      <span className="text-[8px] font-mono text-gray-500 uppercase tracking-tighter">{label}</span>
    </div>
  );
}