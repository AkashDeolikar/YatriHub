// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import {
//   FiMenu,
//   FiX,
//   FiSearch,
//   FiBell,
//   FiChevronRight,
//   FiCompass,
// } from "react-icons/fi";

// export default function Navbar() {
//   const pathname = usePathname();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navItems = [
//     { name: "Rooms", href: "/rooms" },
//     { name: "Food", href: "/food" },
//     { name: "Travel", href: "/travel" },
//     { name: "Entertainment", href: "/entertainment" },
//     { name: "Dashboard", href: "/dashboard" },
//     { name: "Bookings", href: "/bookings" },
//     { name: "Discovery", href: "/discovery" },
//     { name: "AboutUs", href: "/about" },
//   ];

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav
//         className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
//           ? "bg-black/40 backdrop-blur-xl"
//           : "bg-transparent"
//           }`}
//       >
//         <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[64px]">

//           {/* LOGO */}
//           <Link href="/" className="group flex items-center gap-2.5 shrink-0"> <div className="relative"> 
//             <FiCompass className="text-teal-400 text-2xl group-hover:rotate-[360deg] transition-transform duration-1000 ease-expo" /> 
//             <div className="absolute inset-0 bg-teal-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> </div> 
//             <span className="text-xl font-bold text-white"> Yatri<span className="text-teal-400">Hub</span> </span> 
//           </Link>

//           {/* DESKTOP NAV */}
//           <div className="hidden lg:flex items-center gap-6">
//             {navItems.map((item) => {
//               const isActive = pathname === item.href;

//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="relative text-sm text-white/60 hover:text-white transition"
//                 >
//                   {item.name}

//                   {isActive && (
//                     <motion.div
//                       layoutId="nav-indicator"
//                       className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white/80 rounded-full"
//                     />
//                   )}
//                 </Link>
//               );
//             })}
//           </div>

//           {/* ACTIONS */}
//           <div className="flex items-center gap-4">
//             <button className="text-white/60 hover:text-white transition">
//               <FiSearch />
//             </button>

//             <button className="text-white/60 hover:text-white transition relative">
//               <FiBell />
//               <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white rounded-full" />
//             </button>

//             {/* LOGIN */}
//             <Link
//               href="/login"
//               className="hidden sm:inline-flex px-4 py-1.5 rounded-full text-sm text-black bg-white hover:bg-white/90 transition"
//             >
//               Login
//             </Link>

//             {/* MOBILE MENU BUTTON */}
//             <button
//               onClick={() => setMobileOpen(true)}
//               className="lg:hidden text-white"
//             >
//               <FiMenu size={20} />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE MENU (APPLE STYLE) */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black z-[100]"
//           >
//             <div className="p-6 flex justify-between items-center">
//               <span className="text-white text-sm">Menu</span>

//               <button onClick={() => setMobileOpen(false)}>
//                 <FiX className="text-white text-2xl" />
//               </button>
//             </div>

//             <div className="flex flex-col px-6 mt-10 space-y-6">
//               {navItems.map((item, i) => (
//                 <motion.div
//                   key={item.name}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.05 }}
//                 >
//                   <Link
//                     href={item.href}
//                     onClick={() => setMobileOpen(false)}
//                     className="flex items-center justify-between text-2xl text-white/80 hover:text-white transition"
//                   >
//                     {item.name}
//                     <FiChevronRight />
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>

//             {/* FOOT ACTION */}
//             <div className="absolute bottom-10 left-6 right-6">
//               <Link
//                 href="/login"
//                 className="block w-full text-center py-3 rounded-full bg-white text-black font-medium"
//               >
//                 Continue
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiBell,
  FiCompass,
} from "react-icons/fi";

