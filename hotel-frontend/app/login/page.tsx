'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const containerRef = useRef(null);

  // Parallax logic for the SVG background
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 25]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('CREDENTIALS REQUIRED');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      setTimeout(() => router.push('/dashboard'), 800);
    }, 1800);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#020202] text-zinc-400 flex flex-col items-center justify-center p-6 selection:bg-teal-500/30 overflow-hidden cursor-default"
    >

      {/* ATMOSPHERIC DEPTH: COMBINED SVG LAYER */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* The Grid Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* The Petal SVG (Imported from Hero) */}
        <motion.svg
          style={{ y: y1, rotate }}
          viewBox="0 0 800 800"
          className="absolute -right-40 -top-40 md:-right-20 md:-top-20 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="line-gradient" x1="400" y1="0" x2="400" y2="800" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0" />
              <stop offset="0.5" stopColor="#2dd4bf" stopOpacity="1" />
              <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="glow-radial" cx="400" cy="400" r="300" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0.15" />
              <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="400" cy="400" r="300" fill="url(#glow-radial)" />
          <motion.path
            d="M400 50 C 100 50, 50 250, 400 750 C 750 300, 700 50, 400 50"
            stroke="url(#line-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          />

          <motion.path
            d="M400 100 C 150 100, 100 300, 400 700 C 700 300, 650 100, 400 100"
            stroke="#2dd4bf"
            strokeWidth="0.5"
            strokeDasharray="10 20"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
          />
        </motion.svg>

        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3.2, ease: [0.5, 1, 0.6, 1] }}
        className="relative z-10 w-full max-w-[340px]"
      >
        {/* BRANDING */}
        <header className="mb-16 text-center">
          <motion.h1
            initial={{ letterSpacing: "0.1em" }}
            animate={{ letterSpacing: "0.25em" }}
            className="text-4xl font-light text-white uppercase leading-none"
          >
            Yatri<span className="text-teal-400 font-serif italic lowercase tracking-normal">hub</span>
          </motion.h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-6 bg-zinc-800" />
            <p className="text-[8px] tracking-[0.5em] text-zinc-500 uppercase font-black">Aetherial Transit</p>
            <div className="h-px w-6 bg-zinc-800" />
          </div>
        </header>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-10">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 py-2 border border-teal-500/20 bg-teal-500/5 rounded"
              >
                <p className="text-[9px] text-teal-500 tracking-[0.2em] uppercase font-bold">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-8">
            <div className="group relative">
              <label className="text-[8px] font-black tracking-[0.3em] text-zinc-600 group-focus-within:text-teal-400 transition-colors uppercase">Identity</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-zinc-800 py-3 text-xs tracking-[0.2em] text-white outline-none transition-all focus:border-teal-500 caret-teal-500 placeholder:text-zinc-800 font-medium lowercase"
              />
            </div>

            <div className="group relative">
              <div className="flex justify-between items-center">
                <label className="text-[8px] font-black tracking-[0.3em] text-zinc-600 group-focus-within:text-teal-400 transition-colors uppercase">Security</label>
                <Link href="#" className="text-[8px] text-red-400 hover:text-teal-500 transition-colors uppercase tracking-normal">Forgot?</Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ACCESS KEY"
                className="w-full bg-transparent border-b border-zinc-800 py-3 text-xs tracking-[0.2em] text-white outline-none transition-all focus:border-teal-500 caret-teal-500 placeholder:text-zinc-800 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || isSuccess}
            className="w-full relative group mt-4 overflow-hidden bg-white text-black py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:text-teal-400
    hover:border-teal-500/30
    hover:shadow-[inset_0_0_30px_rgba(45,112,101,0.3)] active:scale-[0.98] disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            <span className="relative z-10">
              {isSuccess ? 'Access Granted' : loading ? 'Verifying Identity...' : 'Initiate Transit'}
            </span>
            <motion.div className="absolute inset-0 bg-teal-400" initial={{ y: "100%" }} whileHover={{ y: 0 }} />
          </button>
        </form>

        <footer className="mt-20 text-center flex flex-col items-center gap-8">
          <Link href="/register" className="text-[10px] tracking-[0.3em] uppercase font-bold text-zinc-500 hover:text-white transition-all underline underline-offset-8 decoration-zinc-800 hover:decoration-teal-500">
            Enroll in Network
          </Link>
          <div className="h-10 w-px bg-gradient-to-b from-zinc-800 to-transparent" />
          <p className="text-[7px] text-zinc-800 tracking-[0.8em] uppercase whitespace-nowrap">Global Concierge &copy; 2026</p>
        </footer>
      </motion.div>
    </div>
  );
}