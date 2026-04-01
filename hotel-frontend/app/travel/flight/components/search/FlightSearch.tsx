"use client";

import React, { useState, useCallback } from "react";
import { PlaneTakeoff, PlaneLanding, Calendar, Users, Search, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface FlightFormData {
  from: string;
  to: string;
  date: string;
  passengers: number;
}

interface Props {
  onSearch: (data: FlightFormData) => void;
}

// --- Component ---
export default function FlightSearch({ onSearch }: Props) {
  const [form, setForm] = useState<FlightFormData>({
    from: "",
    to: "",
    date: new Date().toISOString().split("T")[0], // Default to today
    passengers: 1,
  });

  const [error, setError] = useState<string | null>(null);

  // Memoized handler for performance optimization
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null); // Clear error when user types
  }, [error]);

  const handleSearch = () => {
    // Advanced validation logic
    if (!form.from || !form.to) {
      setError("Please specify your origin and destination.");
      return;
    }
    if (form.from.toLowerCase() === form.to.toLowerCase()) {
      setError("Origin and destination cannot be the same.");
      return;
    }
    
    onSearch(form);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-[#0f172a]/80 backdrop-blur-xl p-1 rounded-2xl border border-white/10 shadow-2xl"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Where to next?
            </h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
                Round Trip
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* From Field */}
            <div className="md:col-span-3 relative group">
              <PlaneTakeoff className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                name="from"
                placeholder="Departure City"
                value={form.from}
                onChange={handleChange}
                className="w-full bg-gray-950/50 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 p-4 pl-12 rounded-xl text-white transition-all outline-none"
              />
            </div>

            {/* To Field */}
            <div className="md:col-span-3 relative group">
              <PlaneLanding className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                name="to"
                placeholder="Arrival City"
                value={form.to}
                onChange={handleChange}
                className="w-full bg-gray-950/50 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 p-4 pl-12 rounded-xl text-white transition-all outline-none"
              />
            </div>

            {/* Date Picker */}
            <div className="md:col-span-3 relative group">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full bg-gray-950/50 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 p-4 pl-12 rounded-xl text-white transition-all outline-none appearance-none"
              />
            </div>

            {/* Passengers */}
            <div className="md:col-span-2 relative group">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="number"
                min={1}
                max={9}
                name="passengers"
                value={form.passengers}
                onChange={handleChange}
                className="w-full bg-gray-950/50 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 p-4 pl-12 rounded-xl text-white transition-all outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-1">
              <button
                onClick={handleSearch}
                className="w-full h-full min-h-[58px] bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white flex items-center justify-center rounded-xl transition-all shadow-lg shadow-indigo-500/20"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Dynamic Error State */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 mt-4 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}