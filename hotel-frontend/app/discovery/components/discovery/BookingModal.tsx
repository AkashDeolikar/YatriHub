"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

export default function BookingModal({
  item,
  onClose,
  onConfirm,
  form,
  onFormChange,
  isSubmitting,
}: any) {
  if (!item) return null;

  const totalPrice = item.basePrice * form.guests;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center px-4"
      >
        {/* MODAL */}
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="w-full max-w-md bg-[#141414] rounded-2xl p-6 border border-white/10 shadow-2xl"
        >
          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">{item.name}</h2>
            <p className="text-sm text-gray-400">{item.category}</p>
          </div>

          {/* FORM */}
          <div className="space-y-5">
            
            {/* DATE */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Select Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => onFormChange("date", e.target.value)}
                className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white"
              />
            </div>

            {/* GUESTS */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Guests
              </label>
              <div className="flex items-center justify-between bg-[#222] border border-white/10 rounded-lg px-4 py-2">
                <button
                  onClick={() =>
                    onFormChange("guests", Math.max(1, form.guests - 1))
                  }
                  className="text-lg text-white"
                >
                  −
                </button>

                <span className="text-white font-medium">
                  {form.guests}
                </span>

                <button
                  onClick={() => onFormChange("guests", form.guests + 1)}
                  className="text-lg text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* TIME SLOT */}
            <div>
              <label className="block text-xs text-gray-400 mb-2">
                Time Slot
              </label>

              <div className="flex gap-2 flex-wrap">
                {item.availableSlots.map((slot: string) => (
                  <button
                    key={slot}
                    onClick={() => onFormChange("slot", slot)}
                    className={`px-4 py-2 rounded-lg text-sm border transition ${
                      form.slot === slot
                        ? "bg-white text-black border-white"
                        : "border-white/20 text-gray-300 hover:border-white"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-8 border-t border-white/10 pt-5">
            
            {/* PRICE */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-400">Total</span>
              <span className="text-xl font-semibold text-white">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>

            {/* ACTION */}
            <button
              disabled={!form.date || !form.slot || isSubmitting}
              onClick={() =>
                onConfirm({ ...item, ...form, totalPrice })
              }
              className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-40"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>

            {/* CANCEL */}
            <button
              onClick={onClose}
              className="w-full mt-3 text-sm text-gray-400 hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}