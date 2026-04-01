"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaTrain, FaArrowRight } from "react-icons/fa";
import BookingFlow from "./components/BookingFlow";

// Define strict interfaces
interface Train {
  name: string;
  number: string;
  dep: string;
  arr: string;
  duration: string;
  seats: Record<string, number>;
  price: {
    Sleeper?: number;
    "3AC"?: number;
    "2AC"?: number;
  };
  rating: number;
  path: [number, number][];
}

const TrainMap = dynamic(() => import("./components/TrainMap"), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#0a0a0a] animate-pulse rounded-[3rem]" />
});

const STATION_COORDS: Record<string, [number, number]> = {
  "New Delhi": [28.6139, 77.2090], 
  "Mumbai Central": [19.076, 72.8777],
  "Jaipur": [26.9124, 75.7873], 
  "Agra Cantt": [27.1767, 78.0081]
};

export default function TrainResults() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedTrainIdx, setSelectedTrainIdx] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("Sleeper");
  const [isBooking, setIsBooking] = useState(false);

  const trains: Train[] = useMemo(() => [
    { 
      name: "Rajdhani Exp", number: "12345", dep: "06:00", arr: "12:00", duration: "6h", 
      seats: { "Sleeper": 20, "3AC": 10, "2AC": 5 }, 
      price: { "Sleeper": 450, "3AC": 1200, "2AC": 2200 }, 
      rating: 4.8, path: [[28.6139, 77.2090], [26.9124, 75.7873]] 
    },
    { 
      name: "Shatabdi Exp", number: "12001", dep: "07:30", arr: "13:30", duration: "6h", 
      seats: { "2AC": 5, "3AC": 15, "Sleeper": 0 }, 
      price: { "2AC": 2000, "3AC": 1500, "Sleeper": 600 }, 
      rating: 4.5, path: [[28.6139, 77.2090], [27.1767, 78.0081]] 
    },
  ], []);

  const routePath = useMemo(() => {
    if (STATION_COORDS[source] && STATION_COORDS[destination]) {
      return [STATION_COORDS[source], STATION_COORDS[destination]];
    }
    return [[20.5937, 78.9629] as [number, number]];
  }, [source, destination]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 font-sans">
      <AnimatePresence>
        {isBooking && selectedTrainIdx !== null && (
          <BookingFlow 
            train={trains[selectedTrainIdx]}
            source={source}
            destination={destination}
            selectedClass={selectedClass}
            onClose={() => setIsBooking(false)}
          />
        )}
      </AnimatePresence>

      <nav className="fixed top-0 w-full z-[1000] border-b border-white/5 backdrop-blur-md bg-black/40">
        <div className="flex justify-between items-center px-10 py-5 max-w-[1600px] mx-auto">
          <Link href="/" className="text-2xl font-bold">
            Hotel<span className="text-indigo-500">OS</span>
          </Link>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <span className="text-indigo-400">Search</span>
            <span className="hover:text-white cursor-pointer transition">Status</span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-10 pt-32 pb-10 grid lg:grid-cols-12 gap-10 h-screen">
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
          <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400"><FaTrain /></div>
              <h2 className="text-xl font-bold">Route Search</h2>
            </div>
            <div className="space-y-4">
              <div className="relative group">
                <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400" />
                <input
                  list="stations" placeholder="Origin" value={source} onChange={e => setSource(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 rounded-2xl py-5 pl-14 outline-none focus:border-indigo-500/50 transition"
                />
              </div>
              <div className="relative group">
                <FaArrowRight className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400" />
                <input
                  list="stations" placeholder="Destination" value={destination} onChange={e => setDestination(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 rounded-2xl py-5 pl-14 outline-none focus:border-indigo-500/50 transition"
                />
              </div>
              <datalist id="stations">{Object.keys(STATION_COORDS).map(s => <option key={s} value={s} />)}</datalist>
            </div>
          </section>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {source && destination && trains.map((train, idx) => (
              <motion.div
                key={train.number}
                layout
                onClick={() => { 
                    setSelectedTrainIdx(idx); 
                    setSelectedClass(Object.keys(train.price)[0]); 
                }}
                className={`p-6 rounded-[2.2rem] border cursor-pointer transition-all ${
                  selectedTrainIdx === idx ? 'bg-indigo-600 border-indigo-400' : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between mb-4">
                  <h3 className="font-bold text-lg">{train.name}</h3>
                  <div className="bg-black/20 px-3 py-1 rounded-full text-xs font-bold text-yellow-500 flex items-center gap-1"><FaStar /> {train.rating}</div>
                </div>
                <div className="flex items-center justify-between text-xl font-black">
                  <span>{train.dep}</span>
                  <div className="flex-1 h-[2px] mx-4 bg-white/10 relative">
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-indigo-400" />
                  </div>
                  <span>{train.arr}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 rounded-[3.5rem] overflow-hidden border border-white/10 relative bg-[#0a0a0a]">
          <TrainMap routePath={routePath} filteredTrains={source && destination ? trains : []} />
        </div>
      </main>

      <AnimatePresence>
        {selectedTrainIdx !== null && (
          <motion.div initial={{ y: 100, x: '-50%' }} animate={{ y: 0, x: '-50%' }} exit={{ y: 100, x: '-50%' }} className="fixed bottom-10 left-1/2 z-[1001] w-[90%] max-w-5xl">
            <div className="bg-white text-black p-4 pl-10 rounded-[3rem] flex items-center justify-between shadow-2xl">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Selected Price</p>
                <p className="text-2xl font-black italic">
                    {/* FIXED: The type assertion here solves the indexing error */}
                    ₹{trains[selectedTrainIdx].price[selectedClass as keyof typeof trains[0]['price']] || 'N/A'}
                </p>
              </div>
              <button onClick={() => setIsBooking(true)} className="bg-indigo-600 text-white px-10 py-5 rounded-[2.5rem] font-black uppercase tracking-tighter flex items-center gap-3 hover:bg-indigo-700 transition">
                Confirm Booking <FaArrowRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}