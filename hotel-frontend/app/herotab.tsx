'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FiSearch, FiMapPin, FiCalendar, FiUsers, FiNavigation } from "react-icons/fi";
import { IconType } from "react-icons";

// ---------------- TYPES ----------------
type TabType = "Hotels" | "Flights" | "Experiences" | "Dining";

type SearchState = {
  location: string;
  checkIn: string;
  checkOut: string;
  from: string;
  to: string;
  date: string;
  guests: string;
};

type AdvancedInputProps = {
  icon: React.ReactNode;
  label: string;
  placeholder?: string;
  type?: string;
};

// ---------------- CONFIG ----------------
const TABS: { id: TabType; icon: React.ReactNode }[] = [
  { id: "Hotels", icon: <FiMapPin /> },
  { id: "Flights", icon: <FiNavigation /> },
  { id: "Experiences", icon: <FiCalendar /> },
  { id: "Dining", icon: <FiUsers /> },
];

// ---------------- MAIN ----------------
export default function FAANGHero() {
  const [activeTab, setActiveTab] = useState<TabType>("Hotels");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const [search, setSearch] = useState<SearchState>({
    location: "",
    checkIn: "",
    checkOut: "",
    from: "",
    to: "",
    date: "",
    guests: ""
  });

  const handleSearch = () => {
  setLoading(true);

  setTimeout(() => {
    setLoading(false);

    // Redirect to new page
    router.push("/search");
  }, 1000);
};

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-20 px-6 bg-[#050505] overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full opacity-50" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Next-Gen Ecosystem
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent"
        >
          Travel reimagined.
        </motion.h1>

        {/* TABS */}
        <LayoutGroup>
          <div className="flex justify-center items-center gap-2 md:gap-4 mb-8 p-1.5 bg-white/[0.03] border border-white/10 rounded-full w-fit mx-auto backdrop-blur-md">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden md:block">{tab.id}</span>

                {activeTab === tab.id && (
                  <motion.div
                    layoutId="pill"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <motion.div
            layout
            className="w-full max-w-5xl mx-auto p-2 bg-[#111111]/80 border border-white/10 rounded-[2rem] backdrop-blur-2xl shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">

              {/* INPUTS */}
              <div className="md:col-span-9 p-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-2"
                  >

                    {activeTab === "Hotels" && (
                      <>
                        <AdvancedInput icon={<FiMapPin />} label="Where to?" placeholder="Search destinations" />
                        <AdvancedInput icon={<FiCalendar />} label="Check-in" type="date" />
                        <AdvancedInput icon={<FiUsers />} label="Guests" placeholder="Add guests" />
                      </>
                    )}

                    {activeTab === "Flights" && (
                      <>
                        <AdvancedInput icon={<FiNavigation />} label="From" placeholder="Origin city" />
                        <AdvancedInput icon={<FiNavigation className="rotate-90" />} label="To" placeholder="Destination" />
                        <AdvancedInput icon={<FiCalendar />} label="Date" type="date" />
                      </>
                    )}

                    {["Experiences", "Dining"].includes(activeTab) && (
                      <>
                        <AdvancedInput icon={<FiMapPin />} label="Location" placeholder="Near you" />
                        <AdvancedInput icon={<FiCalendar />} label="When?" type="date" />
                        <AdvancedInput icon={<FiUsers />} label="People" placeholder="Number of guests" />
                      </>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* BUTTON */}
              <div className="md:col-span-3 p-2">
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="group relative w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold overflow-hidden transition-all active:scale-95 disabled:opacity-70"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />

                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <FiSearch className="text-lg" />
                        <span>Search</span>
                      </>
                    )}
                  </span>
                </button>
              </div>

            </div>
          </motion.div>
        </LayoutGroup>

        {/* TRUST */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-[11px] uppercase tracking-[0.2em] text-gray-600 font-bold">
          <span>Verified Stays</span>
          <span>Instant Booking</span>
          <span>24/7 Support</span>
        </div>

      </div>
    </section>
  );
}

// ---------------- INPUT ----------------
function AdvancedInput({ icon, label, placeholder, type = "text" }: AdvancedInputProps) {
  return (
    <div className="relative group flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.03] border border-transparent focus-within:border-indigo-500/50 focus-within:bg-white/[0.06] transition-all">
      <div className="text-gray-500 group-focus-within:text-indigo-400 transition-colors">
        {icon}
      </div>

      <div className="flex-1 text-left">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">{label}</p>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-gray-700"
        />
      </div>
    </div>
  );
}