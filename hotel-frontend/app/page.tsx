"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaShieldAlt, FaChartLine, FaBolt, FaCar, FaUtensils, FaPlane,
  FaTrain, FaPizzaSlice, FaCocktail, FaIceCream, FaArrowRight,
  FaCrown, FaBed, FaHotel, FaKhanda
} from "react-icons/fa";
import { useState } from "react";
const TABS = ["Hotels", "Flights", "Cabs", "Food"];
import Navbar from "./navbar";

function DiscoveryServiceCard({ number, name, href, desc }: any) {
  return (
    <Link href={href} className="group">
      <div className="relative h-[280px] p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-700 flex flex-col justify-between overflow-hidden">
        {/* HOVER GLOW */}
        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

        <div className="flex justify-between items-start">
          <span className="text-[10px] font-serif italic text-white/20 group-hover:text-indigo-400 transition-colors">
            {number}
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
            <span className="text-[10px] tracking-widest uppercase">Explore</span>
          </div>
        </div>

        <div>
          <h4 className="text-2xl font-light tracking-tight text-white/80 group-hover:text-white mb-2 transition-colors uppercase">
            {name}
          </h4>
          <p className="text-[10px] tracking-[0.1em] text-white/30 font-medium uppercase leading-relaxed">
            {desc}
          </p>
        </div>

        {/* BACKGROUND DECOR */}
        <div className="absolute -bottom-4 -right-4 text-white/[0.02] text-8xl font-black group-hover:text-indigo-500/[0.05] transition-colors duration-700 pointer-events-none">
          {number}
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  // Inside your export default function Home() { ... }
  const [activeTab, setActiveTab] = useState("Hotels");
  const chartData = [40, 70, 45, 90, 65, 80, 30, 50, 40, 60, 85, 45, 75, 55, 95];
  const words = [
    { text: "Travel", color: "from-gray-100 to-gray-300", indent: 0 },
    { text: "Stay", color: "from-indigo-400 via-teal-400 to-emerald-400", indent: 200 },
    { text: "Move", color: "from-fuchsia-400 via-pink-400 to-indigo-300", indent: 350 },
    { text: "Experience", color: "from-violet-400 via-pink-500 to-fuchsia-300", indent: 500 },
  ];
  return (
    <div className="min-h-screen bg-[#000] text-white selection:bg-indigo-500/30">
      {/* GLOW BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-28 pb-24 px-6 text-center overflow-hidden">
        {/* 🌌 Background Cosmic Layers */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-20%] left-[-15%] w-[80%] h-[80%] bg-indigo-600/10 blur-[180px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-500/10 blur-[140px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020202_85%)]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative max-w-7xl mx-auto"
        >
          {/* ✨ Tagline */}
          <span className="px-4 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 backdrop-blur-md text-teal-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 inline-block">
            ✨ Now Live: Summer Collection 2026
          </span>

          {/* 🌟 Hero Heading */}
          <div className="relative py-20 px-10">
            {/* Screen Reader Only Title for SEO/Accessibility */}
            <h1 className="sr-only">Travel. Stay. Move. Experience.</h1>

            <div className="relative z-10 flex flex-col gap-4 md:gap-2" aria-hidden="true">
              {words.map((word, i) => (
                <motion.div
                  key={`${word.text}-${i}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  style={{ paddingLeft: `${word.indent}px` }}
                  className="relative flex items-center group w-fit"
                >
                  {/* Animated Step Indicator Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.4 }}
                    className="absolute -left-8 w-3 h-3 rounded-full border border-white/30 bg-white/10 group-hover:bg-teal-400 group-hover:border-teal-400 transition-colors hidden md:block"
                  />

                  <span className={`
                      text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none
                      bg-gradient-to-r ${word.color} bg-clip-text text-transparent
                      hover:brightness-125 transition-all duration-300 cursor-default select-none
                    `}>
                    {word.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* The Animated "Path" Line */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block"
              viewBox="0 0 400 400"
              preserveAspectRatio="none"
            >
              <motion.path
                /**
                 * Petal Logic:
                 * M 100 350 : Start at the bottom (stem)
                 * Q 0 200, 100 50 : Curve out to the left and meet at the tip
                 * Q 200 200, 100 350 : Curve out to the right and return to the base
                 */
                d="M 100 350 Q 0 200, 100 50 Q 200 200, 100 350"
                stroke="url(#petal-gradient)"
                strokeWidth="1.5"
                fill="url(#petal-fill)"
                initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                whileInView={{ pathLength: 1, opacity: 0.6, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 2.5,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  filter: "drop-shadow(0px 0px 10px rgba(45, 212, 191, 0.2))",
                  transformOrigin: "bottom center"
                }}
              />
              <motion.path
                d="M 150 500 Q 50 200, 400 50 Q 200 400, 400 350"
                stroke="url(#petal-gradient)"
                strokeWidth="1"
                fill="url(#petal-fill)"
                initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                whileInView={{ pathLength: 1, opacity: 0.6, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 3.5,
                  delay: 1.5,
                  ease: [0.16, 1, 0.7, 1]
                }}
                style={{
                  filter: "drop-shadow(0px 0px 10px rgba(45, 212, 191, 0.2))",
                  transformOrigin: "bottom center"
                }}
              />
              <defs>
                {/* Outline Gradient */}
                <linearGradient id="petal-gradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0" />
                  <stop offset="50%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="white" />
                </linearGradient>

                {/* Subtle Inner Glow Fill */}
                <radialGradient id="petal-fill" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div className="mt-16 max-w-4xl mx-auto w-full px-4">
            {/* 🌟 Animated Tabs */}
            <div className="flex justify-center gap-8 mb-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === tab ? "text-indigo-400" : "text-gray-500 hover:text-gray-300"
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-teal-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* 🌟 Search Input Group */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="group bg-white/5 border border-white/10 rounded-full p-2 flex items-center gap-2 backdrop-blur-xl shadow-2xl focus-within:border-indigo-500/50 focus-within:bg-white/[0.08] transition-all duration-300"
            >
              <div className="pl-4 text-gray-400 group-focus-within:text-indigo-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <input
                type="text"
                placeholder={`Search for ${activeTab.toLowerCase()}...`}
                className="flex-1 bg-transparent py-3 text-base text-white outline-none placeholder:text-gray-500 font-medium"
              />

              <button className="bg-gradient-to-r from-indigo-600 via-teal-500 to-purple-600 px-8 py-3 rounded-full text-sm font-black uppercase tracking-tighter text-white hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-200">
                Search
              </button>
            </motion.div>

            {/* Quick Suggestions (Optional Production Touch) */}
            <p className="mt-4 text-center text-[10px] text-gray-500 font-medium uppercase tracking-widest opacity-60">
              Popular: <span className="text-gray-300 cursor-pointer hover:text-indigo-400">Manali</span>,
              <span className="text-gray-300 ml-2 cursor-pointer hover:text-indigo-400">Goa</span>,
              <span className="text-gray-300 ml-2 cursor-pointer hover:text-indigo-400">Leh</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* BENTO GRID FEATURES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[650px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 transition-all duration-500 hover:border-indigo-500/30"
          >
            {/* 1. Spotlight Effect - Follows hover (Static version here, can be made dynamic with JS) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),_rgba(99,102,241,0.15)_0%,_transparent_70%)] pointer-events-none" />

            {/* 2. Animated Border Beam (Top Edge) */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

            {/* Content Wrapper */}
            <div className="relative z-10 h-full flex flex-col">

              {/* Icon with Glowing Backdrop */}
              <div className="relative w-fit mb-6">
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
                <FaShieldAlt className="relative text-4xl text-indigo-400 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
              </div>

              {/* Text Section */}
              <div className="space-y-3">
                <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                  Smart Booking <span className="text-indigo-400/80">Engine</span>
                </h3>
                <p className="text-gray-400 text-base leading-relaxed max-w-sm font-medium">
                  Advanced locking at the database level prevents double bookings—ensuring
                  <span className="text-white"> conflict-free transactions</span> in real time.
                </p>
              </div>

              {/* 3. Interactive Stats Grid */}
              <div className="mt-auto pt-8">
                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
                  {[
                    { label: "Hotels", val: "500+" },
                    { label: "Cities", val: "50+" },
                    { label: "Support", val: "24/7" },
                  ].map((stat, i) => (
                    <div key={i} className="group/stat">
                      <div className="text-2xl md:text-3xl font-bold text-white tabular-nums group-hover/stat:text-indigo-400 transition-colors">
                        {stat.val}
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative md:col-span-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]"
          >
            {/* 1. The Header: Improved Hierarchy */}
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                  <FaChartLine className="text-xl text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.15em] text-white/50">
                    Live Intelligence
                  </h3>
                  <p className="text-sm font-semibold text-white">Market Activity</p>
                </div>
              </div>

              {/* Improved Live Badge */}
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-500/5 border border-green-500/20 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-black text-green-400 uppercase tracking-tighter">
                  Live
                </span>
              </div>
            </div>

            {/* 2. Primary Metric: Visual Punch */}
            <div className="relative z-10">
              <div className="flex items-end gap-2 mb-6">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl font-bold tracking-tighter text-white tabular-nums"
                >
                  $42,408
                </motion.span>
                <div className="flex items-center gap-1 text-green-400 font-bold text-sm pb-1">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M7 14l5-5 5 5z" />
                  </svg>
                  <span>12.5%</span>
                </div>
              </div>

              {/* 3. Data Visualization: Animated Bars */}
              <div className="flex items-end gap-1.5 h-16 group/chart">
                {chartData.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.05,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    className="flex-1 bg-gradient-to-t from-indigo-600/20 via-indigo-500/40 to-indigo-400 rounded-t-sm transition-all duration-300 hover:to-white hover:shadow-[0_0_15px_rgba(129,140,248,0.5)] cursor-crosshair"
                  />
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-700" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,white,transparent)] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
          </motion.div>

          {/* INSTANT PAY */}
          <BentoBox className="md:col-span-1 group relative overflow-hidden border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-md hover:border-yellow-500/40 transition-all">
            <div className="p-2 w-fit bg-yellow-500/10 rounded-lg mb-4">
              <FaBolt className="text-yellow-400 text-lg" />
            </div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              Instant Pay
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Secure payments powered by Stripe infrastructure.
            </p>
            <div className="mt-4 text-[10px] text-yellow-400/80 font-medium">
              Stripe Integrated
            </div>
            {/* Glow */}
            <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-yellow-500/10 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition" />
          </BentoBox>

          {/* 24/7 SUPPORT */}
          <BentoBox className="md:col-span-1 group relative overflow-hidden border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-md hover:border-indigo-500/40 transition-all">
            <h3 className="text-4xl font-semibold text-white tracking-tight">
              24<span className="text-indigo-400">/7</span>
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              Autonomous support concierge, always available.
            </p>
            <div className="mt-4 text-[10px] text-indigo-400/80 font-medium">
              AI Assisted Support
            </div>
            {/* Glow */}
            <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-indigo-500/10 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition" />
          </BentoBox>
        </div>
      </section>

      {/* PREMIER ROOMS ECOSYSTEM */}
      <section className="py-24 border-t border-white/5 bg-black relative overflow-hidden">
        {/* Background Ambient Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs font-black tracking-[0.4em] text-indigo-500 uppercase mb-4">
                Accommodations
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Premier <span className="text-white/50">Environments</span>
              </h3>
            </motion.div>

            <Link
              href="/rooms"
              className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-indigo-400 transition-all"
            >
              Discover all units
              <div className="p-2 rounded-full border border-white/10 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>

          {/* The Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">

            {/* Existing Room Cards */}
            <RoomFeatureCard icon={<FaCrown size={30} />} price="30,000" href="/rooms" />
            <RoomStandardCard icon={<FaKhanda />} name="Luxury Suite" href="/rooms" price="20,000" desc="Elevated space with panoramic views." />
            <RoomStandardCard icon={<FaHotel />} name="Business Class" href="/rooms" price="15,000" desc="Designed for productivity and comfort." />
            <RoomStandardCard icon={<FaBed />} name="Smart Standard" href="/rooms" price="9,000" desc="Essential comfort with automated service." />

            {/* UPGRADED: Availability Engine (Now spans full height or takes 5th column) */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative flex flex-col justify-between p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden"
            >
              {/* Animated Background Mesh */}
              <div className="absolute -right-10 -top-10 h-32 w-32 bg-indigo-500/10 blur-[50px] group-hover:bg-indigo-500/20 transition-colors" />

              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                    Live Inventory
                  </h4>
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase tracking-tighter text-gray-500 mb-1">Total Units</p>
                      <p className="text-2xl font-bold text-white tabular-nums">148</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-tighter text-gray-500 mb-1">Available</p>
                      <p className="text-xl font-bold text-indigo-400 tabular-nums">32</p>
                    </div>
                  </div>

                  {/* Occupancy Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-gray-500">Occupancy</span>
                      <span className="text-indigo-400">78%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "78%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-600 to-teal-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button className="mt-8 w-full py-3 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-indigo-500 hover:border-indigo-400 transition-all duration-300">
                Check Schedule
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRAVEL SERVICE SELECTOR */}
      <section className="py-24 border-t border-white/5 bg-[#050505] relative overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">

            <div>
              <h2 className="text-xs font-semibold tracking-[0.3em] text-indigo-400 uppercase mb-3">
                Ecosystem
              </h2>

              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                Travel Services
              </h3>
            </div>

            {/* CTA */}
            <Link
              href="/travel"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              View all services
              <span className="text-indigo-400 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <ServiceCard
              icon={<FaCar />}
              name="Cab Hub"
              href="/travel/cab"
              desc="Ride integrations with real-time pricing"
            />

            <ServiceCard
              icon={<FaPlane />}
              name="Flights"
              href="/travel/flights"
              desc="Global routes with dynamic fares"
            />

            <ServiceCard
              icon={<FaTrain />}
              name="Rail"
              href="/travel/trains"
              desc="Live seat availability & tracking"
            />

            <ServiceCard
              icon={<FaUtensils />}
              name="Gourmet"
              href="/food"
              desc="In-room dining & curated menus"
            />

          </div>
        </div>
      </section>

      {/* GOURMET ECOSYSTEM SECTION */}
      <section className="py-24 border-t border-white/5 bg-[#050505] relative overflow-hidden group/culinary">
        {/* Ambient Culinary Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-fuchsia-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs font-black tracking-[0.4em] text-purple-400 uppercase mb-4">
                Culinary Excellence
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white leading-none">
                Gourmet <span className="text-purple-200/30">Services</span>
              </h3>
            </motion.div>

            <Link
              href="/food"
              className="group/cta flex items-center gap-4 px-8 py-3.5 rounded-full bg-white/[0.02] border border-white/10 text-xs font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-500"
            >
              Open menu
              <FaArrowRight className="text-purple-400 transition-transform group-hover/cta:translate-x-1.5" size={10} />
            </Link>
          </div>

          {/* Grid with Staggered Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FaUtensils />, name: "Main Course", cat: "Indian", desc: "Curated fine dining experiences", delay: 0 },
              { icon: <FaPizzaSlice />, name: "Fast Track", cat: "Pizza", desc: "Quick bites with urban flavors", delay: 0.1 },
              { icon: <FaCocktail />, name: "Mixology", cat: "Liquor", desc: "Premium cocktails & spirits", delay: 0.2 },
              { icon: <FaIceCream />, name: "Patisserie", cat: "Desserts", delay: 0.3, desc: "Artisan desserts & sweet finales" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.5 }}
              >
                <Link
                  href={`/food?cat=${item.cat}`}
                  className="group relative flex flex-col h-full p-8 rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:from-purple-500/10 hover:border-purple-500/30 transition-all duration-700 overflow-hidden"
                >
                  {/* Top "Sparkle" Glow */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 blur-2xl group-hover:bg-purple-500/30 transition-colors duration-700" />

                  <div className="relative z-10">
                    {/* Icon Logic: Larger, floating feel */}
                    <div className="mb-12 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 text-2xl text-purple-300 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500">
                      {item.icon}
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium group-hover:text-gray-400 transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  {/* Subtle "Arrow" hint that appears on hover */}
                  <div className="mt-8 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-purple-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    Taste Now <FaArrowRight size={8} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCOVERY ECOSYSTEM SECTION */}
      <section className="py-24 border-t border-white/5 bg-[#050505] relative overflow-hidden group/discovery">
        {/* 1. Sophisticated Ambient Lighting */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-2xl">
              {/* Editorial Label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <h2 className="text-xs font-black tracking-[0.5em] text-indigo-500 uppercase">
                  Discovery
                </h2>
                <div className="h-px w-12 bg-indigo-500/30" />
              </motion.div>

              {/* Title & Subtext */}
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                Curated <span className="text-white/40 ">Experiences</span>
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                Discover wellness, adventure, and cultural rituals
                <span className="text-gray-300"> tailored precisely to your journey.</span>
              </p>
            </div>

            <Link
              href="/discovery"
              className="group/cta flex items-center gap-4 px-8 py-4 rounded-full bg-white/[0.03] border border-white/10 text-xs uppercase tracking-widest text-gray-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-500"
            >
              View all experiences
              <FaArrowRight className="text-indigo-400 transition-transform group-hover/cta:translate-x-2" />
            </Link>
          </div>

          {/* 2. Optimized Grid with Staggered Entrance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
            {[
              { num: "01", name: "Wellness", desc: "Therapeutic rituals & spa experiences", cat: "Wellness" },
              { num: "02", name: "Adventures", desc: "Outdoor and high-altitude activities", cat: "Adventure" },
              { num: "03", name: "Culinary", desc: "Private dining & chef-led sessions", cat: "Culinary" },
              { num: "04", name: "Local Arts", desc: "Exclusive galleries & cultural access", cat: "Discovery" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/discovery?cat=${item.cat}`}
                  className="group relative flex flex-col h-[350px] p-10 bg-[#050505] hover:bg-indigo-500/[0.02] transition-colors duration-700"
                >
                  {/* Hover Accent Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                  {/* Vertical Numbering */}
                  <span className="text-5xl font-serif italic text-white/[0.03] group-hover:text-indigo-500/10 transition-colors duration-700 absolute top-8 right-8">
                    {item.num}
                  </span>

                  <div className="mt-auto relative z-10">
                    <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">
                      {item.desc}
                    </p>

                    {/* Animated Arrow Reveal */}
                    <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      Explore <FaArrowRight size={10} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTERTAINMENT SECTION */}
      <section className="py-24 border-t border-white/5 bg-[#030303] relative overflow-hidden">
        {/* subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[300px] bg-red-500/5 blur-[120px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <h2 className="text-xs font-semibold tracking-[0.3em] text-red-400 uppercase mb-3">
                Entertainment
              </h2>
              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                Streaming Hub
              </h3>
              <p className="text-sm text-gray-400 mt-3 max-w-md">
                Access curated movies, series, and live content directly from your stay.
              </p>
            </div>
            {/* CTA */}
            <Link
              href="/entertainment"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              View all
              <span className="text-red-400 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
          {/* ROWS */}
          <div className="space-y-10">
            <EntertainmentRow title="Trending Now" />
            <EntertainmentRow title="Action Picks" />
            <EntertainmentRow title="Comedy Specials" />
            <EntertainmentRow title="Recommended For You" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-24 px-8 border-t border-white/[0.03] bg-[#020202] overflow-hidden">

        {/* 🌌 Fading Backdrop Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-teal-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">

            {/* BRAND COLUMN */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-light tracking-[0.3em] text-white uppercase mb-6">
                Yatri<span className="font-serif italic text-teal-400 lowercase tracking-normal">hub</span>
              </h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] leading-relaxed max-w-sm">
                Architecting the next-gen unified travel ecosystem.
                Refining the art of celestial transit.
              </p>
            </div>

            {/* NAVIGATION LINKS */}
            <div className="space-y-4">
              <h4 className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.5em] mb-6">Network</h4>
              <div className="flex flex-col gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                <span className="hover:text-teal-400 cursor-pointer transition-colors">About Alpha</span>
                <span className="hover:text-teal-400 cursor-pointer transition-colors">Career Pathways</span>
                <span className="hover:text-teal-400 cursor-pointer transition-colors">Partner Access</span>
              </div>
            </div>

            {/* LEGAL / STATUS */}
            <div className="space-y-4">
              <h4 className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.5em] mb-6">Security</h4>
              <div className="flex flex-col gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                <span className="hover:text-teal-400 cursor-pointer transition-colors">Privacy Protocol</span>
                <span className="hover:text-teal-400 cursor-pointer transition-colors">Terms of Transit</span>
                <div className="flex items-center gap-2 pt-2">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse shadow-[0_0_8px_#2dd4bf]" />
                  <span className="text-[8px] text-zinc-600 tracking-[0.3em]">SYSTEMS OPERATIONAL</span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="mt-24 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[8px] text-zinc-800 font-black uppercase tracking-[1em]">
              © 2026 YatriHub Global Concierge
            </p>

            <div className="flex items-center gap-8">
              <div className="h-px w-12 bg-zinc-900 hidden md:block" />
              <p className="text-[8px] text-zinc-800 uppercase tracking-[0.5em] italic">
                Designed for the modern voyager
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function BentoBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-8 bg-[#080808] border border-white/5 rounded-[2.5rem] transition-all hover:border-white/20 ${className}`}>
      {children}
    </div>
  );
}

function EntertainmentRow({ title }: { title: string }) {
  const items = new Array(10).fill(0);

  return (
    <div className="mb-20">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold text-white tracking-tight">
          {title}
        </h4>

        <span className="text-xs text-gray-400 hover:text-white transition cursor-pointer">
          Explore →
        </span>
      </div>

      <div className="flex gap-8 items-start">

        {/* 🔥 FEATURED CARD */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative min-w-[380px] h-[280px] rounded-2xl overflow-hidden group cursor-pointer"
        >

          {/* IMAGE */}
          <div className="absolute inset-0 bg-[url('/poster.jpg')] bg-cover bg-center scale-105 group-hover:scale-110 transition duration-700" />

          {/* NETFLIX CINEMATIC OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          {/* TOP BADGE */}
          <div className="absolute top-4 left-4 z-10 px-2 py-1 bg-red-600 text-[10px] font-bold rounded">
            Trending
          </div>

          {/* CONTENT */}
          <div className="relative z-10 p-6 flex flex-col justify-end h-full max-w-[75%]">

            <h3 className="text-2xl font-bold text-white mb-2">
              Inception
            </h3>

            <p className="text-xs text-gray-300 mb-3">
              Sci-Fi • 2010 • 2h 28m
            </p>

            <p className="text-sm text-gray-300 mb-4 line-clamp-2">
              A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.
            </p>

            <div className="flex gap-3">
              <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-semibold hover:scale-105 transition">
                ▶ Play
              </button>

              <button className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-xs text-white hover:bg-white/20 transition">
                + Watchlist
              </button>
            </div>
          </div>

          {/* BOTTOM FADE */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
        </motion.div>


        {/* 🎬 SCROLL ROW */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">

          {items.map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.12, y: -8, zIndex: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="relative min-w-[170px] h-[250px] rounded-xl overflow-hidden border border-white/10 bg-zinc-900 group cursor-pointer"
            >

              {/* IMAGE */}
              <div className="absolute inset-0 bg-[url('/poster.jpg')] bg-cover bg-center transition duration-500 group-hover:scale-110" />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* RANK BADGE */}
              <div className="absolute top-2 left-2 text-xs font-bold text-white/80">
                #{i + 1}
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-3 left-3 right-3">

                <p className="text-sm font-semibold text-white leading-tight">
                  Inception
                </p>

                <p className="text-[10px] text-gray-400 mt-1">
                  Sci-Fi • 2010
                </p>

              </div>

              {/* HOVER CONTROLS */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">

                <div className="flex gap-2">

                  <div className="bg-white text-black px-3 py-1.5 rounded-full text-xs font-semibold">
                    ▶
                  </div>

                  <div className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs text-white">
                    +
                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
}

function ServiceCard({
  icon,
  name,
  href,
  desc,
}: {
  icon: any;
  name: string;
  href: string;
  desc: string;
}) {
  return (
    <Link href={href} className="block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="group relative p-6 rounded-2xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-md overflow-hidden hover:border-indigo-500/40 transition-all"
      >
        {/* ICON */}
        <div className="p-2 w-fit bg-indigo-500/10 rounded-lg mb-4 transition group-hover:bg-indigo-500/20">
          <div className="text-indigo-400 group-hover:text-indigo-300 text-lg">
            {icon}
          </div>
        </div>

        {/* TITLE */}
        <h4 className="text-base font-semibold text-white tracking-tight">
          {name}
        </h4>

        {/* DESCRIPTION */}
        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
          {desc}
        </p>

        {/* CTA */}
        <div className="mt-4 text-[10px] text-indigo-400/80 font-medium opacity-0 group-hover:opacity-100 transition">
          Explore Service →
        </div>

        {/* GLOW */}
        <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-indigo-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />
      </motion.div>
    </Link>
  );
}

function RoomFeatureCard({
  icon,
  price,
  href,
}: {
  icon: any;
  price: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-md p-8 flex flex-col justify-between min-h-[420px] hover:border-indigo-500/40 transition-all"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
      {/* CONTENT */}
      <div className="relative z-10">
        {/* ICON */}
        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 border border-indigo-500/20">
          <div className="text-indigo-400 text-xl">
            {icon}
          </div>
        </div>

        {/* TITLE */}
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight mb-3">
          Presidential Suite
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
          Premium privacy, panoramic views, and personalized in-room services.
        </p>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 flex items-center justify-between mt-8 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">

        {/* PRICE */}
        <div>
          <p className="text-[11px] text-gray-500">
            Per night
          </p>
          <p className="text-xl font-semibold text-white">
            ₹{price}
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-medium text-white bg-white/10 px-5 py-2 rounded-full group-hover:bg-indigo-500 transition">
          Book now
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>

      {/* GLOW */}
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition" />
    </Link>
  );
}

function RoomStandardCard({
  icon,
  name,
  href,
  price,
  desc,
}: {
  icon: any;
  name: string;
  href: string;
  price: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-md p-6 flex flex-col justify-between hover:border-indigo-500/40 transition-all"
    >
      {/* GLOW */}
      <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-indigo-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />
      {/* TOP */}
      <div className="flex justify-between items-start mb-6">
        {/* ICON */}
        <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
          <div className="text-indigo-400 text-lg group-hover:scale-110 transition-transform">
            {icon}
          </div>
        </div>

        {/* PRICE */}
        <div className="text-right">
          <p className="text-[10px] text-gray-500">
            From
          </p>
          <p className="text-base font-semibold text-white">
            ₹{price}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div>
        <h4 className="text-base font-semibold text-white tracking-tight">
          {name}
        </h4>
        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
          {desc}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-5 text-[11px] text-indigo-400/80 font-medium opacity-0 group-hover:opacity-100 transition">
        View details →
      </div>
    </Link>
  );
}