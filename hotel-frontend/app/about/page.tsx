"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Unified Travel",
    desc: "Book trains, buses, hotels, and food in one seamless flow.",
    why: "Everything stays connected. No switching apps. No fragmented data.",
  },
  {
    title: "Real-time Sync",
    desc: "Live updates on bookings, delays, pricing, and availability.",
    why: "You always see the latest state of your journey instantly.",
  },
  {
    title: "Secure Payments",
    desc: "Encrypted transactions with multi-layer authentication.",
    why: "Every transaction is protected end-to-end.",
  },
  {
    title: "Smart Recommendations",
    desc: "AI-driven suggestions based on your travel patterns.",
    why: "Discover better options without searching.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />
        <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full top-1/3" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10"
        >
          <h1 className="text-[12vw] md:text-[7vw] font-semibold tracking-tight">
            YatriHub
          </h1>

          <p className="text-zinc-400 text-xl md:text-2xl mt-6 max-w-2xl mx-auto">
            Plan, book and experience travel — all in one place.
          </p>

          <div className="mt-10 flex gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition">
              Get Started
            </button>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition">
              Learn more
            </button>
          </div>
        </motion.div>
      </section>

      {/* CINEMATIC INTRO */}
      <section className="py-40 text-center px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h2 className="text-6xl md:text-7xl font-semibold tracking-tight mb-10">
            Everything in one app.
          </h2>

          <p className="text-zinc-400 text-xl leading-relaxed">
            YatriHub brings travel, stays, and dining together into one seamless experience.
            No friction. No disconnect. Just flow.
          </p>
        </motion.div>
      </section>

      {/* FEATURES (APPLE STYLE FLOW) */}
      <section className="py-40 px-6 max-w-5xl mx-auto space-y-40">

        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h3 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">
              {item.title}
            </h3>

            <p className="text-zinc-400 text-xl mb-6 max-w-2xl mx-auto">
              {item.desc}
            </p>

            <p className="text-zinc-600 text-lg max-w-xl mx-auto">
              {item.why}
            </p>
          </motion.div>
        ))}
      </section>

      {/* REAL-TIME (CINEMATIC VISUAL) */}
      <section className="py-40 text-center px-6 relative overflow-hidden">

        {/* moving glow */}
        <motion.div
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] bg-emerald-500/20 blur-[140px] rounded-full"
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-semibold tracking-tight mb-10">
            Real-time travel.
          </h2>

          <p className="text-zinc-400 text-xl leading-relaxed">
            Everything updates instantly — bookings, pricing, availability.
            What you see is always current.
          </p>
        </div>
      </section>

      {/* SIMPLICITY */}
      <section className="py-40 text-center px-6 relative">

        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-semibold tracking-tight mb-10">
            Built for simplicity.
          </h2>

          <p className="text-zinc-400 text-xl leading-relaxed">
            No complexity. No confusion. Just a smooth, intuitive travel experience.
          </p>
        </div>
      </section>

      {/* SPECIFICATIONS (APPLE STYLE MINIMAL) */}
      <section className="py-40 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-semibold mb-16">
          Specifications
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 text-left">
          <Spec label="Platform" value="Web + Mobile" />
          <Spec label="Latency" value="< 100ms" />
          <Spec label="Uptime" value="99.9%" />
          <Spec label="Security" value="AES-256" />
          <Spec label="Architecture" value="Cloud-native" />
          <Spec label="Scale" value="Multi-city" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 text-center">
        <h2 className="text-5xl font-semibold mb-6">
          Ready to travel smarter?
        </h2>

        <button className="px-8 py-4 bg-white text-black rounded-full hover:scale-105 transition">
          Start your journey
        </button>
      </section>

    </main>
  );
}

/* COMPONENT */
function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-4">
      <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
        {label}
      </p>

      <p className="text-lg font-medium text-white">
        {value}
      </p>
    </div>
  );
}