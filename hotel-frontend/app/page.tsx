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
import { ContentItem } from "./content";
import HeroSection from "./herotab";
import FAANGBentoGrid from "./dumpcode/hero2";
import RoomsSection from "./premium";
import EcosystemSection from "./supertravel";

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
  // const [search, setSearch] = useState("");
  const chartData = [40, 70, 45, 90, 65, 80, 30, 50, 40, 60, 85, 45, 75, 55, 95];
  const words = [
    { text: "Travel", color: "from-gray-100 to-gray-300", indent: 0 },
    { text: "Stay", color: "from-indigo-400 via-teal-400 to-emerald-400", indent: 200 },
    { text: "Move", color: "from-fuchsia-400 via-pink-400 to-indigo-300", indent: 350 },
    { text: "Experience", color: "from-violet-400 via-pink-500 to-fuchsia-300", indent: 500 },
  ];
  const services = [
    {
      icon: <FaCar />,
      name: "Cab Hub",
      desc: "Real-time rides with smart pricing & AI routing",
      href: "/travel/cab",
    },
    {
      icon: <FaPlane />,
      name: "Flights",
      desc: "Global routes with predictive fare intelligence",
      href: "/travel/flights",
    },
    {
      icon: <FaTrain />,
      name: "Rail",
      desc: "Live seat tracking & instant booking system",
      href: "/travel/trains",
    },
    {
      icon: <FaUtensils />,
      name: "Gourmet",
      desc: "Luxury dining & curated in-room experiences",
      href: "/food",
    },
  ];
  const items = [
    {
      icon: <FaUtensils />,
      name: "Main Course",
      cat: "indian",
      desc: "Curated fine dining experiences",
      delay: 0,
    },
    {
      icon: <FaPizzaSlice />,
      name: "Fast Track",
      cat: "pizza",
      desc: "Quick bites with urban flavors",
      delay: 0.1,
    },
    {
      icon: <FaCocktail />,
      name: "Mixology",
      cat: "liquor",
      desc: "Premium cocktails & crafted spirits",
      delay: 0.2,
    },
    {
      icon: <FaIceCream />,
      name: "Patisserie",
      cat: "desserts",
      desc: "Artisan desserts & sweet finales",
      delay: 0.3,
    },
  ];

  const experiences = [
    {
      num: "01",
      name: "Wellness",
      desc: "Therapeutic rituals & spa experiences",
      cat: "Wellness",
    },
    {
      num: "02",
      name: "Adventures",
      desc: "Outdoor and high-altitude activities",
      cat: "Adventure",
    },
    {
      num: "03",
      name: "Culinary",
      desc: "Private dining & chef-led sessions",
      cat: "Culinary",
    },
    {
      num: "04",
      name: "Local Arts",
      desc: "Exclusive galleries & cultural access",
      cat: "Discovery",
    },
  ];
  const demoData = [
    {
      id: 1,
      title: "Inception",
      year: "2010",
      duration: "2h 28m",
      genre: "Sci-Fi",
      image: "/poster.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "Dhurandhar",
      year: "2026",
      genre: "Action",
      image: "/poster.jpg",
    },
    // add more...
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
      <HeroSection/>
      {/* <FAANGBentoGrid/> */}

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

      <RoomsSection/>

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
              <h2 className="text-xs tracking-[0.35em] text-indigo-400 uppercase mb-4">
                Accommodations
              </h2>

              <h3 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
                Premier <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500"> Environments</span>
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
      <section className="relative py-28 bg-[#050505] overflow-hidden">

        {/* 🌌 Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12),transparent_40%)]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div>
              <h2 className="text-xs tracking-[0.35em] text-indigo-400 uppercase mb-4">
                Ecosystem
              </h2>

              <h3 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
                Intelligent Travel <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                  Super Platform
                </span>
              </h3>

              <p className="text-gray-400 mt-4 max-w-md">
                A unified system combining mobility, booking, food, and real-time intelligence into one seamless journey.
              </p>
            </div>

            <Link
              href="/travel"
              className="group flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
            >
              Explore ecosystem
              <span className="text-indigo-400 group-hover:translate-x-1 transition">
                →
              </span>
            </Link>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href={service.href}>
                  <div className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-indigo-500/40 hover:to-purple-500/40 transition">

                    {/* Glass Card */}
                    <div className="relative h-full rounded-2xl bg-white/[0.03] backdrop-blur-xl p-6 border border-white/10 overflow-hidden">

                      {/* Hover Glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />

                      {/* Icon */}
                      <div className="text-3xl text-indigo-400 mb-4 group-hover:scale-110 transition">
                        {service.icon}
                      </div>

                      {/* Title */}
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {service.name}
                      </h4>

                      {/* Description */}
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {service.desc}
                      </p>

                      {/* Arrow */}
                      <div className="mt-6 text-indigo-400 text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                        Explore →
                      </div>

                      {/* Shine Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[linear-gradient(120deg,transparent,white,transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition duration-1000" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* <EcosystemSection services={services} /> */}

      {/* GOURMET ECOSYSTEM SECTION */}
      <section className="relative py-32 bg-[#050505] overflow-hidden">

        {/* 🌌 Luxury Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.10),transparent_40%)]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* 🧠 Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-xs tracking-[0.45em] text-purple-400 uppercase mb-5">
                Culinary Experience
              </p>

              <h2 className="text-5xl md:text-6xl font-semibold text-white leading-tight">
                Taste the Journey <br />
                <span className="bg-gradient-to-r from-purple-400 to-fuchsia-500 text-transparent bg-clip-text">
                  Not Just the Food
                </span>
              </h2>

              <p className="text-gray-400 mt-6 max-w-lg">
                From gourmet dining to quick indulgences, experience a unified
                culinary ecosystem crafted for travelers who expect more than just meals.
              </p>
            </motion.div>

            {/* CTA */}
            <Link
              href="/food"
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.03] border border-white/10 text-xs uppercase tracking-[0.25em] text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-500"
            >
              Explore Dining
              <FaArrowRight className="text-purple-400 group-hover:translate-x-1.5 transition" size={10} />
            </Link>
          </div>

          {/* 🍽️ Premium Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href={`/food?cat=${item.cat}`}>
                  <div className="group relative p-[1px] rounded-[2rem] bg-gradient-to-b from-white/10 to-white/5 hover:from-purple-500/40 hover:to-fuchsia-500/40 transition-all duration-500">

                    {/* Glass Layer */}
                    <div className="relative h-full rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 overflow-hidden">

                      {/* ✨ Hover Glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10" />

                      {/* 💡 Floating Icon */}
                      <div className="mb-14 w-16 h-16 flex items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 text-2xl text-purple-300 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white group-hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-500">
                        {item.icon}
                      </div>

                      {/* 📝 Content */}
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition">
                        {item.desc}
                      </p>

                      {/* ➡️ Hover Action */}
                      <div className="mt-10 flex items-center gap-2 text-xs tracking-wider uppercase text-purple-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        Discover <FaArrowRight size={10} />
                      </div>

                      {/* 🌟 Shine Sweep */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[linear-gradient(120deg,transparent,white,transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition duration-1000" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* 🔥 Bottom Tagline (NEW – makes it feel premium product) */}
          <div className="mt-24 text-center">
            <p className="text-sm text-gray-500 tracking-wide">
              Designed for modern travelers • Powered by real-time culinary intelligence
            </p>
          </div>
        </div>
      </section>

      {/* <DiscoveryServiceCard /> */}
      
      {/* DISCOVERY ECOSYSTEM SECTION */}
      <section className="relative py-32 bg-[#050505] overflow-hidden">

        {/* 🌌 Multi-layer Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.12),transparent_40%)]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* 🧠 HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">

            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="text-xs tracking-[0.5em] text-indigo-400 uppercase">
                  Discovery
                </span>
                <div className="h-px w-14 bg-indigo-400/30" />
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-semibold text-white leading-tight">
                Curated Experiences <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                  Powered by Intelligence
                </span>
              </h2>

              <p className="text-gray-400 mt-6 max-w-lg">
                A dynamic discovery engine that adapts to your journey — blending wellness,
                culture, food, and adventure into one seamless experience layer.
              </p>
            </div>

            <Link
              href="/discovery"
              className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] text-xs uppercase tracking-[0.25em] text-gray-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-500"
            >
              Explore All
              <FaArrowRight
                className="text-indigo-400 group-hover:translate-x-1.5 transition"
                size={10}
              />
            </Link>
          </div>

          {/* 🔥 FEATURED EXPERIENCE */}
          <div className="mb-16">
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 overflow-hidden group">

              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
                <div>
                  <p className="text-xs tracking-widest text-indigo-400 mb-4">
                    Featured Experience
                  </p>
                  <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                    Himalayan Wellness Retreat
                  </h3>
                  <p className="text-gray-400 max-w-md">
                    A 3-day guided experience combining meditation, spa therapy, and mountain exploration.
                  </p>
                </div>

                <div className="flex items-center">
                  <button className="group flex items-center gap-2 text-indigo-400 text-sm">
                    Discover Now
                    <FaArrowRight className="group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 🧊 GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href={`/discovery?cat=${exp.cat}`}>
                  <div className="group relative h-[320px] p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-indigo-500/40 hover:to-purple-500/40 transition">

                    {/* Glass */}
                    <div className="relative h-full rounded-2xl bg-[#050505] border border-white/10 p-8 overflow-hidden">

                      {/* Glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 transition duration-500" />

                      {/* Number */}
                      <span className="absolute top-6 right-6 text-5xl font-serif italic text-white/[0.04] group-hover:text-indigo-400/10 transition">
                        {exp.num}
                      </span>

                      <div className="relative z-10 mt-auto flex flex-col justify-end h-full">
                        <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition">
                          {exp.name}
                        </h4>

                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition">
                          {exp.desc}
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wider text-indigo-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                          Explore <FaArrowRight size={10} />
                        </div>
                      </div>

                      {/* Shine */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[linear-gradient(120deg,transparent,white,transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition duration-1000" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* 🧠 Bottom Layer */}
          <div className="mt-24 text-center">
            <p className="text-gray-500 text-sm tracking-wide">
              AI-curated journeys • Personalized in real-time • Designed for explorers
            </p>
          </div>
        </div>
      </section>

      {/* ENTERTAINMENT SECTION */}
      <section className="py-24 border-t border-white/5 bg-[#030303] relative overflow-hidden">

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[300px] bg-red-500/5 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <h2 className="text-xs tracking-[0.3em] text-red-400 uppercase mb-3">
                Entertainment
              </h2>

              <h3 className="text-4xl md:text-5xl font-semibold text-white">
                Streaming Hub
              </h3>

              <p className="text-sm text-gray-400 mt-3 max-w-md">
                Access curated movies, series, and live content directly from your stay.
              </p>
            </div>

            <Link
              href="/entertainment"
              className="group flex items-center gap-2 text-sm text-gray-300 hover:text-white"
            >
              View all
              <span className="text-red-400 group-hover:translate-x-1 transition">
                →
              </span>
            </Link>
          </div>

          {/* ROWS */}
          <div className="space-y-12">
            {/* <EntertainmentRow title="Trending Now" items={demoData} /> */}
            <EntertainmentRow title="Action Picks" items={demoData} />
            <EntertainmentRow title="Comedy Specials" items={demoData} />
            {/* <EntertainmentRow title="Recommended For You" items={demoData} /> */}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-[#020202] text-white border-t border-white/[0.05]">

        {/* 🌌 Subtle FAANG-style Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-teal-500/[0.04] blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20">

          {/* 🔝 GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

            {/* 🌍 BRAND */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold tracking-wide mb-4">
                Yatri
                <span className="text-teal-400 font-serif italic lowercase">
                  hub
                </span>
              </h3>

              <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                A unified platform connecting travel, hospitality, dining,
                and experiences into one seamless ecosystem.
              </p>
            </div>

            {/* 🧭 PLATFORM */}
            <FooterColumn
              title="Platform"
              links={[
                { name: "Travel", href: "/travel" },
                { name: "Rooms", href: "/rooms" },
                { name: "Dining", href: "/food" },
                { name: "Entertainment", href: "/entertainment" },
              ]}
            />

            {/* 🔗 COMPANY */}
            <FooterColumn
              title="Company"
              links={[
                { name: "About", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Partners", href: "/partners" },
                { name: "Press", href: "/press" },
              ]}
            />

          </div>

          {/* ⚡ DIVIDER */}
          <div className="mt-16 border-t border-white/[0.05] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-xs text-zinc-500">
              © 2026 YatriHub. All rights reserved.
            </p>

            <div className="flex gap-6 text-xs text-zinc-500">
              <Link href="/privacy" className="hover:text-white transition">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.3em] mb-4">
        {title}
      </h4>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-[12px] text-zinc-400 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BentoBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-8 bg-[#080808] border border-white/5 rounded-[2.5rem] transition-all hover:border-white/20 ${className}`}>
      {children}
    </div>
  );
}

function EntertainmentRow({
  title,
  items,
}: {
  title: string;
  items: ContentItem[];
}) {
  const featured = items.find((i) => i.featured) || items[0];

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold text-white">
          {title}
        </h4>

        <span className="text-xs text-gray-400 hover:text-white cursor-pointer">
          Explore →
        </span>
      </div>

      <div className="flex gap-8">

        {/* 🔥 FEATURED */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative min-w-[380px] h-[280px] rounded-2xl overflow-hidden group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition"
            style={{ backgroundImage: `url(${featured.image})` }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          <div className="absolute top-4 left-4 bg-red-600 text-[10px] px-2 py-1 rounded">
            Featured
          </div>

          <div className="relative z-10 p-6 flex flex-col justify-end h-full max-w-[75%]">
            <h3 className="text-2xl font-bold text-white">
              {featured.title}
            </h3>

            <p className="text-xs text-gray-300">
              {featured.genre} • {featured.year} {featured.duration && `• ${featured.duration}`}
            </p>

            <div className="flex gap-3 mt-4">
              <button className="bg-white text-black px-4 py-2 rounded-full text-xs">
                ▶ Play
              </button>

              <button className="bg-white/10 px-4 py-2 rounded-full text-xs text-white">
                + Watchlist
              </button>
            </div>
          </div>
        </motion.div>

        {/* 🎬 SCROLL */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.12, y: -8 }}
              className="relative min-w-[170px] h-[250px] rounded-xl overflow-hidden border border-white/10 group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-semibold text-white">
                  {item.title}
                </p>

                <p className="text-[10px] text-gray-400">
                  {item.genre} • {item.year}
                </p>
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