'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowRight,
  FaUtensils,
  FaCocktail,
  FaCoffee,
  FaConciergeBell,
} from "react-icons/fa";

/* =========================
   🔹 TYPES
========================= */
type Item = {
  name: string;
  desc: string;
  cat: string;
  icon: React.ReactNode;
};

/* =========================
   🔹 MAIN COMPONENT
========================= */
export default function CulinarySection({
  items = defaultItems,
}: {
  items?: Item[];
}) {
  return (
    <section className="bg-[#050505] py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">

          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">
              Culinary
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
              Discover Dining
              <br />
              <span className="text-zinc-400">
                Crafted Experiences
              </span>
            </h2>

            <p className="text-zinc-500 mt-5 text-sm leading-relaxed">
              Explore curated dining, mixology, and personalized culinary journeys —
              built for modern travelers.
            </p>
          </div>

          <Link
            href="/food"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
          >
            Explore all
            <FaArrowRight className="text-zinc-500 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* ================= GRID ================= */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((item) => (
            <Card key={item.name} item={item} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

/* =========================
   🔹 CARD (SIMPLIFIED)
========================= */
function Card({ item }: { item: Item }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <Link href={`/food/${item.cat.toLowerCase()}`}>
        <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all">

          {/* ICON */}
          <div className="mb-6 h-12 w-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-300 group-hover:text-white transition">
            {item.icon}
          </div>

          {/* CONTENT */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
              {item.cat}
            </p>

            <h3 className="text-lg font-semibold text-white mb-2">
              {item.name}
            </h3>

            <p className="text-sm text-zinc-500 leading-relaxed">
              {item.desc}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-6 flex items-center text-sm text-zinc-400 group-hover:text-white transition">
            Learn more
            <FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition" />
          </div>

        </div>
      </Link>
    </motion.div>
  );
}

/* =========================
   🔹 DATA
========================= */
const defaultItems: Item[] = [
  {
    name: "Signature Dining",
    desc: "Michelin-level dining experiences in curated locations.",
    cat: "Dining",
    icon: <FaUtensils size={18} />,
  },
  {
    name: "Craft Mixology",
    desc: "Experimental cocktails with locally sourced ingredients.",
    cat: "Mixology",
    icon: <FaCocktail size={18} />,
  },
  {
    name: "Specialty Coffee",
    desc: "Precision-brewed single-origin coffee experiences.",
    cat: "Coffee",
    icon: <FaCoffee size={18} />,
  },
  {
    name: "Dining Concierge",
    desc: "Personalized dining plans tailored to your journey.",
    cat: "Service",
    icon: <FaConciergeBell size={18} />,
  },
];