"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShieldCheck, Zap, Globe } from "lucide-react"; // Install lucide-react

// Optimized Asset Imports
import trainIcon from '../travel/train.svg';
import flight from '../travel/flight.svg';
import cab from '../travel/cab.webp';
import bus from '../travel/bus.webp';

export default function TravelPage() {
  const router = useRouter();

  const options = [
    { title: "Flight Booking", img: flight, route: "/travel/flight", tag: "Fastest", desc: "Global coverage with real-time tracking." },
    { title: "Train Booking", img: trainIcon, route: "/travel/train", tag: "Eco-Friendly", desc: "Seamless rail ticketing across all major networks." },
    { title: "Bus Booking", img: bus, route: "/travel/bus", tag: "Affordable", desc: "Premium inter-city luxury bus services." },
    { title: "Cab Booking", img: cab, route: "/travel/cab", tag: "Flexible", desc: "Instant city transfers and airport pickups." },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      
      {/* SaaS Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-md bg-black/40">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            Hotel<span className="text-indigo-500">OS</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm text-gray-400 font-medium">
            <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-white transition-colors">Enterprise</Link>
            <Link href="#" className="hover:text-white transition-colors">Support</Link>
          </div>
          <button className="bg-white text-black text-sm font-bold px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition-all">
            Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-44 pb-20 px-6 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-bold mb-6"
          >
            <Zap size={14} /> NEW: GLOBAL FLIGHT AGGREGATOR 2.0
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            One Platform, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-purple-400">
              Infinite Destinations
            </span>
          </motion.h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            The all-in-one travel infrastructure for modern enterprises. Book, manage, and track travel logistics with 99.9% uptime.
          </p>
        </div>

        {/* Dynamic Service Grid */}
        <div className="max-w-7xl mx-auto mt-10 grid md:grid-cols-4 gap-6 relative z-10">
          {options.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => router.push(item.route)}
              className="group cursor-pointer bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 transition-all hover:bg-indigo-500/[0.02] hover:border-indigo-500/30"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image src={item.img} alt={item.title} fill style={{ objectFit: 'contain' }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-500/10 px-2 py-1 rounded">
                  {item.tag}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {item.desc}
              </p>
              
              <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                Book Now <ChevronRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Section / SaaS Features */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex gap-4">
            <div className="text-indigo-500"><ShieldCheck size={32}/></div>
            <div>
              <h4 className="font-bold mb-1">Enterprise Security</h4>
              <p className="text-sm text-gray-500">PCI-DSS compliant payment gateways with 256-bit encryption.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-indigo-500"><Globe size={32}/></div>
            <div>
              <h4 className="font-bold mb-1">Global Network</h4>
              <p className="text-sm text-gray-500">Access to 500+ airlines and 2000+ transit partners worldwide.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-indigo-500"><Zap size={32}/></div>
            <div>
              <h4 className="font-bold mb-1">Real-time Sync</h4>
              <p className="text-sm text-gray-500">Instant SMS and email notifications for all schedule changes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}