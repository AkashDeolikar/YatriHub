"use client";

import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useEffect, useState, useRef, useCallback, useId } from "react";
import {
  FiMenu,
  FiX,
  FiBell,
  FiCompass,
  FiSearch,
  FiChevronRight,
  FiZap,
  FiMapPin,
  FiWifi,
} from "react-icons/fi";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */

interface NavChild {
  name: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

interface NavItem {
  name: string;
  children: NavChild[];
}

interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: "success" | "warning" | "info";
  unread: boolean;
}

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */

const NAV_ITEMS: NavItem[] = [
  {
    name: "Rooms",
    children: [
      { name: "Luxury Suites",   href: "/rooms/luxury",   description: "Premium stays with panoramic views",   icon: <FiMapPin size={14} /> },
      { name: "Budget Rooms",    href: "/rooms/budget",   description: "Comfortable stays at honest prices",    icon: <FiMapPin size={14} /> },
    ],
  },
  {
    name: "Travel",
    children: [
      { name: "Flights", href: "/travel/flights", description: "Real-time fares, zero markup",       icon: <FiZap size={14} /> },
      { name: "Cabs",    href: "/travel/cabs",    description: "Instant pickup, tracked live",        icon: <FiZap size={14} /> },
      { name: "Trains",  href: "/travel/trains",  description: "PNR status & smart seat alerts",     icon: <FiZap size={14} /> },
    ],
  },
  {
    name: "Explore",
    children: [
      { name: "Food",      href: "/food",      description: "Curated local restaurants & delivery", icon: <FiWifi size={14} /> },
      { name: "Discovery", href: "/discovery", description: "AI-personalised city experiences",     icon: <FiWifi size={14} /> },
    ],
  },
  {
    name: "About",
    children: [
      { name: "Our Story",  href: "/about",        description: "How YatriHub was built",          icon: <FiCompass size={14} /> },
      { name: "Careers",    href: "/about/careers", description: "Join the team",                   icon: <FiCompass size={14} /> },
    ],
  },
];

const NOTIFICATIONS: Notification[] = [
  { id: "1", title: "Booking confirmed",       desc: "Luxury Suite · Check-in tomorrow 2 PM",  time: "2m ago",  type: "success", unread: true  },
  { id: "2", title: "Price drop alert",        desc: "Flights to Mumbai dropped by 18%",        time: "14m ago", type: "warning", unread: true  },
  { id: "3", title: "AI assistant updated",    desc: "Smarter itinerary suggestions enabled",   time: "1h ago",  type: "info",    unread: false },
  { id: "4", title: "Your review was helpful", desc: "32 travellers found it useful",           time: "3h ago",  type: "info",    unread: false },
];

/* ─────────────────────────────────────────────────────────────
   MOTION VARIANTS
───────────────────────────────────────────────────────────── */

const megaMenuVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.985 },
  show:   { opacity: 1, y: 0,  scale: 1,     transition: { type: "spring", stiffness: 280, damping: 26 } },
  exit:   { opacity: 0, y: -8, scale: 0.985, transition: { duration: 0.15, ease: "easeIn" } },
};

