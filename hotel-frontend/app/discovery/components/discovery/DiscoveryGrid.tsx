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
  } = useBooking();

  const categories = ["All", "Discovery", "Wellness", "Culinary", "Adventure"];

  const filtered =
    filter === "All"
      ? experiences
      : experiences.filter((exp) => exp.category === filter);

  return (
    <div className="max-w-[1400px] mx-auto">

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => {
          const active = filter === cat;

          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                active
                  ? "bg-white text-black"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* GRID */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filtered.map((exp) => (
            <motion.div
              key={exp.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ExperienceCard
                item={exp}
                onBook={(item: any) => setSelectedExp(item)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* MODAL */}
      <BookingModal
        item={selectedExp}
        form={bookingForm}
        onFormChange={handleFormChange}
        onClose={resetBooking}
        onConfirm={(data: any) => {
          console.log("BOOKED:", data);
          resetBooking();
        }}
      />
    </div>
  );
}