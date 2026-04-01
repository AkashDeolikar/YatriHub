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
          <span className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 inline-block">
            Next-Gen Hospitality v3.0
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase italic">
            Precision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">Hospitality.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 font-medium">
            Intelligent booking validation, real-time mobility tracking, and
            enterprise-grade financial security—all in one kernel.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/rooms" className="px-10 py-4 bg-white/15 text-bold font-bold uppercase tracking-widest rounded-full hover:bg-violet-900 hover:text-white transition-all">
              Start Booking
            </Link>
            <Link href="/admin" className="px-10 py-4 bg-white/5 border border-white/10 font-bold uppercase tracking-widest rounded-full hover:bg-white/10 hover:border hover:border-violet-400 transition-all">
              Launch Console
            </Link>
          </div>
        </motion.div>
      </section>

      {/* BENTO GRID FEATURES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[650px]">
          <BentoBox className="md:col-span-2 md:row-span-2 group">
            <FaShieldAlt className="text-4xl text-indigo-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl font-bold mb-4 italic">ZERO-LOCK <br /> VALIDATION</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Proprietary database-level mutex locks prevent double-bookings
              across rooms, flights, and cabs simultaneously. 100% reliability.
            </p>
            <div className="mt-8 pt-8 border-t border-white/5 flex gap-4">
              <div className="text-center">
                <div className="text-xl font-bold italic">0.2ms</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-tighter">Latency</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold italic">99.9%</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-tighter">Uptime</div>
              </div>
            </div>
          </BentoBox>

          <BentoBox className="md:col-span-2 bg-gradient-to-br from-indigo-900/20 to-transparent">
            <div className="flex justify-between items-start">
              <div>
                <FaChartLine className="text-2xl text-indigo-400 mb-4" />
                <h3 className="text-xl font-bold">LIVE INTELLIGENCE</h3>
              </div>
              <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-2 py-1 rounded">LIVE</span>
            </div>
            <p className="text-gray-400 text-xs mt-2">Real-time revenue and occupancy streams for admins.</p>
            <div className="mt-6 h-16 flex items-end gap-1">
              {[40, 70, 45, 90, 65, 80, 30].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-indigo-500/20 border-t-2 border-indigo-500" />
              ))}
            </div>
          </BentoBox>

          <BentoBox className="md:col-span-1 bg-[#0a0a0a]">
            <FaBolt className="text-yellow-500 mb-4" />
            <h3 className="text-lg font-bold italic">INSTANT PAY</h3>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest">Stripe Integrated</p>
          </BentoBox>

          <BentoBox className="md:col-span-1 border-indigo-500/30">
            <h3 className="text-4xl font-black italic text-indigo-500">24/7</h3>
            <p className="text-xs text-gray-400 mt-2">Autonomous support concierge.</p>
          </BentoBox>
        </div>
      </section>

      {/* PREMIER ROOMS ECOSYSTEM (BENTO LAYOUT) */}
      <section className="py-24 border-t border-white/5 bg-[#000]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-8">
            <div>
              <h2 className="text-sm font-black tracking-[0.4em] text-indigo-500 uppercase mb-4">Accommodations</h2>
              <h3 className="text-5xl font-bold tracking-tighter italic">PREMIER ENVIRONMENTS</h3>
            </div>
            <Link href="/rooms" className="text-xs font-bold underline underline-offset-8 decoration-indigo-500 inline-flex items-center gap-2">
              DISCOVER ALL UNITS <FaArrowRight size={10} className="text-indigo-500" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto">
            <RoomFeatureCard icon={<FaCrown size={30} />} price="30,000" href="/rooms" />
            <RoomStandardCard icon={<FaKhanda />} name="Luxury Suite" href="/rooms" price="20,000" desc="Elevated space, panoramic views." />
            <RoomStandardCard icon={<FaHotel />} name="Business Class" href="/rooms" price="15,000" desc="Optimized workflow environment." />
            <RoomStandardCard icon={<FaBed />} name="Smart Standard" href="/rooms" price="9,000" desc="Essential comfort, automated service." />
            
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[150px]">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4">Availability Engine</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono"><span className="text-gray-500">Units Total</span><span>148</span></div>
                <div className="flex justify-between text-xs font-mono"><span className="text-gray-500">Sync Status</span><span className="text-green-400">Nominal</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAVEL SERVICE SELECTOR */}
      <section className="py-24 border-t border-white/[0.08] bg-[#050505] relative overflow-hidden">
  {/* Subtle background glow to increase visibility of the dark theme */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
      <div>
        <h2 className="text-[10px] font-black tracking-[0.5em] text-indigo-500 uppercase mb-3 flex items-center gap-2">
          <span className="w-6 h-px bg-indigo-500/40" />
          Ecosystem
        </h2>
        <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter italic text-white leading-none">
          TRAVEL <span className="text-zinc-600 not-italic font-light">SERVICES</span>
        </h3>
      </div>
      
      <Link 
        href="/travel" 
        className="text-xs font-bold tracking-widest text-zinc-400 hover:text-indigo-400 transition-all duration-300 flex items-center gap-2 group"
      >
        VIEW ALL SERVICES
        <span className="h-px w-8 bg-zinc-800 group-hover:w-12 group-hover:bg-indigo-500 transition-all duration-300" />
      </Link>
    </div>

    {/* Increased gap and improved responsive grid for better legibility */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <ServiceCard icon={<FaCar />} name="Cab Hub" href="/travel/cab" desc="Ola/Uber Integration" />
      <ServiceCard icon={<FaPlane />} name="Flights" href="/travel/flights" desc="Global Fleet Access" />
      <ServiceCard icon={<FaTrain />} name="Rail" href="/travel/trains" desc="Live Seat Map" />
      <ServiceCard icon={<FaUtensils />} name="Gourmet" href="/food" desc="In-Room Delivery" />
    </div>
  </div>
</section>

      {/* GOURMET ECOSYSTEM SECTION */}
      <section className="py-24 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-sm font-black tracking-[0.4em] text-purple-500 uppercase mb-4">Culinary</h2>
              {/* <h3 className="text-5xl font-bold tracking-tighter italic"> SERVICES</h3> */}
              <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter italic text-white leading-none">
          GOURMET <span className="text-zinc-600 not-italic font-light">SERVICES</span>
        </h3>
            </div>
            <Link href="/food" className="text-xs font-bold underline underline-offset-8 decoration-purple-500">OPEN MENU</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ServiceCard icon={<FaUtensils />} name="Main Course" href="/food?cat=Indian" desc="Fine Dining Experience" />
            <ServiceCard icon={<FaPizzaSlice />} name="Fast Track" href="/food?cat=Pizza" desc="Quick Urban Bites" />
            <ServiceCard icon={<FaCocktail />} name="Mixology" href="/food?cat=Liquor" desc="Premium Spirits" />
            <ServiceCard icon={<FaIceCream />} name="Patisserie" href="/food?cat=Desserts" desc="Sweet Finales" />
          </div>
        </div>
      </section>

              {/* DISCOVERY ECOSYSTEM SECTION */}
<section className="py-32 border-t border-white/5 bg-[#050505] relative overflow-hidden">
  {/* SUBTLE BACKGROUND DECOR */}
  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/[0.02] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
      <div>
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-[1px] w-8 bg-indigo-500/50" />
          <h2 className="text-[10px] font-black tracking-[0.5em] text-indigo-400 uppercase">Curated_Global</h2>
        </motion.div>
        
        <h3 className="text-6xl md:text-5xl font-light tracking-[-0.04em] leading-none mb-2">
          EXPLORATION
          <span className="font-serif opacity-60 text-5xl md:text-4xl tracking-[0.15em] mt-2 block uppercase">
            Protocols
          </span>
        </h3>
      </div>
      
      <Link 
        href="/discovery" 
        className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors border-b border-white/10 pb-2"
      >
        View All Experiences 
        <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
      </Link>
    </div>

    {/* ARCHITECTURAL SERVICE CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <DiscoveryServiceCard 
        number="01" 
        name="Wellness" 
        href="/discovery?cat=Wellness" 
        desc="Therapeutic Body Rituals" 
      />
      <DiscoveryServiceCard 
        number="02"
        name="Adventures" 
        href="/discovery?cat=Adventure" 
        desc="High-Altitude Excursions" 
      />
      <DiscoveryServiceCard 
        number="03" 
        name="Culinary" 
        href="/discovery?cat=Culinary" 
        desc="Private Chef Masterclasses" 
      />
      <DiscoveryServiceCard 
        number="04" 
        name="Local Arts" 
        href="/discovery?cat=Discovery" 
        desc="Hidden Gallery Access" 
      />
    </div>
  </div>
</section>

{/* ENTERTAINMENT SECTION */}
<section className="py-24 border-t border-white/5 bg-[#030303]">
  <div className="max-w-7xl mx-auto px-6">

    {/* HEADER */}
    <div className="flex justify-between items-end mb-12">
      <div>
        <h2 className="text-[10px] font-black tracking-[0.5em] text-red-500 uppercase mb-3">
          Entertainment
        </h2>
        <h3 className="text-4xl md:text-6xl font-extrabold italic">
          STREAMING HUB
        </h3>
      </div>

      <Link 
        href="/entertainment" 
        className="text-xs font-bold text-gray-400 hover:text-white transition"
      >
        VIEW ALL →
      </Link>
    </div>

    {/* ROWS */}
    <EntertainmentRow title="Trending Now" />
    <EntertainmentRow title="Action Picks" />
    <EntertainmentRow title="Comedy Specials" />
    <EntertainmentRow title="Recommended For You" />

  </div>
</section>

      {/* FOOTER */}
      <footer className="py-12 px-8 border-t border-white/5 text-center">
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.5em]">
          © 2026 HOTELOS KERNEL · ALL RIGHTS RESERVED
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
    <div className="mb-10">
      <h4 className="text-lg font-bold mb-4">{title}</h4>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {items.map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.15 }}
            className="min-w-[180px] h-[260px] rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 relative group cursor-pointer"
          >
            {/* IMAGE MOCK */}
            <div className="absolute inset-0 bg-[url('/poster.jpg')] bg-cover bg-center opacity-80 group-hover:opacity-100 transition" />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition" />

            {/* TITLE */}
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-xs font-bold">Movie {i + 1}</p>
            </div>

            {/* HOVER PLAY */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <div className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold">
                ▶ Play
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ icon, name, href, desc }: { icon: any; name: string; href: string, desc: string }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 bg-black border border-white/5 rounded-[2rem] group hover:bg-indigo-600 transition-all duration-500"
      >
        <div className="text-2xl mb-4 text-indigo-500 group-hover:text-white transition-colors">{icon}</div>
        <h4 className="text-lg font-bold mb-1">{name}</h4>
        <p className="text-[10px] text-gray-500 group-hover:text-white/60 transition-colors uppercase tracking-widest">{desc}</p>
      </motion.div>
    </Link>
  );
}

