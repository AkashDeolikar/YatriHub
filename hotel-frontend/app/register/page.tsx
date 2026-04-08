'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const containerRef = useRef(null);

  // Parallax logic
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const yDots = useTransform(scrollY, [0, 500], [0, -50]); // Slower parallax for dots
  const rotate = useTransform(scrollY, [0, 500], [0, 25]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('ALL COORDINATES REQUIRED');
      return;
    }
    setLoading(true);
    // ... rest of your logic
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#020202] text-zinc-400 flex flex-col items-center justify-center p-6 selection:bg-teal-500/30 overflow-hidden cursor-default"
    >
      {/* 🌌 ATMOSPHERIC DEPTH: MULTI-LAYERED BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        
        {/* Layer 1: The Technical Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Layer 2: Parallax Particle Dots (The "Hub" Nodes) */}
        <motion.svg 
          style={{ y: yDots }}
          className="absolute inset-0 w-full h-full opacity-20"
        >
          {/* Creating a scattered "constellation" of dots */}
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              cx={`${Math.random() * 100}%`}
              cy={`${Math.random() * 100}%`}
              r={Math.random() * 1.5}
              fill="#2dd4bf"
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ 
                duration: 3 + Math.random() * 4, 
                repeat: Infinity, 
                delay: Math.random() * 5 
              }}
            />
          ))}
        </motion.svg>

        {/* Layer 3: The Main Aetherial Petal */}
        <motion.svg
          style={{ y: y1, rotate }}
          viewBox="0 0 800 800"
          className="absolute -right-40 -bottom-40 md:-right-20 md:-top-20 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px]"
          fill="none"
        >
          <defs>
            <linearGradient id="line-gradient" x1="400" y1="0" x2="400" y2="800" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0" />
              <stop offset="0.5" stopColor="#2dd4bf" stopOpacity="0.8" />
              <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="soft-glow" cx="400" cy="400" r="300">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="400" cy="400" r="300" fill="url(#soft-glow)" />
          <motion.path
            d="M400 50 C 100 50, 50 250, 400 750 C 750 300, 700 50, 400 50"
            stroke="url(#line-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.svg>

        {/* Layer 4: Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[340px]"
      >
        {/* BRANDING */}
        <header className="mb-12 text-center">
          <motion.h1 className="text-4xl font-light text-white uppercase tracking-[0.25em]">
            Yatri<span className="text-teal-400 font-serif italic lowercase tracking-normal">hub</span>
          </motion.h1>
          <div className="flex items-center justify-center gap-3 mt-4 text-zinc-500 uppercase font-black text-[8px] tracking-[0.5em]">
            <div className="h-px w-6 bg-zinc-900" />
            <p>Credential Enrollment</p>
            <div className="h-px w-6 bg-zinc-900" />
          </div>
        </header>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-8">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="py-2 border-b border-teal-500/20 text-center">
                <p className="text-[9px] text-teal-400 tracking-[0.2em] uppercase font-bold">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            {['Full Designation', 'Identity', 'Security'].map((label, idx) => (
              <div key={label} className="group relative">
                <label className="text-[7px] font-black tracking-[0.3em] text-zinc-700 group-focus-within:text-teal-400 transition-colors uppercase">{label}</label>
                <input
                  type={label === 'Security' ? 'password' : 'text'}
                  placeholder={label.toUpperCase()}
                  onChange={(e) => {
                    if(idx === 0) setName(e.target.value);
                    if(idx === 1) setEmail(e.target.value);
                    if(idx === 2) setPassword(e.target.value);
                  }}
                  className="w-full bg-transparent border-b border-zinc-900 py-3 text-xs tracking-[0.2em] text-white outline-none transition-all focus:border-teal-500/30 placeholder:text-zinc-900 font-medium"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full relative group mt-6 overflow-hidden bg-white text-black py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all
            hover:text-teal-400
            hover:shadow-[inset_0_0_30px_rgba(45,112,101,0.3)] 
            active:scale-[0.98] disabled:bg-zinc-900 disabled:text-zinc-600"
          >
            <span className="relative z-10">{loading ? 'Processing...' : 'Complete Enrollment'}</span>
            <motion.div className="absolute inset-0 bg-[#080808]" initial={{ y: "100%" }} whileHover={{ y: 0 }} transition={{ duration: 0.4 }} />
          </button>
        </form>

        <footer className="mt-20 text-center flex flex-col items-center gap-6">
          <Link href="/login" className="text-[9px] tracking-[0.3em] uppercase font-bold text-zinc-700 hover:text-white transition-all underline underline-offset-8 decoration-zinc-900">
            Already an active traveler?
          </Link>
          <p className="text-[6px] text-zinc-800 tracking-[0.8em] uppercase">Global Concierge &copy; 2026</p>
        </footer>
      </motion.div>
    </div>
  );
}