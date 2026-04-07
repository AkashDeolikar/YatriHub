"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaSearch,
  FaBell,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useBookingStore } from "./store/bookingStore";

export default function EntertainmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [focusSearch, setFocusSearch] = useState(false);

  const seats = useBookingStore((s) => s.seats);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/entertainment" },
    { name: "Movies", href: "/entertainment" },
    { name: "TV Shows", href: "#" },
    { name: "New & Popular", href: "#" },
    { name: "My List", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-2xl border-b border-white/10"
            : "bg-gradient-to-b from-black via-black/70 to-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4">

          {/* LEFT */}
          <div className="flex items-center gap-10">

            {/* LOGO */}
            <Link href="/entertainment">
              <h1 className="text-red-600 text-2xl md:text-3xl font-extrabold tracking-tight hover:scale-105 transition">
                YATRI<span className="text-white">PLAY</span>
              </h1>
            </Link>

            {/* NAV LINKS */}
            <div className="hidden md:flex gap-6 text-sm relative">
              {navItems.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative group"
                  >
                    <span
                      className={`transition ${
                        active
                          ? "text-white font-semibold"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* ACTIVE UNDERLINE */}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5 text-gray-300">

            {/* SEARCH (EXPANDING) */}
            <div
              className={`flex items-center gap-2 border-b transition-all duration-300 ${
                focusSearch ? "border-white w-48" : "border-gray-600 w-28"
              }`}
            >
              <FaSearch className="text-sm" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocusSearch(true)}
                onBlur={() => setFocusSearch(false)}
                placeholder="Search"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>

            {/* CART */}
            <Link href="/entertainment/checkout" className="relative group">
              <FaShoppingCart className="group-hover:text-white transition" />
              {seats.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-[10px] px-1 rounded">
                  {seats.length}
                </span>
              )}
            </Link>

            {/* NOTIFICATIONS */}
            <FaBell className="cursor-pointer hover:text-white transition" />

            {/* USER */}
            <FaUserCircle className="cursor-pointer hover:text-white transition" />
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="pt-24 px-4 md:px-12">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="text-gray-500 text-xs mt-20 px-6 md:px-12 pb-10">
        <div className="max-w-5xl mx-auto space-y-4">
          <p>Questions? Contact us.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <span>FAQ</span>
            <span>Help Center</span>
            <span>Account</span>
            <span>Media Center</span>
            <span>Investor Relations</span>
            <span>Jobs</span>
            <span>Ways to Watch</span>
            <span>Terms of Use</span>
          </div>

          <p className="mt-4">© 2026 YatriHub Entertainment</p>
        </div>
      </footer>
    </div>
  );
}