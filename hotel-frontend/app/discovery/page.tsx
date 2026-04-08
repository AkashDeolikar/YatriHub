"use client";

import DiscoveryGrid from "./components/discovery/DiscoveryGrid";
import { motion } from "framer-motion";
import { FiSearch, FiSliders } from "react-icons/fi";

export default function DiscoveryPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 font-sans antialiased selection:bg-emerald-500/30">
      
      {/* 🌌 ATMOSPHERIC LAYER */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-12 lg:py-24">

        {/* 🔥 HEADER SECTION */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-white leading-[0.85] mb-6">
              Refined <br />
              <span className="italic font-serif text-emerald-400 font-light">Experiences</span>
            </h1>

            <p className="text-zinc-500 text-lg font-light leading-relaxed">
              Curated environments tailored to your specific requirements.
            </p>
          </motion.div>

          {/* UNIFIED CONTROLS */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 w-full lg:w-auto"
          >
            <div className="relative group flex-1 lg:w-72">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-zinc-900/40 border border-zinc-800/50 rounded-full py-3.5 pl-11 pr-5 text-sm text-white focus:outline-none focus:border-emerald-500/40 focus:bg-zinc-900 transition-all shadow-sm"
              />
            </div>
            
            <button className="flex items-center justify-center aspect-square h-[46px] bg-zinc-900 border border-zinc-800/50 rounded-full text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all">
               <FiSliders size={18} />
            </button>
          </motion.div>
        </header>

        {/* 📦 GRID SECTION */}
        <section className="relative">
          <DiscoveryGrid />
        </section>

      </div>
    </main>
  );
}