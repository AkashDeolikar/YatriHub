"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaShieldAlt, FaChartLine, FaBolt, FaCar, FaUtensils, FaPlane,
  FaTrain, FaPizzaSlice, FaCocktail, FaIceCream, FaArrowRight,
  FaCrown, FaBed, FaHotel, FaKhanda
} from "react-icons/fa";
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
      <section className="relative pt-32 pb-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-gray-300 text-xs font-semibold tracking-wide mb-8 inline-block">
            Next-Gen Hospitality · v3.0
          </span>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.95] mb-8 uppercase">
            <span className="text-gray-200">Travel.</span> <br />

            <span className="text-indigo-300 inline-block hover:-translate-y-1 transition">
              Stay.
            </span>{" "}
            <span className="text-violet-300 inline-block hover:translate-y-1 transition">
              Move.
            </span>{" "}
            <span className="text-fuchsia-300 inline-block hover:-translate-y-1 transition">
              Experience.
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 font-medium">
            One unified platform for booking stays, flights, cabs, food, and experiences—powered by real-time intelligence and secure payments.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/rooms" className="px-10 py-4 bg-white/15 text-bold font-bold uppercase tracking-widest rounded-full hover:bg-violet-900 hover:text-white transition-all">
              Start Booking
            </Link>
            <Link href="/admin" className="px-10 py-4 bg-white/5 border border-white/10 font-bold uppercase tracking-widest rounded-full hover:bg-white/10 hover:border hover:border-violet-400 transition-all">
              Launch Console
            </Link>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            {/* TABS */}
            <div className="flex justify-center gap-6 mb-4 text-xs text-gray-400">
              <button className="text-indigo-400 font-bold">Hotels</button>
              <button>Flights</button>
              <button>Cabs</button>
              <button>Food</button>
            </div>

            {/* SEARCH BAR */}
            <div className="bg-white/5 border border-white/10 rounded-full p-2 flex gap-2 backdrop-blur">
              <input
                placeholder="Where are you going?"
                className="flex-1 bg-transparent px-4 py-2 outline-none text-sm"
              />
              <button className="bg-indigo-500 px-6 py-2 rounded-full text-sm font-bold">
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* BENTO GRID FEATURES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[650px]">
          <BentoBox className="md:col-span-2 md:row-span-2 group relative overflow-hidden">

            {/* Subtle Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none" />

            {/* Icon */}
            <FaShieldAlt className="text-4xl text-indigo-400 mb-6 transition-transform duration-300 group-hover:scale-110" />

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight text-white">
              Smart Booking Engine
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Advanced locking at the database level prevents double bookings across
              rooms, flights, and cabs — ensuring seamless, conflict-free transactions
              in real time.
            </p>

            {/* Stats */}
            <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-3 gap-6">

              <div>
                <div className="text-2xl font-semibold text-white">500+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                  Hotels
                </div>
              </div>

              <div>
                <div className="text-2xl font-semibold text-white">50+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                  Cities
                </div>
              </div>

              <div>
                <div className="text-2xl font-semibold text-white">24/7</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                  Support
                </div>
              </div>

            </div>
          </BentoBox>


          <BentoBox className="group relative md:col-span-2 overflow-hidden rounded-xl border border-white/10 bg-[#1c1c1c]/50 backdrop-blur-md transition-all hover:border-indigo-500/50">
            {/* Subtitle/Status Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <FaChartLine className="text-lg text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-white/90">LIVE INTELLIGENCE</h3>
                  <p className="text-[11px] text-gray-500 leading-none">Real-time streams</p>
                </div>
              </div>

              {/* Microsoft-style Status Badge */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-medium text-green-400 uppercase tracking-wider">Live</span>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="mt-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">$42.4k</span>
                <span className="text-[10px] text-green-400 font-medium">+12%</span>
              </div>
              {/* Data Visualization Grid */}
              <div className="mt-6 flex items-end gap-[3px] h-12">
                {[40, 70, 45, 90, 65, 80, 30, 50, 40, 60, 85, 45].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 bg-indigo-500/30 rounded-t-[1px] transition-all duration-500 hover:bg-indigo-400"
                  />
                ))}
              </div>
            </div>
            {/* Background Glow Effect */}
            <div className="absolute -right-8 -bottom-8 h-24 w-24 bg-indigo-600/10 blur-[40px] pointer-events-none" />
          </BentoBox>

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
      <section className="py-24 border-t border-white/5 bg-[#000]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Top Label */}
          <h2 className="text-center text-xs tracking-[0.35em] text-gray-500 uppercase mb-10">
            One Platform · Infinite Possibilities
          </h2>

          {/* Heading Row */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-8">

            <div>
              <h2 className="text-xs font-semibold tracking-[0.3em] text-indigo-400 uppercase mb-3">
                Accommodations
              </h2>

              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                Premier Environments
              </h3>
            </div>

            {/* CTA */}
            <Link
              href="/rooms"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Discover all units
              <FaArrowRight
                size={12}
                className="text-indigo-400 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <RoomFeatureCard
              icon={<FaCrown size={30} />}
              price="30,000"
              href="/rooms"
            />

            <RoomStandardCard
              icon={<FaKhanda />}
              name="Luxury Suite"
              href="/rooms"
              price="20,000"
              desc="Elevated space with panoramic views."
            />

            <RoomStandardCard
              icon={<FaHotel />}
              name="Business Class"
              href="/rooms"
              price="15,000"
              desc="Designed for productivity and comfort."
            />

            <RoomStandardCard
              icon={<FaBed />}
              name="Smart Standard"
              href="/rooms"
              price="9,000"
              desc="Essential comfort with automated service."
            />

            {/* Availability Engine (UPGRADED) */}
            <div className="group relative bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-indigo-500/40 transition-all">

              <h4 className="text-[11px] font-medium uppercase tracking-wide text-gray-500 mb-4">
                Availability Engine
              </h4>

              <div className="space-y-3">

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Total Units</span>
                  <span className="text-white font-medium">148</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Sync Status</span>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-green-400 text-xs font-medium">
                      Operational
                    </span>
                  </div>
                </div>

              </div>

              {/* Mini Progress Indicator */}
              <div className="mt-6">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[78%] bg-indigo-400"></div>
                </div>
                <div className="text-[10px] text-gray-500 mt-1">
                  Occupancy 78%
                </div>
              </div>

              {/* Glow */}
              <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-indigo-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />
            </div>

          </div>
        </div>
      </section>

      {/* TRAVEL SERVICE SELECTOR */}
      <section className="py-24 border-t border-white/5 bg-[#050505] relative overflow-hidden">

        {/* Subtle Top Glow */}
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
      <section className="py-24 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">

            <div>
              <h2 className="text-xs font-semibold tracking-[0.3em] text-purple-400 uppercase mb-3">
                Culinary
              </h2>

              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                Gourmet Services
              </h3>
            </div>

            {/* CTA */}
            <Link
              href="/food"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Open menu
              <span className="text-purple-400 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <ServiceCard
              icon={<FaUtensils />}
              name="Main Course"
              href="/food?cat=Indian"
              desc="Curated fine dining experiences"
            />

            <ServiceCard
              icon={<FaPizzaSlice />}
              name="Fast Track"
              href="/food?cat=Pizza"
              desc="Quick bites with urban flavors"
            />

            <ServiceCard
              icon={<FaCocktail />}
              name="Mixology"
              href="/food?cat=Liquor"
              desc="Premium cocktails & spirits"
            />

            <ServiceCard
              icon={<FaIceCream />}
              name="Patisserie"
              href="/food?cat=Desserts"
              desc="Artisan desserts & sweet finales"
            />

          </div>

        </div>
      </section>

      {/* DISCOVERY ECOSYSTEM SECTION */}
      <section className="py-24 border-t border-white/5 bg-[#050505] relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-40" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">

            <div>
              {/* Label */}
              {[40, 70, 45, 90, 65, 80, 30, 50, 40, 60, 85, 45].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="flex-1 bg-indigo-500/30 rounded-t-[1px]"
                />
              ))}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="h-[1px] w-6 bg-indigo-500/50" />
                <h2 className="text-xs font-semibold tracking-[0.3em] text-indigo-400 uppercase">
                  Discovery
                </h2>
              </motion.div>

              {/* Title */}
              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                Curated Experiences
              </h3>

              <p className="text-sm text-gray-400 mt-3 max-w-md">
                Discover wellness, adventure, culinary, and cultural experiences tailored to your journey.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/discovery"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              View all experiences
              <span className="text-indigo-400 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <DiscoveryServiceCard
              number="01"
              name="Wellness"
              href="/discovery?cat=Wellness"
              desc="Therapeutic rituals & spa experiences"
            />

            <DiscoveryServiceCard
              number="02"
              name="Adventures"
              href="/discovery?cat=Adventure"
              desc="Outdoor and high-altitude activities"
            />

            <DiscoveryServiceCard
              number="03"
              name="Culinary"
              href="/discovery?cat=Culinary"
              desc="Private dining & chef-led sessions"
            />

            <DiscoveryServiceCard
              number="04"
              name="Local Arts"
              href="/discovery?cat=Discovery"
              desc="Exclusive galleries & cultural access"
            />

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
      <footer className="py-16 px-8 border-t border-white/10 bg-[#050505] text-center">

        <h3 className="text-xl font-semibold mb-4">YatriHub</h3>

        <p className="text-sm text-gray-400 mb-6">
          Next-gen unified travel ecosystem.
        </p>

        <div className="flex justify-center gap-6 text-sm text-gray-400">
          <span className="hover:text-white cursor-pointer">About</span>
          <span className="hover:text-white cursor-pointer">Careers</span>
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
        </div>

        <p className="text-xs text-gray-600 mt-8">
          © 2026 YatriHub. All rights reserved.
        </p>

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