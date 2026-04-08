"use client";

import { useState } from "react";
import { experiences } from "../../data/experiences";
import { useBooking } from "../../hooks/useBooking";
import ExperienceCard from "./ExperienceCard";
import BookingModal from "./BookingModal";
import { motion, AnimatePresence } from "framer-motion";

export default function DiscoveryGrid() {
  const [filter, setFilter] = useState("All");

  const {
    selectedExp,
    setSelectedExp,
    bookingForm,
    handleFormChange,
    resetBooking,
    confirmReservation, // Using the logic from our updated hook
    isSubmitting,
  } = useBooking();

  const categories = ["All", "Discovery", "Wellness", "Culinary", "Adventure"];

  const filtered = filter === "All"
    ? experiences
    : experiences.filter((exp) => exp.category === filter);

  return (
    <div className="max-w-[1400px] mx-auto">

      {/* 🔹 MINIMALIST FILTER BAR */}
      <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                active ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {active && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-zinc-800 border border-zinc-700 rounded-full -z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 📦 INTELLIGENT GRID */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((exp) => (
            <motion.div
              key={exp.id}
              layout // This makes the card slide when other cards are filtered out
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <ExperienceCard
                item={exp}
                onBook={(item: any) => setSelectedExp(item)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* EMPTY STATE (Filtered) */}
      {filtered.length === 0 && (
        <div className="py-40 text-center border border-dashed border-zinc-800 rounded-[2rem]">
          <p className="text-zinc-500 font-medium tracking-tight">No experiences found in this category.</p>
        </div>
      )}

      {/* MODAL LAYER */}
      <BookingModal
        item={selectedExp}
        form={bookingForm}
        isSubmitting={isSubmitting}
        onFormChange={handleFormChange}
        onClose={resetBooking}
        onConfirm={async (data: any) => {
          const result = await confirmReservation();
          if (result?.success) {
            // You could trigger a success toast here
            resetBooking();
          }
        }}
      />
    </div>
  );
}