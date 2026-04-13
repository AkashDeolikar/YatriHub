'use client';

import {
  motion,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import {
  FiServer,
  FiTerminal,
  FiCpu,
  FiGlobe,
  FiZap,
  FiActivity,
} from "react-icons/fi";

/* =========================
   🔹 MAIN COMPONENT
========================= */
export default function RegistryConsole({
  view,
  foodItems,
  toggleAvailability,
  addToCart,
}) {
const [logs, setLogs] = useState([]);

/* =========================
   ⚡ SYSTEM ENGINE
========================= */
const pushLog = (msg) => {
  setLogs((prev) => [
    { msg, ts: Date.now() },
    ...prev.slice(0, 40),
  ]);
};

  // 🔄 Auto system activity
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.floor(Math.random() * foodItems.length);
      pushLog(`Health check ping → node_${id}`);
    }, 3000);

    return () => clearInterval(interval);
  }, [foodItems]);

  /* =========================
     📊 METRICS (OPTIMIZED)
  ========================= */
  const systemMetrics = useMemo(
    () => [
      { label: "Throughput", value: "1.2k/s", trend: "+12%", icon: <FiActivity /> },
      { label: "Uptime", value: "99.99%", trend: "Stable", icon: <FiGlobe /> },
      { label: "Compute", value: "14.2%", trend: "Optimal", icon: <FiCpu /> },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-[#030303] text-zinc-400">
      <div className="max-w-[1600px] mx-auto px-6 py-10 space-y-10">

        {/* =========================
           🔥 HEADER
        ========================= */}
        <header className="relative p-8 rounded-[2.5rem] bg-zinc-900/10 border border-white/[0.05] overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition duration-700" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-teal-500 text-xs uppercase tracking-widest">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <FiServer />
                </motion.div>
                Infrastructure.v5
              </div>

              <h1 className="text-5xl font-bold text-white mt-2">
                Registry Console
              </h1>

              <p className="text-sm text-zinc-500 mt-2">
                ap-south-1 • latency 12ms • distributed system
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              {systemMetrics.map((m, i) => (
                <QuickStat key={i} {...m} />
              ))}
            </div>
          </div>
        </header>

        {/* =========================
           🔄 VIEW SWITCH
        ========================= */}
        <LayoutGroup>
          <AnimatePresence mode="wait">
            {view === "user" ? (
              <motion.div
                key="guest"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {foodItems.map((item) => (
                  <GuestCard key={item.id} item={item} onAdd={addToCart} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="admin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid lg:grid-cols-12 gap-8"
              >
                {/* NODES */}
                <div className="lg:col-span-8 space-y-4">
                  {foodItems.map((item) => (
                    <AdminNodeCard
                      key={item.id}
                      item={item}
                      onToggle={() => {
                        toggleAvailability(item.id);
                        pushLog(
                          item.isAvailable
                            ? `Node ${item.id} shutdown`
                            : `Node ${item.id} initialized`
                        );
                      }}
                    />
                  ))}
                </div>

                {/* TERMINAL */}
                <div className="lg:col-span-4 sticky top-10">
                  <Terminal logs={logs} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </main>
  );
}

/* =========================
   🧩 GUEST CARD
========================= */
function GuestCard({ item, onAdd }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex gap-5 bg-zinc-900/20 border border-white/[0.05] p-5 rounded-3xl"
    >
      <img
        src={item.image}
        className={`h-28 w-28 rounded-xl object-cover ${
          !item.isAvailable && "opacity-30 grayscale"
        }`}
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{item.name}</h3>
          <p className="text-xs text-zinc-500">ID: 0x{item.id}</p>
        </div>

        <button
          onClick={() => onAdd(item)}
          disabled={!item.isAvailable}
          className="mt-3 py-2 rounded-xl bg-white/10 hover:bg-white text-xs font-bold text-white hover:text-black transition"
        >
          Add
        </button>
      </div>
    </motion.div>
  );
}

/* =========================
   🧩 ADMIN NODE
========================= */
function AdminNodeCard({ item, onToggle }) {
  return (
    <motion.div
      layout
      className="flex items-center gap-5 p-4 rounded-3xl bg-zinc-900/10 border border-white/[0.05]"
    >
      <img src={item.image} className="h-14 w-14 rounded-xl" />

      <div className="flex-1">
        <h4 className="text-white">{item.name}</h4>
        <p className="text-xs text-zinc-600">Node_{item.id}</p>
      </div>

      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-xl text-xs font-bold ${
          item.isAvailable
            ? "bg-zinc-800 text-zinc-400"
            : "bg-white text-black"
        }`}
      >
        {item.isAvailable ? "Shutdown" : "Start"}
      </button>
    </motion.div>
  );
}

/* =========================
   💻 TERMINAL
========================= */
function Terminal({ logs }) {
  return (
    <div className="bg-black border border-white/10 rounded-3xl h-[600px] flex flex-col">

      <div className="p-4 border-b border-white/10 flex items-center gap-2 text-xs text-zinc-500">
        <FiTerminal /> Telemetry.log
      </div>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto font-mono text-xs">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ➜ {log.msg}
          </motion.div>
        ))}
      </div>

      <div className="p-4 text-xs text-teal-500 flex items-center gap-2">
        <FiZap /> System Active
      </div>
    </div>
  );
}

/* =========================
   📊 QUICK STAT
========================= */
function QuickStat({ label, value, trend, icon }) {
  return (
    <div className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-3">
      <div className="text-teal-500">{icon}</div>
      <div>
        <p className="text-[10px] text-zinc-600 uppercase">{label}</p>
        <div className="flex gap-2 items-center">
          <span className="text-white font-bold">{value}</span>
          <span className="text-teal-500 text-xs">{trend}</span>
        </div>
      </div>
    </div>
  );
}