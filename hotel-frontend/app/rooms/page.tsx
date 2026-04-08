"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

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
        setRooms(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased">
      <div className="max-w-[1400px] mx-auto px-6 py-12 lg:py-16">
        
        {/* Compact Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-2">
              Availability Hub
            </h2>
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter text-neutral-950">
              Select your <span className="text-neutral-400 font-normal">Environment</span>
            </h1>
          </div>
          <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-widest border-b border-neutral-100 pb-1">
            {rooms.length} Units Available
          </div>
        </header>

        {/* Dense Grid: Reduced Gap and Height */}
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {loading ? (
              [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/rooms/${room.id}`} className="block">
        {/* Aspect Video reduces vertical scroll significantly */}
        <div className="relative aspect-video overflow-hidden bg-neutral-100 rounded-lg mb-4">
          <img 
            src={room.imageUrl || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"} 
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Permanent Price Badge */}
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-bold text-white px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-md tracking-wider">
              ₹{room.price.toLocaleString()}
            </span>
          </div>

          {/* Reveal-on-Hover CTA: Center-aligned for visibility */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
               <span className="text-[10px] font-bold uppercase tracking-widest">View Details</span>
               <FaArrowRight className="text-[10px]" />
            </div>
          </div>
        </div>

        <div className="px-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-medium tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors">
              {room.name}
            </h3>
          </div>
          
          <p className="text-xs text-neutral-500 font-normal leading-relaxed line-clamp-1 tracking-tight">
            {room.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="space-y-4">
      <div className="aspect-video bg-neutral-50 animate-pulse rounded-lg" />
      <div className="space-y-2 px-1">
        <div className="h-4 w-1/2 bg-neutral-50 animate-pulse" />
        <div className="h-3 w-full bg-neutral-50 animate-pulse" />
      </div>
    </div>
  );
}