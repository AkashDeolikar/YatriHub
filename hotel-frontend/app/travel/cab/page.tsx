"use client";

import { useRouter } from "next/navigation";
import { useState, KeyboardEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Calendar, ArrowRight } from "lucide-react";
import {
  FiCompass,
} from "react-icons/fi";

export default function YatriHubLanding() {
  const router = useRouter();
  const [search, setSearch] = useState({ pickup: "", drop: "", date: "" });
  const [isFocused, setIsFocused] = useState<string | null>(null);

  const handleSearch = () => {
    // Simple validation with visual feedback could be added here
    if (!search.pickup || !search.drop) return;

    const params = new URLSearchParams({
      pickup: search.pickup,
      drop: search.drop,
      date: search.date,
    });

    router.push(`/travel/cab/results?${params.toString()}`);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden selection:bg-indigo-500/30">
      {/* Interactive Background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex justify-between items-center p-8 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
          
          <Link href="/" className="group flex items-center gap-2.5 shrink-0">
            <div className="relative">
              <FiCompass className="text-teal-400 text-2xl group-hover:rotate-[360deg] transition-transform duration-1000 ease-expo" />
              <div className="absolute inset-0 bg-teal-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold text-white">
              Yatri<span className="text-teal-400">Hub</span>
            </span>
          </Link>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <Link href="#" className="hover:text-white transition">Fleet</Link>
          <Link href="#" className="hover:text-white transition">Business</Link>
          <Link href="#" className="hover:text-white transition">Support</Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto pt-10 px-6 pb-0">
        {/* Hero Section */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
              Next-Gen Mobility
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-6">
              MOVE WITH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                PURPOSE.
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
              Experience YATRIhub's premium fleet. Seamlessly connecting your
              ambition with your destination across 50+ urban hubs.
            </p>
          </motion.div>
        </div>

        {/* Search Engine Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.6rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative bg-[#0a0a0a] border border-white/10 p-3 rounded-[2.5rem] shadow-2xl">
            <div className="grid md:grid-cols-[1fr_1fr_0.6fr_auto] gap-2">

              {/* Pickup Input */}
              <div className={`flex items-center px-6 py-4 rounded-[1.8rem] transition-all ${isFocused === 'pickup' ? 'bg-white/5' : ''}`}>
                <MapPin size={20} className="text-indigo-500 mr-4" />
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">From</span>
                  <input
                    placeholder="Enter pickup point"
                    className="bg-transparent outline-none text-white placeholder:text-gray-600 font-medium"
                    onFocus={() => setIsFocused('pickup')}
                    onBlur={() => setIsFocused(null)}
                    onChange={(e) => setSearch({ ...search, pickup: e.target.value })}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>

              {/* Dropoff Input */}
              <div className={`flex items-center px-6 py-4 rounded-[1.8rem] transition-all ${isFocused === 'drop' ? 'bg-white/5' : ''}`}>
                <Navigation size={20} className="text-purple-500 mr-4" />
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">To</span>
                  <input
                    placeholder="Drop-off location"
                    className="bg-transparent outline-none text-white placeholder:text-gray-600 font-medium"
                    onFocus={() => setIsFocused('drop')}
                    onBlur={() => setIsFocused(null)}
                    onChange={(e) => setSearch({ ...search, drop: e.target.value })}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>

              {/* Date Input */}
              <div className={`flex items-center px-6 py-4 rounded-[1.8rem] transition-all ${isFocused === 'date' ? 'bg-white/5' : ''}`}>
                <Calendar size={20} className="text-gray-400 mr-4" />
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">When</span>
                  <input
                    type="date"
                    className="bg-transparent outline-none text-white placeholder:text-gray-600 font-medium [color-scheme:dark]"
                    onFocus={() => setIsFocused('date')}
                    onBlur={() => setIsFocused(null)}
                    onChange={(e) => setSearch({ ...search, date: e.target.value })}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleSearch}
                disabled={!search.pickup || !search.drop}
                className="bg-white text-black font-bold px-8 py-4 rounded-[1.8rem] hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black"
              >
                <span>SEARCH</span>
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>

            </div>
          </div>
        </motion.div>

        {/* Floating Stats or Trust Markers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap gap-12 text-sm text-gray-500 font-mono uppercase tracking-widest"
        >
          <div className="flex flex-col gap-1">
            <span className="text-white font-bold text-lg">500+</span>
            <span>Active Fleet</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white font-bold text-lg">4.9/5</span>
            <span>Rider Rating</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white font-bold text-lg">&lt; 5MIN</span>
            <span>Wait Time</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}