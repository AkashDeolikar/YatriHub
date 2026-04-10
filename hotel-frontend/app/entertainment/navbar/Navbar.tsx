"use client";

import { useState, useEffect } from "react";
import NavLinks from "./NavLinks";
import SearchModal from "./SearchModal";
import ProfileDropdown from "./ProfileDropdown";
import MobileDrawer from "./MobileDrawer";
import { Search, Menu, Bell } from "lucide-react";
import Link from "next/link";
import {
    FiCompass,
} from "react-icons/fi";

export default function Navbar() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle transparent to solid transition on scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-colors duration-500 px-6 md:px-12 h-16 md:h-20 flex items-center justify-between
        ${isScrolled ? "bg-black border-b border-white/10" : "bg-gradient-to-b from-black/80 to-transparent"}`}
            >
                <div className="flex items-center gap-10">
                    <Link href="/" className="group flex items-center gap-2.5 shrink-0">
                        <div className="relative">
                            <FiCompass className="text-teal-400 text-2xl group-hover:rotate-[360deg] transition-transform duration-1000 ease-expo" />
                            <div className="absolute inset-0 bg-teal-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-xl font-bold text-white">
                            Yatri<span className="text-teal-400">Hub</span>
                        </span>
                        <div className="flex items-center justify-center gap-2 mt-[-4px]">
                            <span className="h-[1px] w-4 bg-red-600" />
                            <span className="text-[9px] font-medium uppercase tracking-[0.5em] text-gray-400">
                                Media Stream
                            </span>
                            <span className="h-[1px] w-4 bg-red-600" />
                        </div>
                    </Link>
                    <NavLinks />
                </div>

                <div className="flex items-center gap-4 md:gap-6 text-white">
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Search"
                    >
                        <Search size={22} />
                    </button>

                    <Bell className="hidden md:block cursor-pointer hover:text-gray-300" size={22} />

                    <ProfileDropdown />

                    <button
                        className="lg:hidden p-2"
                        onClick={() => setMobileOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            <SearchModal open={searchOpen} setOpen={setSearchOpen} />
            <MobileDrawer open={mobileOpen} setOpen={setMobileOpen} />
        </>
    );
}