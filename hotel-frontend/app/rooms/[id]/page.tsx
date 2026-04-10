"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaShieldAlt, FaWifi, FaSnowflake, FaClock, FaLock } from "react-icons/fa";
import { format, addDays } from "date-fns";
import Navbar from "@/app/navbar";

export default function MinimalistRoomPage() {
  const { id } = useParams();
  const [room, setRoom] = useState<any>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/rooms/${id}`)
      .then(res => res.json())
      .then(data => {
        setRoom(data);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [id]);

  const { nights, base, total } = useMemo(() => {
    if (!checkIn || !checkOut || !room) return { nights: 0, base: 0, total: 0 };
    const diff = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
    const n = diff > 0 ? diff : 0;
    const b = n * room.price;
    return { nights: n, base: b, total: b + (b * 0.15) }; // 15% combined fee
  }, [checkIn, checkOut, room]);

  if (fetching) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-100 font-sans antialiased">
      <Navbar/>
      <main className="max-w-6xl mx-auto px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-20">
          
          {/* LEFT: CONTENT */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <nav className="flex gap-4 mb-12 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">
                <span className="text-neutral-900 underline underline-offset-8">Details</span>
                <span>Location</span>
                <span>Reviews</span>
              </nav>

              <h1 className="text-5xl md:text-6xl font-medium tracking-tighter text-neutral-950 mb-6">
                {room?.name}
              </h1>

              <div className="aspect-[16/10] rounded-lg overflow-hidden bg-neutral-100 mb-12">
                <img 
                  src={room?.imageUrl || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"} 
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" 
                  alt={room?.name}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-12 border-t border-neutral-100 pt-12">
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-black mb-4 text-neutral-400">The Space</h3>
                  <p className="text-neutral-600 leading-relaxed font-light text-lg">
                    {room?.description}
                  </p>
                </div>
                <div className="space-y-6">
                    <h3 className="text-[11px] uppercase tracking-[0.2em] font-black mb-4 text-neutral-400">Features</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <MinimalAmenity icon={<FaWifi />} label="Complimentary Fiber" />
                        <MinimalAmenity icon={<FaSnowflake />} label="Climate Control" />
                        <MinimalAmenity icon={<FaClock />} label="24-Hour Access" />
                    </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: BOOKING */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-20">
              <div className="mb-10">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 mb-1">Price per night</p>
                <h2 className="text-4xl font-light tracking-tighter">₹{room?.price.toLocaleString()}</h2>
              </div>

              <div className="space-y-1">
                <div className="border border-neutral-200 rounded-sm">
                  <div className="grid grid-cols-2">
                    <div className="p-4 border-r border-neutral-200">
                      <label className="block text-[9px] uppercase font-bold text-neutral-400 mb-1">Check In</label>
                      <input 
                        type="date" 
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full outline-none text-sm font-medium bg-transparent" 
                      />
                    </div>
                    <div className="p-4">
                      <label className="block text-[9px] uppercase font-bold text-neutral-400 mb-1">Check Out</label>
                      <input 
                        type="date" 
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full outline-none text-sm font-medium bg-transparent" 
                      />
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {nights > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-6 space-y-3"
                    >
                      <div className="flex justify-between text-xs text-neutral-500">
                        <span>Stay Duration ({nights} nights)</span>
                        <span>₹{base.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-neutral-500">
                        <span>Service & Tax</span>
                        <span>₹{(base * 0.15).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-lg font-medium pt-4 border-t border-neutral-100 text-neutral-950">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  disabled={!checkIn || !checkOut || loading}
                  className="w-full bg-neutral-950 text-white mt-8 py-5 rounded-sm text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-neutral-800 transition-colors disabled:bg-neutral-200 disabled:text-neutral-400"
                >
                  {loading ? "Processing..." : "Reserve Suite"}
                </button>

                <div className="flex flex-col items-center gap-2 mt-8 opacity-40">
                    <FaShieldAlt className="text-xs" />
                    <span className="text-[8px] uppercase tracking-widest font-bold">Secure checkout interface</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MinimalAmenity({ icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-4 text-neutral-500 hover:text-neutral-900 transition-colors cursor-default">
      <span className="text-xs">{icon}</span>
      <span className="text-xs font-medium tracking-tight">{label}</span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="w-8 h-[1px] bg-neutral-200 overflow-hidden relative">
        <div className="w-1/2 h-full bg-neutral-950 absolute animate-[loading_1.5s_infinite]" />
      </div>
      <style jsx>{`
        @keyframes loading {
          0% { left: -50%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}