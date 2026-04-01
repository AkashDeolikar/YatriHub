"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaBars,
  FaBell,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

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
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
      {/* Glow line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          HOTEL <span className="text-indigo-500">OS</span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative group ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.name === "Bookings" && (
                    <span className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" />
                  )}
                  {item.name === "Bookings" ? "My Bookings" : item.name}
                </span>

                {/* Active underline */}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-indigo-500 rounded-full"
                  />
                )}

                {/* Hover underline */}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white/40 group-hover:w-full transition-all duration-300" />
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* SEARCH */}
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-indigo-500 transition">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              placeholder="Search..."
              className="bg-transparent outline-none text-white placeholder-gray-500 w-40"
            />
          </div>

          {/* NOTIFICATION */}
          <div className="relative cursor-pointer">
            <FaBell className="text-gray-400 hover:text-white transition" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </div>

          {/* CTA */}
          <Link
            href="/register"
            className="hidden sm:block px-5 py-2 text-sm font-semibold bg-indigo-500 rounded-full hover:scale-105 transition"
          >
            Join
          </Link>

          {/* PROFILE */}
          <div className="relative" ref={profileRef}>
            <FaUserCircle
              onClick={() => setProfileOpen(!profileOpen)}
              className="text-xl text-gray-400 hover:text-white cursor-pointer"
            />

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-44 bg-black border border-white/10 rounded-xl overflow-hidden shadow-xl"
                >
                  <Link href="/profile" className="block px-4 py-3 hover:bg-white/10">
                    Profile
                  </Link>
                  <Link href="/bookings" className="block px-4 py-3 hover:bg-white/10">
                    Bookings
                  </Link>
                  <div className="border-t border-white/10" />
                  <button className="w-full text-left px-4 py-3 hover:bg-red-500/20 text-red-400">
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MOBILE BUTTON */}
          <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <FaBars className="text-lg text-gray-300" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed top-0 right-0 w-72 h-full bg-black border-l border-white/10 p-6 z-50"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold">Menu</h2>
              <FaTimes
                className="cursor-pointer"
                onClick={() => setMobileOpen(false)}
              />
            </div>

            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
