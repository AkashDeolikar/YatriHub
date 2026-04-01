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

  const seats = useBookingStore((s) => s.seats);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gradient-to-b from-black via-black/80 to-black/30 backdrop-blur-xl"
            : "bg-gradient-to-b from-black via-black/70 to-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4">

          {/* LEFT */}
          <div className="flex items-center gap-8">

            {/* LOGO */}
            <Link href="/entertainment">
              <h1 className="text-red-600 text-3xl font-extrabold tracking-tight">
                ENTERTAINMENT
              </h1>
            </Link>

            {/* NAV LINKS */}
            <div className="hidden md:flex gap-5 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition ${
                    pathname === item.href
                      ? "text-white font-semibold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5 text-gray-300">

            {/* SEARCH */}
            <div className="hidden md:flex items-center gap-2">
              <FaSearch />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="bg-transparent border-b border-gray-500 focus:border-white outline-none text-sm w-32 transition-all"
              />
            </div>

            {/* CART */}
            <Link href="/entertainment/checkout" className="relative">
              <FaShoppingCart size={18} />
              {seats.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-[10px] px-1 rounded">
                  {seats.length}
                </span>
              )}
            </Link>

            {/* NOTIFICATIONS */}
            <FaBell size={18} className="cursor-pointer hover:text-white" />

            {/* USER */}
            <FaUserCircle size={20} className="cursor-pointer hover:text-white" />
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

          <p className="mt-4">© 2026 Entertainment Clone</p>
        </div>
      </footer>
    </div>
  );
}