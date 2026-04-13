'use client';

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FaShieldAlt, FaChartLine, FaBolt, FaGlobe } from "react-icons/fa";

export default function FAANGBentoGrid() {
  const chartData = [40, 70, 45, 90, 65, 80, 50, 95, 60, 75, 40, 85];

  return (
    <section className="relative py-24 px-6 bg-[#030303]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[700px]">
        
        {/* LARGE FEATURE: SMART BOOKING */}
        <BentoCard className="md:col-span-2 md:row-span-2 group">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mb-8 group-hover:scale-110 transition-transform duration-500">
                <FaShieldAlt className="text-2xl text-indigo-400" />
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4 leading-none">
                Smart Booking <span className="text-zinc-600 group-hover:text-indigo-400/80 transition-colors">Engine</span>
              </h3>
              <p className="text-zinc-500 text-lg leading-relaxed max-w-sm font-medium">
                Military-grade database locking ensures <span className="text-zinc-200">zero double-bookings</span> across our entire network.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5">
              <StatItem label="Verified Stays" val="500k+" />
              <StatItem label="Global Nodes" val="120" />
              <StatItem label="Latency" val="14ms" />
            </div>
          </div>
          {/* Subtle Circuit SVG Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent)] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        </BentoCard>

        {/* ANALYTICS CARD */}
        <BentoCard className="md:col-span-2 overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-900 border border-white/5 rounded-lg">
                <FaChartLine className="text-indigo-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Global Volume</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/5 border border-green-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-500 uppercase">Live</span>
            </div>
          </div>

          <div className="mt-8 relative z-10">
            <div className="text-4xl font-bold tracking-tighter text-white tabular-nums mb-4">$12,408.00</div>
            <div className="flex items-end gap-1 h-20">
              {chartData.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  style={{ height: `${h}%` }}
                  className="flex-1 bg-indigo-500/40 rounded-t-[2px] origin-bottom hover:bg-indigo-400 transition-colors"
                />
              ))}
            </div>
          </div>
        </BentoCard>

        {/* INSTANT PAY */}
        <BentoCard className="md:col-span-1 border-yellow-500/10 hover:border-yellow-500/40">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4">
            <FaBolt className="text-yellow-500" />
          </div>
          <h4 className="text-white font-bold tracking-tight">Rapid Settlement</h4>
          <p className="text-xs text-zinc-500 mt-2 font-medium">Stripe-integrated payments with 0% failure rate.</p>
          <div className="mt-auto pt-4 flex items-center gap-2">
             <div className="h-[2px] flex-1 bg-white/5 overflow-hidden">
                <motion.div 
                  animate={{ x: ['-100%', '100%'] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-full h-full bg-yellow-500/40" 
                />
             </div>
          </div>
        </BentoCard>

        {/* SUPPORT */}
        <BentoCard className="md:col-span-1 group">
          <div className="h-full flex flex-col">
            <h4 className="text-5xl font-black tracking-tighter text-white">24<span className="text-zinc-700 group-hover:text-indigo-500 transition-colors">/7</span></h4>
            <p className="text-xs text-zinc-500 mt-2 font-medium">Human-in-the-loop concierge service.</p>
            <div className="mt-auto flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400">
                  {i === 3 ? '+' : 'U'}
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
}

// 🔹 THE "SECRET SAUCE": DYNAMIC SPOTLIGHT COMPONENT
function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className={`relative rounded-3xl border border-white/10 bg-zinc-950 p-8 transition-all duration-500 hover:border-white/20 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}

function StatItem({ label, val }: { label: string; val: string }) {
  return (
    <div className="space-y-1">
      <div className="text-2xl font-bold text-white tracking-tighter">{val}</div>
      <div className="text-[9px] uppercase tracking-[0.2em] font-black text-zinc-600">{label}</div>
    </div>
  );
}