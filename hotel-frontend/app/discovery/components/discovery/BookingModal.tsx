"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiLoader, FiPlus, FiMinus } from "react-icons/fi";

export default function BookingModal({ item, onClose, onConfirm, form, onFormChange, isSubmitting }: any) {
  if (!item) return null;
  const totalPrice = item.price * form.guests;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-zinc-950/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl"
        >
          {/* Header Image Snippet */}
          <div className="h-32 w-full relative">
            <img src={item.image} className="w-full h-full object-cover opacity-40 grayscale" />
            <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-all">
              <FiX size={18} />
            </button>
            <div className="absolute bottom-6 left-8">
              <h2 className="text-2xl font-medium tracking-tight text-white">{item.name}</h2>
              <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">{item.category}</p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Arrival Date</label>
                <input 
                  type="date" value={form.date} onChange={(e) => onFormChange("date", e.target.value)}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Party Size</label>
                <div className="flex items-center justify-between bg-zinc-800/50 border border-zinc-700 rounded-xl px-2 py-1">
                  <button onClick={() => onFormChange("guests", Math.max(1, form.guests - 1))} className="p-2 text-zinc-400 hover:text-white"><FiMinus /></button>
                  <span className="text-sm font-medium text-white">{form.guests}</span>
                  <button onClick={() => onFormChange("guests", form.guests + 1)} className="p-2 text-zinc-400 hover:text-white"><FiPlus /></button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Available Slots</label>
              <div className="flex flex-wrap gap-2">
                {["09:00 AM", "01:00 PM", "06:00 PM"].map((slot) => (
                  <button
                    key={slot} onClick={() => onFormChange("slot", slot)}
                    className={`px-4 py-2 rounded-lg text-[11px] font-bold transition-all border ${
                      form.slot === slot ? "bg-emerald-500 text-black border-emerald-500" : "bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Total Investment</p>
                <p className="text-2xl font-medium text-white">₹{totalPrice.toLocaleString()}</p>
              </div>
              
              <button
                disabled={!form.date || !form.slot || isSubmitting}
                onClick={() => onConfirm({ ...item, ...form, totalPrice })}
                className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-20 disabled:grayscale text-black px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-3"
              >
                {isSubmitting ? <FiLoader className="animate-spin" /> : "Confirm Reservation"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}