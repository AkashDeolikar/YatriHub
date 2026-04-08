"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export default function ExperienceCard({ item, onBook }: any) {
  return (
    <div 
      className="group cursor-pointer" 
      onClick={() => onBook(item)}
    >
      {/* 🖼️ CLEAN IMAGE CONTAINER */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 rounded-xl mb-5">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Floating Price - Simple & Static */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-zinc-950/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-widest">
            ₹{item.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 📝 CONTENT */}
      <div className="px-1">
        <div className="flex justify-between items-start mb-2">
          <div className="space-y-1">
            <h3 className="text-lg font-medium tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              <span>{item.category}</span>
              <span className="w-1 h-1 bg-zinc-800 rounded-full" />
              <span>{item.duration}</span>
            </div>
          </div>

          {/* Minimal Icon Reveal */}
          <div className="p-2 text-zinc-600 group-hover:text-emerald-500 transition-colors">
            <FiArrowUpRight size={20} className="translate-y-1 -translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-300" />
          </div>
        </div>

        {/* Thin Progress-style underline on hover */}
        <div className="h-px w-0 bg-emerald-500/50 group-hover:w-full transition-all duration-500" />
      </div>
    </div>
  );
}