function RoomFeatureCard({ icon, price, href }: { icon: any, price: string, href: string }) {
  return (
    <Link href={href} className="group md:col-span-2 md:row-span-2 relative overflow-hidden bg-gradient-to-br from-indigo-950/40 to-black rounded-[3rem] border border-white/5 p-10 flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-500 min-h-[400px]">
      <div className="relative z-10">
        <div className="w-14 h-14 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/30">
          {icon}
        </div>
        <h3 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.9] mb-4">
          Presidential <br /> Suite
        </h3>
        <p className="text-gray-500 text-[10px] max-w-xs uppercase font-bold tracking-widest leading-loose">
          Proprietary privacy shielding & dedicated kernel access.
        </p>
      </div>
      <div className="relative z-10 flex justify-between items-center bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/5">
        <div>
          <p className="text-[10px] font-black text-gray-500 uppercase">Rate/Cycle</p>
          <p className="text-2xl font-black italic">₹{price}</p>
        </div>
        <div className="bg-white text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:bg-indigo-500 group-hover:text-white transition-colors">
          Initialize
        </div>
      </div>
    </Link>
  );
}

function RoomStandardCard({ icon, name, href, price, desc }: any) {
  return (
    <Link href={href} className="group bg-[#080808] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between hover:bg-black hover:border-indigo-500/20 transition-all">
      <div className="flex justify-between items-start mb-8">
        <div className="text-indigo-500 text-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-right">
          <p className="text-[8px] font-black text-gray-600 uppercase">From</p>
          <p className="text-lg font-black italic">₹{price}</p>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-black italic uppercase tracking-tighter mb-1">{name}</h4>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-tight">{desc}</p>
      </div>
    </Link>
  );
}
