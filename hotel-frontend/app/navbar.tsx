"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  FiUser,
  FiMenu,
  FiBell,
  FiSearch,
  FiX,
  FiCompass,
} from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ALL PREVIOUS LINKS INCLUDED
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
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        scrolled ? "py-3 bg-black/80 backdrop-blur-2xl border-b border-white/5" : "py-6 bg-transparent"
      }`}
    >
      {/* 🌌 High-Visibility Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-3 shrink-0">
          <FiCompass className="text-teal-400 text-xl group-hover:rotate-180 transition-transform duration-1000" />
          <span className="text-lg font-light tracking-[0.3em] text-white uppercase">
            Yatri<span className="font-serif italic text-teal-400 lowercase tracking-normal">hub</span>
          </span>
        </Link>

        {/* CENTER NAV: ALL 7 ITEMS */}
        <div className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative group text-[9px] font-black uppercase tracking-[0.3em] transition-all"
              >
                <span className={`transition-colors duration-300 ${
                  isActive ? "text-teal-400" : "text-zinc-500 group-hover:text-white"
                }`}>
                  {item.name}
                </span>
                
                {/* Celestial Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="nav-glow"
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-400 rounded-full shadow-[0_0_10px_#2dd4bf]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-6">
          
          <div className="hidden md:flex items-center gap-5 text-zinc-500">
            <FiSearch className="hover:text-white cursor-pointer transition-colors text-sm" />
            <div className="relative group cursor-pointer">
              <FiBell className="group-hover:text-white transition-colors text-sm" />
              <span className="absolute -top-1 -right-1 w-1 h-1 bg-teal-500 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

          {/* PROFILE DROP-DOWN */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-8 h-8 rounded-full border border-zinc-800 hover:border-teal-500/50 flex items-center justify-center transition-all bg-zinc-900/50 overflow-hidden"
            >
              <FiUser className="text-zinc-500 hover:text-white text-sm" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-48 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-3xl"
                >
                  <div className="p-2 space-y-1">
                    <Link href="/profile" className="block px-4 py-3 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                      Profile Center
                    </Link>
                    <Link href="/bookings" className="block px-4 py-3 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                      Active Transits
                    </Link>
                    <div className="h-px bg-white/5 mx-2" />
                    <button className="w-full text-left px-4 py-3 text-[10px] uppercase tracking-widest text-teal-600 hover:text-teal-400 hover:bg-teal-500/5 rounded-xl transition-all font-bold">
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MOBILE TOGGLE (Show for anything smaller than XL) */}
          <button className="xl:hidden p-2 text-zinc-400" onClick={() => setMobileOpen(true)}>
            <FiMenu className="text-xl" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU: OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-0 bg-black z-[100] flex flex-col p-10 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
               <span className="text-[10px] tracking-[0.5em] text-zinc-700 font-black uppercase">Navigation Menu</span>
               <FiX className="text-2xl text-zinc-500 cursor-pointer" onClick={() => setMobileOpen(false)} />
            </div>

            <div className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-3xl font-light tracking-tighter text-zinc-200 hover:text-teal-400 transition-all uppercase"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-zinc-900 flex flex-col gap-4">
               <Link href="/register" onClick={() => setMobileOpen(false)} className="text-teal-500 text-xs font-bold uppercase tracking-widest">Enroll Now</Link>
               <p className="text-[8px] tracking-[0.3em] text-zinc-800 uppercase italic">Coordinates: 34.0522° N, 118.2437° W</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}