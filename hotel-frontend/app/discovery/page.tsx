"use client";

import DiscoveryGrid from "./components/discovery/DiscoveryGrid";
import { motion } from "framer-motion";
import { FiChevronRight, FiSearch } from "react-icons/fi";

export default function DiscoveryPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-300 selection:bg-emerald-500/30">

      {/* 🌌 BACKGROUND SYSTEM */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:18px_28px]" />

        {/* GLOW */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16">

        {/* 🔹 TOP BAR */}
        <div className="flex items-center justify-between mb-10">

          {/* LEFT: BREADCRUMB */}
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] font-bold text-zinc-600">
            <span className="hover:text-zinc-400 cursor-pointer transition">Platform</span>
            <FiChevronRight />
            <span className="text-emerald-400">Discovery</span>
          </div>

          {/* RIGHT: STATUS */}
          <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-md">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-zinc-500">System Live</span>
          </div>
        </div>

        {/* 🔥 HEADER */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-tight mb-4">
              Discovery{" "}
              <span className="text-emerald-400 font-light">Grid</span>
            </h1>

            <p className="text-zinc-500 text-sm max-w-lg leading-relaxed">
              Explore curated experiences powered by real-time local intelligence,
              adaptive recommendations, and spatial awareness systems.
            </p>
          </motion.div>

          {/* RIGHT CONTROLS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">

            {/* SEARCH */}
            <div className="relative w-full sm:w-72 group">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-400 transition" />

              <input
                type="text"
                placeholder="Search experiences..."
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all"
              />
            </div>

            {/* CTA */}
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold tracking-widest px-6 py-3 rounded-lg transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
              Explore
            </button>
          </div>
        </div>

        {/* 📦 GRID SECTION */}
        <section className="border-t border-white/[0.08] pt-10">
          <DiscoveryGrid />
        </section>

      </div>
    </main>
  );
}