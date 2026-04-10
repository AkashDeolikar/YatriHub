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
import Navbar from "@/app/entertainment/navbar/Navbar";
import Footer from "@/app/entertainment/navbar/Footer";
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
      <>
        <Navbar />
      </>


      {/* CONTENT */}
      <main className="pt-24 px-4 md:px-12">
        {children}
      </main>

      <>
        <Footer />
      </>
    </div>
  );
}