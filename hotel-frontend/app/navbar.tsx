"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  FiMenu,
  FiBell,
  FiSearch,
  FiX,
  FiCompass,
  FiChevronRight,
} from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Rooms", href: "/rooms" },
    { name: "Food", href: "/food" },
    { name: "Travel", href: "/travel" },
    { name: "Entertainment", href: "/entertainment" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Bookings", href: "/bookings" },
    { name: "Discovery", href: "/discovery" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? "py-3 bg-black/40 backdrop-blur-xl border-b border-white/[0.08]" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between">
        
        {/* LOGO SECTION */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
          <div className="relative">
            <FiCompass className="text-teal-400 text-2xl group-hover:rotate-[360deg] transition-transform duration-1000 ease-expo" />
            <div className="absolute inset-0 bg-teal-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-bold text-white">
            Yatri<span className="text-teal-400">Hub</span>
          </span>
        </Link>

        {/* MODERN TAB NAVIGATION */}
        <div className="hidden xl:flex items-center bg-white/[0.03] border border-white/[0.08] p-1 rounded-full backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-5 py-2 text-[13px] font-medium transition-all duration-300 rounded-full ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/[0.1] border border-white/[0.1] shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* ACTIONS & LOGIN */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 mr-2">
            <button className="p-2 text-zinc-400 hover:text-white transition-colors">
              <FiSearch className="text-lg" />
            </button>
            <button className="p-2 text-zinc-400 hover:text-white transition-colors relative">
              <FiBell className="text-lg" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-teal-500 rounded-full ring-2 ring-black" />
            </button>
          </div>

          <div className="h-6 w-px bg-white/10 hidden sm:block mx-2" />

          {/* HIGH-END LOGIN BUTTON */}
          <Link
            href="/login"
            className="group relative px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] hidden sm:flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <span>Login</span>
            <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* MOBILE TOGGLE */}
          <button 
            className="xl:hidden p-2.5 bg-white/5 border border-white/10 rounded-xl text-white" 
            onClick={() => setMobileOpen(true)}
          >
            <FiMenu className="text-xl" />
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY (Refined) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black/90 z-[100] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
               <span className="text-xs tracking-widest text-zinc-500 font-bold uppercase">Explore Portal</span>
               <button 
                onClick={() => setMobileOpen(false)}
                className="p-3 bg-white/5 rounded-full text-white"
               >
                 <FiX className="text-2xl" />
               </button>
            </div>

            <div className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-4xl font-bold tracking-tighter text-white hover:text-teal-400 transition-colors flex items-center justify-between group"
                  >
                    {item.name}
                    <FiChevronRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-2xl" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4">
               <Link href="/login" className="py-4 bg-white text-black rounded-2xl text-center font-bold">Login</Link>
               <Link href="/signup" className="py-4 bg-white/10 text-white border border-white/10 rounded-2xl text-center font-bold">Sign Up</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}