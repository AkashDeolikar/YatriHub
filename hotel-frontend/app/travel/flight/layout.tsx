'use client';

import Navbar from "@/app/navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";

// Note: Metadata must be in a separate Server Component file if using 'use client'
// For this refactor, I am focusing on the visual and structural architecture.

interface LayoutProps {
  children: React.ReactNode;
}

export default function FlightsLayout({ children }: LayoutProps) {
  const containerRef = useRef(null);
  
  // Parallax subtle movement for background depth
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#020202] text-zinc-400 flex flex-col selection:bg-teal-500/30 overflow-x-hidden font-sans"
    >
      {/* 🌌 AETHERIAL BACKGROUND SYSTEM */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Layer 1: Technical Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="layout-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#layout-grid)" />
        </svg>

        {/* Layer 2: Atmospheric Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/[0.02] blur-[120px] rounded-full" />

        {/* Layer 3: Noise Texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      {/* ACCESSIBILITY: Skip to Content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:text-black focus:p-4 focus:text-[10px] focus:font-black focus:tracking-widest uppercase">
        Skip to Transit
      </a>

          <Navbar />

      {/* 🚀 MAIN TRANSIT AREA */}
      <main 
        id="main-content"
        className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </main>

      {/* 🏁 FOOTER TERMINAL */}
      <footer className="relative z-10 border-t border-white/[0.03] bg-[#020202]/80 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-16">
            {/* Brand Signature */}
            <div className="space-y-4">
              <h2 className="text-xl font-light tracking-[0.3em] text-white uppercase">
                Sky<span className="text-teal-400 font-serif italic lowercase tracking-normal">book</span>
              </h2>
              <p className="max-w-xs text-[9px] leading-relaxed tracking-[0.1em] text-zinc-500 uppercase font-medium">
                Global transit hub providing seamless aetherial connections across the digital horizon.
              </p>
            </div>

            {/* Quick Navigation Terminal */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <p className="text-[7px] font-black tracking-[0.4em] text-zinc-700 uppercase">Protocols</p>
                <ul className="space-y-2">
                  {['Privacy', 'Terms', 'Security'].map((item) => (
                    <li key={item}>
                      <Link href={`/${item.toLowerCase()}`} className="text-[9px] tracking-[0.2em] uppercase hover:text-teal-400 transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-[7px] font-black tracking-[0.4em] text-zinc-700 uppercase">Support</p>
                <ul className="space-y-2">
                  {['Contact', 'FAQ', 'Terminal'].map((item) => (
                    <li key={item}>
                      <Link href={`/${item.toLowerCase()}`} className="text-[9px] tracking-[0.2em] uppercase hover:text-teal-400 transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Block */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.02] gap-4">
            <p className="text-[7px] text-zinc-800 tracking-[0.8em] uppercase">
              Skybook Airlines &copy; 2026 / All Nodes Active
            </p>
            <div className="flex items-center gap-4">
              <div className="h-1 w-1 rounded-full bg-teal-500 animate-pulse" />
              <p className="text-[7px] text-zinc-600 tracking-[0.3em] uppercase">System Status: Nominal</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}