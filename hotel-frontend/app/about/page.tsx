"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import {
  FiArrowUpRight, FiLayers, FiActivity, FiShield,
  FiMap, FiCoffee, FiCpu, FiGlobe, FiDatabase, FiChevronRight,
  FiCompass,
} from "react-icons/fi";

export default function AboutPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen selection:bg-indigo-500/30">

      {/* --- 1. THE ARCHITECTURAL HERO (Elite Infra Style) --- */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-24 overflow-hidden">
        {/* Subtle Engineering Grid */}
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M80 0 L0 0 0 80' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")` }} />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-12 bg-indigo-500" />
              <span className="text-indigo-400 font-mono text-[10px] tracking-[0.5em] uppercase">Enterprise Layer // V4.0</span>
            </div>
            <h1 className="text-[15vw] md:text-[10vw] font-black leading-[0.75] tracking-tighter mb-10">
              YATRI<span className="text-zinc-800">HUB.</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700">INFRA.</span>
            </h1>
            <p className="text-zinc-500 text-xl md:text-3xl max-w-4xl font-light leading-tight">
              A distributed kernel unifying multi-modal logistics,
              hospitality inventory, and secure commerce into a single
              transactional source of truth.
            </p>
          </motion.div>
        </div>

        {/* System Pulse */}
        <div className="absolute bottom-12 right-12 hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Global Status</p>
            <p className="text-xs font-bold text-indigo-500 uppercase">Systems Nominal</p>
          </div>
          <div className="w-12 h-12 rounded-full border border-indigo-500/20 flex items-center justify-center">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
          </div>
        </div>
      </section>

      {/* --- 2. THE STACK DEFINITION (The Content) --- */}
      <section className="px-6 md:px-24 py-40 bg-white text-black rounded-t-[4rem] shadow-2xl relative z-20">
        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-2 gap-20 mb-32 items-start">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase">
              The <br /> Protocol <br /> Stack.
            </h2>
            <div className="space-y-8">
              <p className="text-2xl font-medium text-zinc-800 leading-snug">
                Travel is fragmented. We solve this by treating every bus ticket,
                hotel room, and meal order as an atomic data point in a unified
                relational database.
              </p>
              <div className="flex gap-12 border-t border-zinc-200 pt-8">
                <Stat label="Transaction Speed" value="<12ms" />
                <Stat label="API Availability" value="99.99%" />
                <Stat label="Encryption" value="AES-256" />
              </div>
            </div>
          </div>

          {/* Service Bento Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Logistic Engine */}
            {/* 3D Isometric Cube Grid Component */}
            <div className="md:col-span-4 bg-zinc-900 rounded-[2.5rem] p-10 overflow-hidden relative group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 tracking-tight text-white">Modular Architecture</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  Scalable, containerized infrastructure nodes designed for 100% fault tolerance.
                </p>
              </div>

              {/* 3D Cube Canvas */}
              <div className="flex justify-center items-center h-48">
                <svg width="240" height="200" viewBox="0 0 240 200" className="overflow-visible">
                  <defs>
                    {/* Shading Gradients for 3D look */}
                    <linearGradient id="topFace" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                    <linearGradient id="rightFace" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4338ca" />
                      <stop offset="100%" stopColor="#312e81" />
                    </linearGradient>
                    <linearGradient id="leftFace" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#3730a3" />
                    </linearGradient>
                  </defs>
                  {/* Generating a 3x3 Isometric Grid of Cubes */}
                  {[
                    { x: 120, y: 60, delay: 0 },    // Top
                    { x: 80, y: 85, delay: 0.2 },   // Middle Left
                    { x: 160, y: 85, delay: 0.4 },  // Middle Right
                    { x: 120, y: 110, delay: 0.6 }, // Center
                    { x: 80, y: 135, delay: 0.8 },  // Bottom Left
                    { x: 160, y: 135, delay: 1.0 }, // Bottom Right
                    { x: 120, y: 160, delay: 1.2 }, // Bottom
                  ].map((cube, i) => (
                    <motion.g
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: [0, -10, 0], // Floating motion
                      }}
                      transition={{
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: cube.delay },
                        opacity: { duration: 0.5, delay: cube.delay }
                      }}
                      style={{ transformOrigin: 'center' }}
                    >
                      <g transform={`translate(${cube.x - 20}, ${cube.y - 20})`}>
                        <path d="M 20 0 L 40 10 L 20 20 L 0 10 Z" fill="url(#topFace)" />
                        <path d="M 0 10 L 20 20 L 20 40 L 0 30 Z" fill="url(#leftFace)" />
                        <path d="M 20 20 L 40 10 L 40 30 L 20 40 Z" fill="url(#rightFace)" />
                        <path d="M 20 20 L 20 40" stroke="white" strokeWidth="0.2" opacity="0.3" />
                      </g>
                    </motion.g>
                  ))}
                </svg>
              </div>

              {/* Background Glow */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 blur-[60px] rounded-full" />
            </div>

            {/* Residency OS */}
            <div className="md:col-span-4 bg-zinc-100 rounded-[2.5rem] p-10 flex flex-col justify-between hover:scale-[0.98] transition-transform">
              <div>
                <FiCoffee size={32} className="mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Residency & Inventory</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  A deep-level hotel configuration engine. Manage room tiers,
                  amenities, and licensed alcohol inventory with absolute
                  transactional integrity.
                </p>
              </div>
              <div className="h-[1px] w-full bg-zinc-200 mb-6" />
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-600">PostgreSQL Relational Sync</p>
            </div>

            {/* Security Core */}
            <div className="md:col-span-4 bg-black text-white rounded-[2.5rem] p-10">
              <FiShield size={32} className="text-indigo-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 tracking-tight">AuthShield</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Hardened JWT AuthGuard. Every transaction—from room booking to
                dining—is protected by Bcrypt-layered hashing and encrypted persistence.
              </p>
            </div>

            {/* Scale Node */}
            {/* Scale Node with Animated SVG */}
            <div className="md:col-span-8 bg-zinc-900 rounded-[2.5rem] p-12 text-white overflow-hidden relative group">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-4xl font-bold tracking-tight">The Nagpur Node.</h3>
                  <p className="text-zinc-500 max-w-md mt-4">
                    Our engineering headquarters. We build for the scale of India,
                    ensuring that 500+ cities are synchronized via our
                    distributed cloud infrastructure.
                  </p>
                </div>
              </div>

              {/* Animated SVG Network Background */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Central Node */}
                  <circle cx="150" cy="100" r="4" fill="#6366f1" />
                  <motion.circle
                    cx="150"
                    cy="100"
                    r="10"
                    stroke="#6366f1"
                    strokeWidth="1"
                    fill="transparent"
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Connection Lines & Satellite Nodes */}
                  {[
                    { x: 100, y: 50 },
                    { x: 80, y: 110 },
                    { x: 110, y: 160 },
                  ].map((pos, i) => (
                    <React.Fragment key={i}>
                      <motion.path
                        d={`M 150 100 L ${pos.x} ${pos.y}`}
                        stroke="#6366f1"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <circle cx={pos.x} cy={pos.y} r="2" fill="#4ade80" />
                    </React.Fragment>
                  ))}
                </svg>
              </div>

              <FiGlobe className="absolute -bottom-10 -right-10 size-64 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. THE INFRASTRUCTURE PHILOSOPHY --- */}
      <section className="py-40 px-6 md:px-24 bg-white text-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
          <div className="flex-1">
            <h4 className="text-indigo-600 font-mono text-xs tracking-widest uppercase mb-8">Mission_Protocol</h4>
            <h2 className="text-6xl font-black tracking-tighter uppercase leading-[0.8] mb-12">Invisible <br /> Architecture.</h2>
            <p className="text-zinc-500 text-xl font-light leading-relaxed">
              We believe that great travel infrastructure should be invisible.
              Whether you are ordering a meal or crossing the country by train,
              our kernel manages the data so you can manage the experience.
            </p>
          </div>
          <div className="flex-1 space-y-12">
            <FeatureItem icon={<FiCpu />} title="Atomic Performance" desc="Every cancellation and refund is handled by an automated state-manager, eliminating manual error." />
            <FeatureItem icon={<FiDatabase />} title="Data Sovereignty" desc="Complete ACID compliance for financial records and inventory metadata." />
            <FeatureItem icon={<FiActivity />} title="Real-Time Pulse" desc="Instant synchronization between transport logistics and hospitality availability." />
          </div>
        </div>
      </section>

      {/* --- 5. PLATFORM CAPABILITIES --- */}
      <section className="py-40 px-6 md:px-24 bg-black text-white">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-16 uppercase">
            Everything.<br />One Platform.
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {[
              {
                title: "Travel Booking",
                desc: "Book trains, buses, and cabs in one unified flow with real-time availability and dynamic pricing.",
              },
              {
                title: "Hotel & Stays",
                desc: "From budget rooms to premium stays with full inventory transparency and instant confirmation.",
              },
              {
                title: "Food & Dining",
                desc: "Order meals directly to your hotel or while traveling with integrated vendor network.",
              },
              {
                title: "Local Discovery",
                desc: "Explore attractions, events, and hidden gems powered by location-aware intelligence.",
              },
              {
                title: "Secure Payments",
                desc: "All transactions secured with encrypted pipelines and multi-layer authentication.",
              },
              {
                title: "AI Travel Assistant",
                desc: "Smart recommendations based on your travel patterns, preferences, and behavior.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-white/10 p-8 rounded-3xl hover:bg-white hover:text-black transition-all duration-500">
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-zinc-400 group-hover:text-black text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* --- 6. TRUST METRICS --- */}
      <section className="py-32 px-6 md:px-24 bg-white text-black relative">
        <div className="max-w-7xl mx-auto">

          {/* Header: System Monitor Style */}
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-zinc-100 pb-8">
            <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Platform Health</h2>
              <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SYSTEMS_NOMINAL
                </span>
                <span>//</span>
                <span>REGION: NAGPUR_CENTRAL</span>
              </div>
            </div>
            <div className="font-mono text-[10px] text-zinc-400 mt-4 md:mt-0">
              NETWORK_LOAD: <span className="text-black font-bold">42.8%</span>
            </div>
          </div>

          {/* The Bento-Grid Monitor */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl">

            <LiveNodeCard
              label="Edge Nodes"
              value="512"
              unit="Active"
              status="Optimized"
            />
            <LiveNodeCard
              label="Data Throughput"
              value="1.2M"
              unit="Req/s"
              status="Stable"
            />
            <LiveNodeCard
              label="Network Latency"
              value="11.4"
              unit="ms"
              status="Low"
            />
            <LiveNodeCard
              label="Uptime SLA"
              value="99.9"
              unit="%"
              status="Verified"
            />

          </div>
        </div>
      </section>


      {/* --- 7. WHY YATRIHUB --- */}
      <section className="py-40 px-6 md:px-24 bg-neutral-900 text-white">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-5xl md:text-6xl font-black mb-10 tracking-tight">
            Why YatriHub?
          </h2>

          <p className="text-zinc-400 text-xl leading-relaxed mb-16">
            Unlike fragmented apps, YatriHub combines logistics, hospitality,
            and commerce into a single seamless experience. No switching apps.
            No inconsistent data. Just one intelligent travel ecosystem.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="font-bold text-xl mb-2">Unified Experience</h4>
              <p className="text-zinc-500 text-sm">Everything connected in one app.</p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2">Real-Time Sync</h4>
              <p className="text-zinc-500 text-sm">Instant updates across all services.</p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2">Built for India</h4>
              <p className="text-zinc-500 text-sm">Handles real-world travel complexity.</p>
            </div>
          </div>
        </div>
      </section>


      {/* --- 8. FINAL CTA --- */}
      <section className="py-40 px-6 md:px-24 bg-[#020202] text-white relative overflow-hidden">
        {/* PaaS Grid Floor (Infinite Perspective) */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'top',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left: The Value Prop */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">API v4.0 Stable</span>
              </div>

              <h2 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
                BUILD THE <br />
                FUTURE OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">LOGISTICS.</span>
              </h2>

              <p className="text-zinc-400 text-xl font-light leading-relaxed mb-12 max-w-lg">
                Deploy travel-aware applications on a globally distributed kernel.
                Access atomic inventory, real-time routing, and secure commerce
                pipelines through a single abstraction layer.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2">
                  Start Building <FiArrowUpRight />
                </button>
                <button className="px-8 py-4 bg-zinc-900 text-white border border-white/10 rounded-xl font-bold hover:bg-zinc-800 transition-all">
                  Read Documentation
                </button>
              </div>
            </div>

            {/* Right: The "Visual Proof" (Animated Terminal/Code Block) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              {/* Terminal Window */}
              <div className="w-full aspect-square md:aspect-video bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="h-10 bg-zinc-800/50 border-b border-white/5 flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                  <span className="ml-4 text-[10px] font-mono text-zinc-500">yatrihub-deploy.sh</span>
                </div>

                <div className="p-6 font-mono text-sm space-y-3">
                  <p className="text-indigo-400">$ npm install @yatrihub/kernel</p>
                  <p className="text-zinc-500 italic">// Initializing multi-modal sync...</p>
                  <div className="flex gap-2">
                    <span className="text-emerald-500">✔</span>
                    <span className="text-zinc-300">Connected to Nagpur_Edge_Node</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-emerald-500">✔</span>
                    <span className="text-zinc-300">Inventory_Cache: Primed</span>
                  </div>
                  <motion.div
                    animate={{ opacity: [0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-5 bg-indigo-500 inline-block align-middle"
                  />
                </div>
              </div>

              {/* 3D Floating Elements around terminal */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 p-6 bg-indigo-600 rounded-2xl shadow-xl hidden md:block"
              >
                <FiCpu size={32} className="text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 p-6 bg-emerald-600 rounded-2xl shadow-xl hidden md:block"
              >
                <FiDatabase size={32} className="text-white" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- 9. THE SIGN-OFF --- */}
      <footer className="py-20 px-6 md:px-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <Link href="/" className="group flex items-center gap-2.5 shrink-0">
              <div className="relative">
                <FiCompass className="text-teal-400 text-2xl group-hover:rotate-[360deg] transition-transform duration-1000 ease-expo" />
                <div className="absolute inset-0 bg-teal-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-bold text-white">
                Yatri<span className="text-teal-400">Hub</span>
              </span>
            </Link><p className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.4em]">Engineering Hub // India</p>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <span className="hover:text-white cursor-pointer transition-colors">Infrastructure</span>
            <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-white cursor-pointer transition-colors">Security_Vault</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* --- REUSABLE MODULES --- */

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <div className="text-2xl font-black tracking-tighter">{value}</div>
      <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">{label}</div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="text-indigo-600 text-2xl group-hover:scale-110 transition-transform">{icon}</div>
      <div>
        <h4 className="text-xl font-bold tracking-tight mb-2 uppercase">{title}</h4>
        <p className="text-zinc-500 text-sm leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  );
}

function Metric({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-black tracking-tighter mb-2">{number}</div>
      <div className="text-xs uppercase tracking-widest text-zinc-500">
        {label}
      </div>
    </div>
  );
}

function LiveNodeCard({ label, value, unit, status }: { label: string, value: string, unit: string, status: string }) {
  return (
    <div className="bg-white p-8 group">
      <div className="flex flex-col h-full">

        {/* Metric Identity */}
        <div className="mb-4">
          <p className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-1">
            <h4 className="text-5xl font-black tracking-tighter tabular-nums text-black">
              {value}
            </h4>
            <span className="text-xs font-bold text-zinc-300 uppercase">{unit}</span>
          </div>
        </div>

        {/* Micro-Node Grid (The "Original" PaaS Feel) */}
        <div className="flex-1 mb-4">
          <div className="grid grid-cols-8 gap-1.5">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.1 }}
                animate={{
                  opacity: [0.1, Math.random() > 0.7 ? 1 : 0.3, 0.1],
                  backgroundColor: Math.random() > 0.8 ? '#19f548' : '#47ca2f'
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="aspect-square rounded-[1px]"
              />
            ))}
          </div>
        </div>

        {/* System Footer */}
        <div className="flex justify-between items-center border-t border-zinc-50 pt-2">
          <span className="text-[9px] font-mono text-zinc-400 tracking-tighter uppercase">
            Status: {status}
          </span>
          <div className="w-12 h-[2px] bg-zinc-100 relative overflow-hidden">
            <motion.div
              animate={{ x: [-50, 50] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-indigo-500 w-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}