'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Credentials required');
      return;
    }
    setLoading(true);
    setError('');
    // Standard logic...
    setTimeout(() => { setLoading(false); router.push('/dashboard'); }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 flex flex-col items-center justify-center p-8 selection:bg-teal-500/30 overflow-hidden">
      
      {/* 🌌 ATMOSPHERIC DEPTH */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Main soft glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/[0.04] blur-[140px] rounded-full" />
        {/* Subtle noise for texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[320px]"
      >
        {/* BRANDING */}
        <header className="mb-20 text-center">
          <h1 className="text-4xl font-light tracking-[0.25em] text-white uppercase leading-none">
            Yatri<span className="text-teal-400 font-serif italic lowercase tracking-normal">hub</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4">
             <div className="h-px w-4 bg-zinc-800" />
             <p className="text-[8px] tracking-[0.5em] text-zinc-600 uppercase font-black">
               Aetherial Transit
             </p>
             <div className="h-px w-4 bg-zinc-800" />
          </div>
        </header>

        {/* FORM: THE SIGNATURE FIELDS */}
        <div className="space-y-12">
          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="text-[10px] text-teal-500 text-center tracking-[0.2em] uppercase font-bold"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="group relative">
            <label className="text-[8px] font-black tracking-[0.3em] text-zinc-600 group-focus-within:text-teal-400 transition-colors uppercase">Identity</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              className="w-full bg-transparent border-b border-zinc-900 py-3 text-xs tracking-[0.2em] text-white outline-none transition-all focus:border-teal-500/50 placeholder:text-zinc-800 font-medium"
            />
          </div>

          <div className="group relative">
            <label className="text-[8px] font-black tracking-[0.3em] text-zinc-600 group-focus-within:text-teal-400 transition-colors uppercase">Security</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ACCESS KEY"
              className="w-full bg-transparent border-b border-zinc-900 py-3 text-xs tracking-[0.2em] text-white outline-none transition-all focus:border-teal-500/50 placeholder:text-zinc-800 font-medium"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full relative group mt-6 overflow-hidden bg-white text-black py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-20"
          >
            <span className="relative z-10">{loading ? 'Verifying...' : 'Initiate Transit'}</span>
            {/* The Beam Hover Effect */}
            <div className="absolute inset-0 bg-teal-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </button>
        </div>

        {/* FOOTER */}
        <footer className="mt-20 text-center flex flex-col items-center gap-6">
          <Link 
            href="/register" 
            className="text-[9px] tracking-[0.3em] uppercase font-bold text-zinc-700 hover:text-teal-400 transition-colors"
          >
            Enroll in Network
          </Link>
          <div className="h-8 w-px bg-gradient-to-b from-zinc-800 to-transparent" />
          <p className="text-[7px] text-zinc-800 tracking-[0.8em] uppercase whitespace-nowrap">
             Global Concierge &copy; 2026
          </p>
        </footer>
      </motion.div>
    </div>
  );
}