"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#000] text-white px-6 py-24 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <header className="mb-20">
          <h2 className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Availability Engine</h2>
          <h1 className="text-6xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
            Select <br /> <span className="text-gray-700">Environment.</span>
          </h1>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {loading ? (
              // Realistic Skeleton Loaders
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-[450px] bg-white/5 border border-white/5 rounded-[2.5rem] animate-pulse p-8">
                  <div className="w-full h-48 bg-white/5 rounded-3xl mb-6" />
                  <div className="w-2/3 h-6 bg-white/5 rounded-full mb-4" />
                  <div className="w-full h-4 bg-white/5 rounded-full mb-2" />
                  <div className="w-full h-4 bg-white/5 rounded-full" />
                </div>
              ))
            ) : (
              rooms.map((room, index) => (
                <RoomCard key={room.id} room={room} index={index} />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function RoomCard({ room, index }: { room: Room; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/50 transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={room.imageUrl || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80"} 
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
          ₹{room.price} <span className="text-gray-500">/ Cycle</span>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-3">{room.name}</h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-8 line-clamp-2 uppercase font-medium tracking-wider">
          {room.description}
        </p>
        
        <Link href={`/rooms/${room.id}`} className="group/btn relative block w-full text-center py-4 rounded-full border border-white/10 overflow-hidden transition-all">
          <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] group-hover/btn:text-black transition-colors">Access Details</span>
          <div className="absolute top-0 left-0 w-0 h-0 bg-white transition-all duration-500 ease-out group-hover/btn:w-full group-hover/btn:h-full z-0" />
        </Link>
      </div>
    </motion.div>
  );
}