/* =========================
   NAVBAR
========================= */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  /* ===== SCROLL GLASS ===== */
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 80], [0, 20]);
  const opacity = useTransform(scrollY, [0, 80], [0, 0.65]);

  /* ===== ESC HANDLER (FIXED SAFE CLOSE ORDER) ===== */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      setSearchOpen(false);
      setNotifOpen(false);
      setMobileOpen(false);
      setActiveMenu(null);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ===== MENU CONTROL ===== */
  const openMenu = (name: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveMenu(name);
  };

  const closeMenu = () => {
    closeTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, 120);
  };

  const navItems = [
    {
      name: "Rooms",
      children: [{ name: "Luxury Rooms", href: "/rooms" }],
    },
    {
      name: "Travel",
      children: [
        { name: "Flights", href: "/travel/flights" },
        { name: "Cabs", href: "/travel/cabs" },
        { name: "Trains", href: "/travel/trains" },
      ],
    },
    {
      name: "Explore",
      children: [
        { name: "Food", href: "/food" },
        { name: "Discovery", href: "/discovery" },
      ],
    },
    {
      name: "AboutUs",
      children: [
        { name: "AboutUs", href: "/about" },
      ],
    },
    
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        style={{
          backdropFilter: blur ? `blur(${blur}px)` : "none",
          backgroundColor: `rgba(0,0,0,${opacity})`,
        }}
        className="fixed top-0 w-full z-50 border-b border-white/10"
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <FiCompass className="text-indigo-400 text-2xl" />
            <span className="text-white font-semibold">
              Vision<span className="text-indigo-400">Hub</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div
            className="hidden lg:flex gap-10"
            onMouseLeave={closeMenu}
          >
            {navItems.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => openMenu(item.name)}
              >
                <span className="text-sm text-white/60 hover:text-white cursor-pointer">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT ACTIONS (FIXED LOGIN RESTORED) */}
          <div className="flex items-center gap-4">

            <button onClick={() => setSearchOpen(true)}>
              <FiSearch className="text-white/60 hover:text-white" />
            </button>

            <button onClick={() => setNotifOpen(true)} className="relative">
              <FiBell className="text-white/60 hover:text-white" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            </button>

            {/* LOGIN (RESTORED) */}
            <Link
              href="/login"
              className="px-4 py-1.5 bg-white text-black rounded-full text-sm font-medium hover:scale-[1.03] transition"
            >
              Login
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-white"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ================= MEGA MENU ================= */}
      <AnimatePresence>
        {activeMenu && (
          <>
            {/* BACKDROP (depth layer) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-[64px] inset-x-0 z-40"
              onMouseEnter={() => openMenu(activeMenu)}
              onMouseLeave={closeMenu}
            >
              {/* GLASS LAYER */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 28,
                }}
                className="
            relative
            bg-black/40 backdrop-blur-3xl
            border-b border-white/10
            shadow-2xl
          "
              >
                {/* ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40 pointer-events-none" />

                <div className="relative max-w-[1100px] mx-auto px-8 py-10 grid grid-cols-3 gap-10">

                  {/* LEFT: NAV GROUP */}
                  <div className="space-y-3">
                    <p className="text-xs text-white/40 uppercase tracking-widest">
                      {activeMenu}
                    </p>

                    {navItems
                      .find((n) => n.name === activeMenu)
                      ?.children.map((sub, i) => (
                        <motion.div
                          key={sub.name}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <Link
                            href={sub.href}
                            className="
                        block py-2 px-3 rounded-lg
                        text-white/70 hover:text-white
                        hover:bg-white/5 transition
                      "
                          >
                            {sub.name}
                          </Link>
                        </motion.div>
                      ))}
                  </div>

                  {/* CENTER: SYSTEM DESCRIPTION */}
                  <div className="flex flex-col justify-center">
                    <p className="text-white/60 text-sm leading-relaxed">
                      AI-powered spatial travel system that adapts to your intent,
                      preferences, and real-time context.
                    </p>
                  </div>

                  {/* RIGHT: FEATURE CARD (APPLE STYLE TILE) */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="
                relative overflow-hidden
                rounded-2xl
                bg-white/5 backdrop-blur-xl
                border border-white/10
                p-5
              "
                  >
                    {/* glow layer */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />

                    <div className="relative">
                      <p className="text-white font-medium mb-1">
                        Featured Experience
                      </p>
                      <p className="text-white/50 text-sm">
                        Premium curated journeys with AI optimization
                      </p>

                      <Link
                        href={{
                          pathname: "/search",
                          query: {
                            source: "mega-menu",
                            category: activeMenu,
                          },
                        }}
                        className="
    mt-4 inline-flex items-center gap-1
    text-xs text-white/50 hover:text-white
    transition cursor-pointer
  "
                      >
                        Tap to explore
                        <span className="transition group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= SEARCH (FIXED FOCUS + CENTERED) ================= */}
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* BACKDROP (iOS style blur layer) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-xl"
            />

            {/* SEARCH SHEET */}
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
              }}
              className="
          fixed z-[100]
          top-[18%] left-1/2 -translate-x-1/2
          w-[92%] max-w-xl
        "
            >
              {/* GLASS PANEL */}
              <div
                className="
            relative overflow-hidden
            rounded-3xl
            border border-white/10
            bg-white/5 backdrop-blur-3xl
            shadow-2xl
          "
              >
                {/* subtle glow layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />

                {/* INPUT */}
                <div className="relative p-5">
                  <input
                    autoFocus
                    placeholder="Search destinations, rooms, food..."
                    className="
                w-full bg-transparent
                outline-none text-white text-sm
                placeholder:text-white/30
              "
                  />
                </div>

                {/* SUGGESTIONS (Apple-style hint layer) */}
                <div className="px-5 pb-5 space-y-2 text-sm text-white/50">
                  <p className="hover:text-white transition cursor-pointer">
                    🔍 Luxury suites in Nagpur
                  </p>
                  <p className="hover:text-white transition cursor-pointer">
                    ✈️ Cheapest flights today
                  </p>
                  <p className="hover:text-white transition cursor-pointer">
                    🍽️ Food near me
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= NOTIFICATIONS (FIXED DRAWER) ================= */}
      <AnimatePresence>
        {notifOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNotifOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[90]"
            />

            {/* PANEL */}
            <motion.div
              initial={{ x: 420, opacity: 0.6, scale: 0.98 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 420, opacity: 0.6, scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 26,
              }}
              className="
          fixed right-0 top-0 h-full w-[380px]
          z-[100]
          bg-gradient-to-b from-white/10 via-black/40 to-black/60
          backdrop-blur-3xl
          border-l border-white/10
          shadow-2xl
        "
            >
              {/* HEADER */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <h2 className="text-white text-sm font-medium tracking-wide">
                  Notifications
                </h2>

                <button
                  onClick={() => setNotifOpen(false)}
                  className="text-white/60 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">

                <NotifCard
                  title="Booking confirmed"
                  desc="Your Luxury Suite is reserved"
                  type="success"
                />

                <NotifCard
                  title="Price drop"
                  desc="Flights to Mumbai reduced by 18%"
                  type="warning"
                />

                <NotifCard
                  title="System update"
                  desc="New AI travel assistant enabled"
                  type="info"
                />

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= OVERLAY SYSTEM ================= */}
      <AnimatePresence>
        {(searchOpen || mobileOpen) && (
          <Overlay
            onClose={() => {
              setSearchOpen(false);
              setMobileOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function NotifCard({
  title,
  desc,
  type,
}: {
  title: string;
  desc: string;
  type: "success" | "warning" | "info";
}) {
  const glow =
    type === "success"
      ? "from-green-400/20"
      : type === "warning"
        ? "from-yellow-400/20"
        : "from-indigo-400/20";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`
        relative overflow-hidden
        p-4 rounded-2xl
        border border-white/10
        bg-white/5 backdrop-blur-xl
      `}
    >
      {/* subtle glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${glow} to-transparent opacity-30`}
      />

      <div className="relative">
        <p className="text-white text-sm font-medium">{title}</p>
        <p className="text-white/50 text-xs mt-1">{desc}</p>
      </div>
    </motion.div>
  );
}
/* =========================
   OVERLAY (APPLE GLASS BACKDROP)
========================= */
function Overlay({
  children,
  onClose,
}: {
  children?: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90] flex items-center justify-center"
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </motion.div>
  );
}