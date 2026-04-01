"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaStar, FaInfoCircle, FaShieldAlt } from "react-icons/fa";

interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export default function RoomDetailsPage() {
  const { id } = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

  /* ================= Logic Functions (Unchanged) ================= */

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:4000/rooms/${id}`)
      .then((res) => res.json())
      .then((data) => setRoom(data))
      .catch((err) => console.error("Room fetch error:", err));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:4000/bookings/room/${id}/unavailable-dates`)
      .then((res) => res.json())
      .then((data) => {
        const bookings = Array.isArray(data) ? data : data.bookings || data.unavailableDates || [];
        if (!Array.isArray(bookings)) return;
        const dates: Date[] = [];
        bookings.forEach((booking: any) => {
          const start = new Date(booking.checkIn);
          const end = new Date(booking.checkOut);
          for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
          }
        });
        setUnavailableDates(dates);
      })
      .catch((err) => console.error("Unavailable dates error:", err));
  }, [id]);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
  };

  const nights = calculateNights();
  const base = room ? nights * room.price : 0;
  const serviceFee = base * 0.1;
  const tax = base * 0.12;
  const total = base + serviceFee + tax;

  const handleBooking = async () => {
    if (!checkIn || !checkOut) return alert("Please select valid dates");
    if (nights <= 0) return alert("Checkout must be after check-in");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ roomId: id, checkIn, checkOut }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.checkoutUrl) { window.location.href = data.checkoutUrl; } 
      else { alert(data.message || "Booking failed"); }
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
    }
  };

  /* ================= Realistic UI State ================= */

  if (!room) return (
    <div className="min-h-screen bg-black text-indigo-500 flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      <span className="text-[10px] font-black uppercase tracking-[0.5em]">Syncing Environment...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#000] text-white relative selection:bg-indigo-500/30">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-12 gap-12 xl:gap-20">
        
        {/* LEFT: ROOM CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 space-y-12"
        >
          {/* Main Visual */}
          <div className="group relative rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
            <img 
              src={room.imageUrl || "https://images.unsplash.com/photo-1505691938895-1758d7feb511"} 
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" 
              alt={room.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-10 left-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="px-3 py-1 bg-indigo-500 text-white text-[8px] font-bold uppercase tracking-widest rounded-full">Premier Grade</div>
                <div className="flex items-center gap-1 text-yellow-500 text-xs">
                  <FaStar /><FaStar /><FaStar/><FaStar /><FaStar />
                  <span className="text-white/60 ml-2 font-mono">4.8</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">{room.name}</h1>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid md:grid-cols-2 gap-8 border-y border-white/5 py-12">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-4">Specification</h2>
              <p className="text-gray-400 leading-relaxed font-medium">{room.description}</p>
            </div>
            <div className="space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-4">Inclusions</h2>
              <ul className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <li className="flex items-center gap-2">/ High-Speed Mesh</li>
                <li className="flex items-center gap-2">/ Climate Control</li>
                <li className="flex items-center gap-2">/ 24/7 Concierge</li>
                <li className="flex items-center gap-2">/ Encrypted Access</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: BOOKING CONSOLE */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="sticky top-28 bg-[#0a0a0a] border border-white/10 p-10 rounded-[3rem] shadow-2xl backdrop-blur-xl">
            <div className="flex justify-between items-end mb-10">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Nightly Rate</p>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase">₹{room.price}</h2>
              </div>
              <FaShieldAlt className="text-2xl text-indigo-500/50 mb-1" />
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 ml-2">Check-in</label>
                  <input 
                    type="date" 
                    className="w-full bg-black/20 border border-black/15 rounded-2xl px-5 py-4 text-m font-bold focus:outline-none focus:border-indigo-500 transition invert"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400 ml-2">Check-out</label>
                  <input 
                    type="date" 
                    className="w-full bg-black/20 border border-black/15 rounded-2xl px-5 py-4 text-m font-bold focus:outline-none focus:border-indigo-500 transition invert"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              {nights > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4"
                >
                  <div className="flex justify-between text-xs font-bold text-gray-400">
                    <span>Base Fare ({nights} nights)</span>
                    <span className="text-white">₹{base.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-gray-400">
                    <span>Service Fee (10%)</span>
                    <span>₹{serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-gray-400">
                    <span>Platform Tax (12%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Total Calculation</span>
                    <span className="text-2xl font-black italic tracking-tighter">₹{total.toLocaleString()}</span>
                  </div>
                </motion.div>
              )}

              <button
                onClick={handleBooking}
                disabled={loading}
                className="group relative w-full overflow-hidden bg-white text-black py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-xl active:scale-[0.98] disabled:opacity-50"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {loading ? "Establishing Connection..." : "Initialize Booking"}
                </span>
                <div className="absolute top-0 left-0 w-0 h-0 bg-indigo-600 transition-all duration-500 ease-out group-hover:w-full group-hover:h-full z-0" />
              </button>

              <p className="text-[8px] text-center text-gray-600 font-bold uppercase tracking-[0.2em] mt-6 flex items-center justify-center gap-2">
                <FaInfoCircle /> Secure checkout powered by HotelOS Finance Hub
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}