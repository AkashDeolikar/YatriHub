'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowRight,
  FaCrown,
  FaKhanda,
  FaHotel,
  FaBed
} from "react-icons/fa";

/* =========================
   🔹 TYPES
========================= */
type Room = {
  name: string;
  price: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
};

type Props = {
  rooms?: Room[];
  totalUnits?: number;
  availableUnits?: number;
};

/* =========================
   🔹 MAIN COMPONENT
========================= */
export default function RoomsSection({
  rooms = defaultRooms,
  totalUnits = 148,
  availableUnits = 32,
}: Props) {

  const occupancy = Math.round(
    ((totalUnits - availableUnits) / totalUnits) * 100
  );

  return (
    <section className="py-24 border-t border-white/5 bg-black relative overflow-hidden">

      {/* Ambient Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs tracking-[0.35em] text-indigo-400 uppercase mb-4">
              Accommodations
            </h2>

            <h3 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
              Premier{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                Environments
              </span>
            </h3>
          </motion.div>

          <Link
            href="/rooms"
            className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-indigo-400 transition"
          >
            Discover all units
            <div className="p-2 rounded-full border border-white/10 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition">
              <FaArrowRight className="group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {/* FEATURE CARD */}
          <FeatureCard />

          {/* STANDARD ROOMS */}
          {rooms.map((room, i) => (
            <StandardCard key={i} {...room} />
          ))}

          {/* LIVE INVENTORY */}
          <InventoryCard
            total={totalUnits}
            available={availableUnits}
            occupancy={occupancy}
          />

        </div>
      </div>
    </section>
  );
}

/* =========================
   🔹 FEATURE CARD
========================= */
function FeatureCard() {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-500/10 border border-indigo-500/20"
    >
      <FaCrown className="text-indigo-400 text-3xl mb-6" />

      <div>
        <h4 className="text-xl font-bold text-white mb-2">
          Presidential Suite
        </h4>
        <p className="text-xs text-gray-400 mb-4">
          Ultra-premium experience with private services.
        </p>

        <p className="text-lg font-bold text-indigo-400">₹30,000</p>
      </div>
    </motion.div>
  );
}

/* =========================
   🔹 STANDARD CARD
========================= */
function StandardCard({ name, price, desc, icon, href }: Room) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
    >
      <div className="text-indigo-400 text-2xl mb-4">{icon}</div>

      <h4 className="text-lg font-semibold text-white mb-1">{name}</h4>
      <p className="text-xs text-gray-500 mb-4">{desc}</p>

      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-indigo-400">₹{price}</span>

        <Link
          href={href}
          className="text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:text-white transition"
        >
          View
        </Link>
      </div>
    </motion.div>
  );
}

/* =========================
   🔹 INVENTORY CARD
========================= */
function InventoryCard({
  total,
  available,
  occupancy,
}: {
  total: number;
  available: number;
  occupancy: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative flex flex-col justify-between p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 bg-indigo-500/10 blur-[50px]" />

      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">
            Live Inventory
          </h4>
        </div>

        <div className="space-y-5">
          <div className="flex justify-between">
            <div>
              <p className="text-[10px] text-gray-500">Total</p>
              <p className="text-2xl text-white font-bold">{total}</p>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-gray-500">Available</p>
              <p className="text-xl text-indigo-400 font-bold">{available}</p>
            </div>
          </div>

          {/* PROGRESS */}
          <div>
            <div className="flex justify-between text-[10px] uppercase">
              <span className="text-gray-500">Occupancy</span>
              <span className="text-indigo-400">{occupancy}%</span>
            </div>

            <div className="h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${occupancy}%` }}
                transition={{ duration: 1.2 }}
                className="h-full bg-gradient-to-r from-indigo-600 to-teal-400"
              />
            </div>
          </div>
        </div>
      </div>

      <button className="mt-8 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-indigo-500 transition">
        Check Schedule
      </button>
    </motion.div>
  );
}

/* =========================
   🔹 DEFAULT DATA
========================= */
const defaultRooms: Room[] = [
  {
    name: "Luxury Suite",
    price: "20,000",
    desc: "Panoramic views and premium comfort.",
    icon: <FaKhanda />,
    href: "/rooms",
  },
  {
    name: "Business Class",
    price: "15,000",
    desc: "Built for productivity & focus.",
    icon: <FaHotel />,
    href: "/rooms",
  },
  {
    name: "Smart Standard",
    price: "9,000",
    desc: "Automated comfort experience.",
    icon: <FaBed />,
    href: "/rooms",
  },
];