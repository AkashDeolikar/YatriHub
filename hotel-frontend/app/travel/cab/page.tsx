"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CabLanding() {
  const router = useRouter();
  const [search, setSearch] = useState({ pickup: "", drop: "", date: "" });

  const handleSearch = () => {
    if (!search.pickup || !search.drop) return;
    router.push(`/travel/cab/results?pickup=${search.pickup}&drop=${search.drop}&date=${search.date}`);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-black to-purple-900/20" />
      
      <nav className="relative z-10 flex justify-between p-8 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold">HOTEL<span className="text-indigo-500">OS</span></Link>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto pt-20 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-7xl font-black tracking-tighter mb-4">CITY <span className="text-indigo-500">DRIFT.</span></h1>
          <p className="text-gray-400 text-xl mb-12">Premium on-demand mobility for the modern traveler.</p>
        </motion.div>

        <div className="bg-[#111] border border-white/10 p-2 rounded-[2.5rem] shadow-2xl">
          <div className="grid md:grid-cols-3 gap-2">
            <input 
              placeholder="Pickup Point"
              className="bg-transparent p-6 outline-none border-b md:border-b-0 md:border-r border-white/5 focus:bg-white/5 transition rounded-tl-[2rem]"
              onChange={(e) => setSearch({...search, pickup: e.target.value})}
            />
            <input 
              placeholder="Drop Location"
              className="bg-transparent p-6 outline-none border-b md:border-b-0 md:border-r border-white/5 focus:bg-white/5 transition"
              onChange={(e) => setSearch({...search, drop: e.target.value})}
            />
            <button 
              onClick={handleSearch}
              className="bg-white text-black font-black uppercase tracking-widest p-6 rounded-[2rem] hover:bg-indigo-500 hover:text-white transition-all"
            >
              Check Availability
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}