const drawerVariants = {
  hidden: { x: "100%" },
  show:   { x: 0,      transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit:   { x: "100%", transition: { type: "tween",  duration: 0.22, ease: [0.4, 0, 1, 1] } },
};

const mobileMenuVariants = {
  hidden: { x: "-100%", opacity: 0 },
  show:   { x: 0,       opacity: 1, transition: { type: "spring", stiffness: 280, damping: 28 } },
  exit:   { x: "-100%", opacity: 0, transition: { type: "tween",  duration: 0.22, ease: [0.4, 0, 1, 1] } },
};

const searchVariants = {
  hidden: { opacity: 0, y: 20,  scale: 0.97 },
  show:   { opacity: 1, y: 0,   scale: 1,    transition: { type: "spring", stiffness: 320, damping: 28 } },
  exit:   { opacity: 0, y: 16,  scale: 0.97, transition: { duration: 0.14, ease: "easeIn" } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const fadeSlide = {
  hidden: { opacity: 0, x: -10 },
  show:   { opacity: 1, x: 0,   transition: { type: "spring", stiffness: 300, damping: 24 } },
};

/* ─────────────────────────────────────────────────────────────
   NOTIFICATION CARD
───────────────────────────────────────────────────────────── */

function NotifCard({ notif }: { notif: Notification }) {
  const accent =
    notif.type === "success" ? "bg-emerald-400"
    : notif.type === "warning" ? "bg-amber-400"
    : "bg-sky-400";

  return (
    <motion.div
      variants={fadeSlide}
      whileHover={{ x: 3 }}
      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
    >
      {/* Dot */}
      <div className="mt-1.5 shrink-0">
        <span className={`block h-2 w-2 rounded-full ${accent} ${notif.unread ? "shadow-[0_0_6px_2px] shadow-current opacity-90" : "opacity-30"}`} />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${notif.unread ? "text-white" : "text-white/50"}`}>
          {notif.title}
        </p>
        <p className="text-xs text-white/35 mt-0.5 truncate">{notif.desc}</p>
      </div>

      <span className="shrink-0 text-[10px] text-white/25 mt-0.5 tabular-nums">{notif.time}</span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────────────────────────── */

export default function Navbar() {
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [notifOpen,   setNotifOpen]   = useState(false);
  const [activeMenu,  setActiveMenu]  = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);

  const closeTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchId       = useId();

  /* ── Scroll-driven navbar glass ── */
  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, 80], [0, 1]);
  const bgOpacity      = useTransform(scrollProgress, [0, 1], [0, 0.82]);
  const borderOpacity  = useTransform(scrollProgress, [0, 1], [0, 1]);
  const blurValue      = useTransform(scrollProgress, [0, 1], [0, 22]);
  // Compose backdropFilter as a MotionValue string (correct approach)
  const backdropFilter = useMotionTemplate`blur(${blurValue}px) saturate(160%)`;
  const bgColor        = useMotionTemplate`rgba(4, 4, 6, ${bgOpacity})`;

  /* ── Unread count ── */
  const unreadCount = notifications.filter((n) => n.unread).length;

  /* ── Lock body scroll when any overlay is open ── */
  useEffect(() => {
    const locked = mobileOpen || searchOpen || notifOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen, notifOpen]);

  /* ── ESC closes everything ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setSearchOpen(false);
      setNotifOpen(false);
      setMobileOpen(false);
      setActiveMenu(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ── "/" to open search ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ── Focus search input when panel opens ── */
  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [searchOpen]);

  /* ── Mega menu handlers with debounce ── */
  const openMenu = useCallback((name: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveMenu(name);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  /* ── Mark all notifications read ── */
  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  /* ── Close all overlays ── */
  const closeAll = useCallback(() => {
    setSearchOpen(false);
    setNotifOpen(false);
    setMobileOpen(false);
    setActiveMenu(null);
  }, []);

  /* ─────────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────────── */
  return (
    <>
      {/* ══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <motion.nav
        style={{ backdropFilter, backgroundColor: bgColor }}
        className="fixed top-0 w-full z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Hairline border — fades in on scroll */}
        <motion.div
          style={{ opacity: borderOpacity }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
        />

        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label="YatriHub home"
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="relative">
              <FiCompass
                className="text-teal-400 text-2xl transition-transform duration-700 group-hover:rotate-[360deg]"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-teal-400/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="text-white font-semibold text-[17px] tracking-tight">
              Yatri<span className="text-teal-400">Hub</span>
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <div
            className="hidden lg:flex items-center gap-1"
            onMouseLeave={scheduleClose}
            role="menubar"
          >
            {NAV_ITEMS.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => openMenu(item.name)}
                role="none"
              >
                <button
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={activeMenu === item.name}
                  className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-150 ${
                    activeMenu === item.name
                      ? "text-white bg-white/8"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">

            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              aria-expanded={searchOpen}
              aria-controls={searchId}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150"
            >
              <FiSearch size={17} aria-hidden="true" />
            </button>

            {/* Notification bell */}
            <button
              onClick={() => { setNotifOpen(true); setMobileOpen(false); setSearchOpen(false); }}
              aria-label={`Notifications, ${unreadCount} unread`}
              aria-expanded={notifOpen}
              className="relative h-9 w-9 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-all duration-150"
            >
              <FiBell size={17} aria-hidden="true" />
              <AnimatePresence>
                {unreadCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-[#040406]"
                    aria-hidden="true"
                  />
                )}
              </AnimatePresence>
            </button>

            {/* Login CTA */}
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-[13px] font-semibold bg-white text-black hover:bg-teal-400 active:scale-95 transition-all duration-150 ml-1"
            >
              Sign in
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => { setMobileOpen((v) => !v); setSearchOpen(false); setNotifOpen(false); }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all duration-150"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <FiX size={18} aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <FiMenu size={18} aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════════
          MEGA MENU
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key={`mega-${activeMenu}`}
            variants={megaMenuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onMouseEnter={() => { cancelClose(); openMenu(activeMenu); }}
            onMouseLeave={scheduleClose}
            className="fixed top-16 inset-x-0 z-40"
            role="region"
            aria-label={`${activeMenu} submenu`}
          >
            {/* Glass panel */}
            <div className="bg-[#040406]/85 backdrop-blur-3xl border-b border-white/8 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
              {/* Ambient top glow */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

              <div className="max-w-[1100px] mx-auto px-8 py-10 grid grid-cols-3 gap-12">

                {/* Left: links */}
                <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-1">
                  <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.18em] mb-4">
                    {activeMenu}
                  </p>
                  {NAV_ITEMS.find((n) => n.name === activeMenu)?.children.map((sub) => (
                    <motion.div key={sub.name} variants={fadeSlide}>
                      <Link
                        href={sub.href}
                        onClick={closeAll}
                        className="group/link flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <span className="mt-0.5 text-teal-400/60 group-hover/link:text-teal-400 transition-colors shrink-0">
                          {sub.icon}
                        </span>
                        <div>
                          <p className="text-white/75 group-hover/link:text-white text-[13.5px] font-medium transition-colors">
                            {sub.name}
                          </p>
                          {sub.description && (
                            <p className="text-white/30 text-xs mt-0.5 leading-relaxed">{sub.description}</p>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Center: descriptor */}
                <div className="flex flex-col justify-center gap-4">
                  <p className="text-white/45 text-sm leading-relaxed">
                    AI-powered spatial travel OS — adapts to your preferences, intent, and real-time context across every touchpoint.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-teal-400/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                    Live data sync enabled
                  </div>
                </div>

                {/* Right: featured tile */}
                <motion.div
                  whileHover={{ scale: 1.025, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 p-5 cursor-pointer group/tile"
                >
                  {/* Gradient glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-sky-500/8 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                  <div className="relative">
                    <span className="text-[10px] font-semibold text-teal-400/70 uppercase tracking-widest">Featured</span>
                    <p className="text-white font-semibold mt-2 text-sm leading-snug">AI-Curated Journeys</p>
                    <p className="text-white/40 text-xs mt-1.5 leading-relaxed">
                      Premium itineraries crafted by our travel intelligence engine.
                    </p>
                    <Link
                      href={{ pathname: "/explore", query: { category: activeMenu, source: "mega-menu" } }}
                      onClick={closeAll}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-white/50 hover:text-white transition-colors group-hover/tile:text-teal-400"
                    >
                      Explore now
                      <FiChevronRight size={12} className="transition-transform group-hover/tile:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          SEARCH OVERLAY
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="search-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-xl"
              aria-hidden="true"
            />

            {/* Search panel */}
            <motion.div
              key="search-panel"
              id={searchId}
              variants={searchVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Search"
              className="fixed z-[90] top-[16%] left-1/2 -translate-x-1/2 w-[92%] max-w-lg"
            >
              <div className="relative rounded-2xl bg-[#0c0c10]/90 backdrop-blur-3xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.7)] overflow-hidden">
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />

                {/* Input row */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
                  <FiSearch className="text-white/30 shrink-0" size={16} aria-hidden="true" />
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations, rooms, food…"
                    aria-label="Search"
                    className="flex-1 bg-transparent text-white text-sm placeholder:text-white/25 outline-none"
                  />
                  {searchQuery ? (
                    <button
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                      className="text-white/30 hover:text-white transition"
                    >
                      <FiX size={14} />
                    </button>
                  ) : (
                    <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] text-white/20 border border-white/10 font-mono">
                      ESC
                    </kbd>
                  )}
                </div>

                {/* Suggestions */}
                <div className="px-3 py-3 space-y-0.5">
                  <p className="px-3 py-1 text-[10px] font-semibold text-white/25 uppercase tracking-widest">
                    Quick searches
                  </p>
                  {[
                    { emoji: "🏨", text: "Luxury suites in Nagpur" },
                    { emoji: "✈️", text: "Cheapest flights today" },
                    { emoji: "🍽️", text: "Top-rated food near me" },
                    { emoji: "🚖", text: "Book a cab right now"   },
                  ].map(({ emoji, text }) => (
                    <button
                      key={text}
                      onClick={() => { setSearchQuery(text); searchInputRef.current?.focus(); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all text-left"
                    >
                      <span className="text-base leading-none">{emoji}</span>
                      <span>{text}</span>
                    </button>
                  ))}
                </div>

                {/* Footer hint */}
                <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-white/20">Powered by YatriHub AI</span>
                  <div className="flex items-center gap-3 text-[11px] text-white/20">
                    <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                    <span><kbd className="font-mono">↵</kbd> open</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          NOTIFICATIONS DRAWER
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {notifOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="notif-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setNotifOpen(false)}
              className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.aside
              key="notif-panel"
              variants={drawerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Notifications"
              className="fixed right-0 top-0 h-full w-[360px] max-w-[95vw] z-[90] flex flex-col bg-[#060608]/95 backdrop-blur-3xl border-l border-white/8 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            >
              {/* Accent line */}
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-teal-500/30 via-transparent to-transparent" />

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-white text-sm font-semibold">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold bg-teal-500/15 text-teal-400 border border-teal-500/25 px-2 py-0.5 rounded-full tabular-nums">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-teal-400/60 hover:text-teal-400 transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setNotifOpen(false)}
                    aria-label="Close notifications"
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
                  >
                    <FiX size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* List */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto overscroll-contain px-2 py-2"
              >
                {notifications.map((notif) => (
                  <NotifCard key={notif.id} notif={notif} />
                ))}
              </motion.div>

              {/* Footer CTA */}
              <div className="shrink-0 px-5 py-4 border-t border-white/8">
                <Link
                  href="/notifications"
                  onClick={() => setNotifOpen(false)}
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
                >
                  View all activity
                  <FiChevronRight size={14} />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          MOBILE MENU (full slide-in panel)
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md lg:hidden"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              key="mobile-panel"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed left-0 top-0 h-full w-[300px] max-w-[85vw] z-[80] flex flex-col bg-[#060608]/97 backdrop-blur-3xl border-r border-white/8 lg:hidden"
            >
              {/* Accent */}
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-teal-500/20 via-transparent to-transparent" />

              {/* Header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/8 shrink-0">
                <div className="flex items-center gap-2">
                  <FiCompass className="text-teal-400 text-xl" aria-hidden="true" />
                  <span className="text-white font-semibold text-[16px]">
                    Yatri<span className="text-teal-400">Hub</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="h-8 w-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 rounded-lg transition-all"
                >
                  <FiX size={16} aria-hidden="true" />
                </button>
              </div>

              {/* Nav links */}
              <motion.nav
                variants={stagger}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto px-3 py-4 space-y-1"
                aria-label="Mobile navigation links"
              >
                {NAV_ITEMS.map((section) => (
                  <motion.div key={section.name} variants={fadeSlide}>
                    <p className="px-3 pt-3 pb-1.5 text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em]">
                      {section.name}
                    </p>
                    {section.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={closeAll}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] text-white/55 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <span className="text-teal-400/50 shrink-0">{child.icon}</span>
                        {child.name}
                      </Link>
                    ))}
                  </motion.div>
                ))}
              </motion.nav>

              {/* Footer */}
              <div className="shrink-0 px-4 py-5 border-t border-white/8 space-y-2">
                {/* Mobile search */}
                <button
                  onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white/40 text-sm hover:bg-white/8 transition-all"
                >
                  <FiSearch size={14} aria-hidden="true" />
                  <span>Search anything…</span>
                  <kbd className="ml-auto text-[10px] text-white/20 font-mono border border-white/10 px-1.5 rounded">/</kbd>
                </button>
                {/* Sign in */}
                <Link
                  href="/login"
                  onClick={closeAll}
                  className="flex items-center justify-center w-full py-3 rounded-xl bg-white text-black text-[13px] font-semibold hover:bg-teal-400 active:scale-[0.98] transition-all"
                >
                  Sign in to YatriHub
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}