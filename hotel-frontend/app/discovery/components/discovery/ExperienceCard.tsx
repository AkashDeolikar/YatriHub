"use client";

import { motion } from "framer-motion";

export default function ExperienceCard({ item, onBook }: any) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group bg-[#111] rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all"
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.image}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* CATEGORY BADGE */}
        <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
          {item.category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-white line-clamp-1">
          {item.name}
        </h3>

        <p className="text-sm text-gray-400">
          {item.duration} • {item.type}
        </p>

        {/* PRICE + BUTTON */}
        <div className="flex items-center justify-between pt-3">
          <span className="text-white font-semibold text-lg">
            ₹{item.price}
          </span>

          <button
            onClick={() => onBook(item)}
            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            Book
          </button>
        </div>
      </div>
    </motion.div>
  );
}