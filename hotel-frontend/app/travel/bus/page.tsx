"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, Globe, ChevronRight, Terminal, ShieldCheck, 
  Zap, Activity, ArrowLeft, Users, Calendar, MapPin
} from "lucide-react";

// --- Types ---
type Step = "SEARCH" | "FLEET" | "SEATS" | "DEPLOY";

interface Bus {
  id: string;
  name: string;
  type: string;
  price: number;
  origin: string;
  destination: string;
  eta: string;
  totalSeats: number;
  availableSeats: number[];
}

// --- Mock Data ---
const MOCK_FLEET: Bus[] = [
  { id: "node-88", name: "NEETA_TERMINAL_PRO", type: "AC_SLEEPER_XL", price: 1200, origin: "MUMBAI", destination: "GOA", eta: "08h 00m", totalSeats: 30, availableSeats: [1, 2, 5, 8, 12, 15, 20] },
  { id: "node-01", name: "STAR_LINK_CORE", type: "EXEC_NON_STOP", price: 950, origin: "MUMBAI", destination: "PUNE", eta: "03h 30m", totalSeats: 40, availableSeats: [10, 11, 14, 25] },
];

export default function BusBookingPage() {
  const [step, setStep] = useState<Step>("SEARCH");
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const transitionTo = (nextStep: Step) => {
    setIsProcessing(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsProcessing(false);
    }, 600);
  };

  const toggleSeat = (seatId: number) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-mono selection:bg-pink-500/30">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="relative max-w-5xl mx-auto px-6 py-12">
        <header className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase">Protocol: YATRI_v4.2</span>
            </div>
            <h1 className="text-3xl font-black tracking-tighter">
              YATRI<span className="text-pink-500"> HUB</span>
            </h1>
          </div>
          
          <div className="flex gap-2">
            {["SEARCH", "FLEET", "SEATS", "DEPLOY"].map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className={`h-1 w-16 rounded-full transition-colors duration-500 ${
                  ["SEARCH", "FLEET", "SEATS", "DEPLOY"].indexOf(step) >= i ? "bg-pink-500" : "bg-zinc-800"
                }`} />
                <span className="text-[8px] text-zinc-600">{s}</span>
              </div>
            ))}
          </div>
        </header>

        <main className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <LoadingState key="loading" />
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* STEP 1: SEARCH */}
                {step === "SEARCH" && (
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <SearchInput label="SOURCE_NODE" placeholder="MUMBAI" icon={<MapPin size={16}/>} />
                      <SearchInput label="TARGET_NODE" placeholder="GOA" icon={<Globe size={16}/>} />
                      <SearchInput label="DEPARTURE_TIMESTAMP" placeholder="2024-05-20" icon={<Calendar size={16}/>} />
                    </div>
                    <button 
                      onClick={() => transitionTo("FLEET")}
                      className="w-full group flex items-center justify-center gap-3 bg-pink-600 text-white font-bold py-5 rounded-lg hover:bg-pink-500 shadow-lg shadow-pink-500/20 transition-all"
                    >
                      SCAN AVAILABLE CARRIERS <ChevronRight size={20}/>
                    </button>
                  </div>
                )}

                {/* STEP 2: FLEET SELECTION */}
                {step === "FLEET" && (
                  <div className="space-y-4">
                    <button onClick={() => setStep("SEARCH")} className="flex items-center gap-2 text-zinc-500 hover:text-white text-xs mb-4">
                      <ArrowLeft size={14}/> RE-INITIALIZE SEARCH
                    </button>
                    <div className="grid gap-4">
                      {MOCK_FLEET.map(bus => (
                        <BusRow key={bus.id} bus={bus} onSelect={(b) => { setSelectedBus(b); transitionTo("SEATS"); }} />
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: SEAT CONFIGURATION */}
                {step === "SEATS" && selectedBus && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                       <button onClick={() => setStep("FLEET")} className="flex items-center gap-2 text-zinc-500 hover:text-white text-xs">
                        <ArrowLeft size={14}/> RETURN TO FLEET
                      </button>
                      <h3 className="text-xl font-bold border-l-4 border-pink-500 pl-4">SELECT_RESOURCE_NODES</h3>
                      <div className="grid grid-cols-4 gap-3 bg-zinc-900/40 p-6 rounded-2xl border border-white/5">
                        {Array.from({ length: selectedBus.totalSeats }).map((_, i) => {
                          const seatNum = i + 1;
                          const isAvailable = selectedBus.availableSeats.includes(seatNum);
                          const isSelected = selectedSeats.includes(seatNum);
                          return (
                            <button
                              key={seatNum}
                              disabled={!isAvailable}
                              onClick={() => toggleSeat(seatNum)}
                              className={`h-10 rounded-md text-[10px] font-bold transition-all ${
                                isSelected ? "bg-pink-500 text-white" : 
                                isAvailable ? "bg-zinc-800 text-zinc-400 hover:border-pink-500/50 border border-transparent" : 
                                "bg-zinc-950 text-zinc-800 cursor-not-allowed opacity-30"
                              }`}
                            >
                              {seatNum < 10 ? `0${seatNum}` : seatNum}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500 text-xs">SELECTED_UNITS:</span>
                          <span className="text-white font-bold">{selectedSeats.length > 0 ? selectedSeats.join(", ") : "NONE"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500 text-xs">TOTAL_CREDITS:</span>
                          <span className="text-2xl font-black text-pink-500">₹{selectedSeats.length * selectedBus.price}</span>
                        </div>
                      </div>
                      <button 
                        disabled={selectedSeats.length === 0}
                        onClick={() => transitionTo("DEPLOY")}
                        className="w-full mt-8 bg-white text-black font-bold py-4 rounded hover:bg-green-500 hover:text-white transition-all disabled:opacity-20"
                      >
                        EXECUTE DEPLOYMENT
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: SUCCESS */}
                {step === "DEPLOY" && selectedBus && (
                  <SuccessState bus={selectedBus} seats={selectedSeats} onReset={() => {
                    setStep("SEARCH");
                    setSelectedSeats([]);
                  }} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// --- Specialized Components ---

function SearchInput({ label, placeholder, icon }: { label: string, placeholder: string, icon: React.ReactNode }) {
  return (
    <div className="group space-y-2">
      <label className="text-[9px] text-zinc-600 tracking-widest group-focus-within:text-pink-500 transition-colors uppercase">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">{icon}</div>
        <input 
          type="text" 
          placeholder={placeholder}
          className="w-full bg-zinc-900/80 border border-white/5 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all placeholder:text-zinc-700"
        />
      </div>
    </div>
  );
}

function BusRow({ bus, onSelect }: { bus: Bus, onSelect: (b: Bus) => void }) {
  return (
    <div 
      onClick={() => onSelect(bus)}
      className="group cursor-pointer p-6 bg-zinc-900/30 border border-white/5 rounded-xl flex items-center justify-between hover:bg-white/[0.02] hover:border-pink-500/50 transition-all"
    >
      <div className="flex items-center gap-6">
        <div className="h-14 w-14 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-pink-500/10 group-hover:text-pink-500 transition-all">
          <Cpu size={28} />
        </div>
        <div>
          <div className="font-bold text-lg text-white tracking-tight">{bus.name}</div>
          <div className="flex gap-3 text-[10px] text-zinc-500 uppercase mt-1">
            <span className="flex items-center gap-1"><Users size={10}/> {bus.availableSeats.length} SEATS LEFT</span>
            <span>•</span>
            <span>{bus.type}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[10px] text-zinc-500 uppercase">STARTING_FROM</div>
        <div className="text-xl font-black text-white">₹{bus.price}</div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 space-y-6">
      <Zap size={40} className="text-pink-500 animate-bounce" />
      <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-pink-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Compiling Manifest...</div>
    </div>
  );
}

function SuccessState({ bus, seats, onReset }: { bus: Bus, seats: number[], onReset: () => void }) {
  return (
    <div className="max-w-md mx-auto text-center space-y-8 py-10">
      <div className="relative inline-block">
        <div className="p-5 rounded-full bg-green-500/20 border border-green-500/40 text-green-500 relative z-10">
          <ShieldCheck size={56} />
        </div>
        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Tickets Provisioned</h2>
        <p className="text-zinc-500 text-sm italic">Transmission successful. Your seats are now locked in the ledger.</p>
      </div>
      <div className="bg-zinc-900/90 border-t-2 border-pink-500 p-8 rounded-b-xl text-left font-mono text-[11px] space-y-3 shadow-2xl">
        <div className="flex justify-between"><span className="text-zinc-500">CARRIER:</span> <span className="text-white">{bus.name}</span></div>
        <div className="flex justify-between"><span className="text-zinc-500">NODES:</span> <span className="text-pink-500 font-bold">{seats.join(", ")}</span></div>
        <div className="flex justify-between"><span className="text-zinc-500">ROUTE:</span> <span className="text-white">{bus.origin} &gt;&gt; {bus.destination}</span></div>
        <div className="pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-zinc-600">AUTH_TOKEN:</span>
            <span className="text-[9px] bg-zinc-800 px-2 py-1 rounded text-zinc-400">YTR-{Math.random().toString(36).substring(7).toUpperCase()}</span>
        </div>
      </div>
      <button onClick={onReset} className="block w-full py-4 border border-white/10 text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest">
        DASHBOARD_RESET
      </button>
    </div>
  );
}