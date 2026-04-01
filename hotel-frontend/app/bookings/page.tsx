"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaFingerprint, FaArrowUpRightFromSquare, FaCircle, FaInbox, FaCheckDouble, FaXmark } from "react-icons/fa6";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"CONFIRMED" | "PENDING" | "CANCELLED">("CONFIRMED");

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("http://localhost:4000/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : data.bookings || []);
    } catch (err) {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter logic for the tabs
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => b.status === activeTab);
  }, [bookings, activeTab]);

  const cancelBooking = async (id: string) => {
    if (!confirm("CANCEL RESERVATION?")) return;
    setCanceling(id);
    try {
      await fetch(`http://localhost:4000/bookings/cancel/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchBookings();
    } finally {
      setCanceling(null);
    }
  };

  const tabs = [
    { id: "CONFIRMED", label: "Active", icon: <FaCheckDouble /> },
    { id: "PENDING", label: "Pending", icon: <FaInbox /> },
    { id: "CANCELLED", label: "History", icon: <FaXmark /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-8 py-6 selection:bg-indigo-500">
      <div className="max-w-7xl mx-auto">
        {/* BRAND HEADER */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-xl font-bold tracking-tighter">
            HOTEL<span className="text-indigo-500">OS</span>
          </h1>
          <div className="text-[10px] font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            SYSTEM_STATUS: NOMINAL
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
              My <br /> <span className="text-indigo-500 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Inventory.</span>
            </h1>
          </div>

          {/* TAB SYSTEM */}
          <div className="flex bg-[#0A0A0A] p-1 rounded-2xl border border-white/5 relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all z-10 ${
                  activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-indigo-600 rounded-xl -z-10 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT AREA */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-[#080808] border border-white/5 rounded-[3rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-[#080808] border border-white/5 rounded-[3rem] p-10 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-500 min-h-[380px] overflow-hidden"
                >
                  {/* CARD DECOR */}
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                    <FaFingerprint size={120} />
                  </div>

                  {/* STATUS HEADER */}
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                      booking.status === "CONFIRMED" ? "border-green-500/30 text-green-400 bg-green-500/5" : 
                      booking.status === "PENDING" ? "border-yellow-500/30 text-yellow-400 bg-yellow-500/5" :
                      "border-red-500/30 text-red-500 bg-red-500/5"
                    }`}>
                      <FaCircle className={booking.status === "CONFIRMED" ? "animate-pulse" : ""} size={6} />
                      {booking.status}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-indigo-400 transition-colors">
                      <FaFingerprint size={18} />
                    </div>
                  </div>

                  {/* ROOM INFO */}
                  <div className="relative z-10">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-2 group-hover:text-indigo-400 transition-colors">
                      {booking.room.name}
                    </h2>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                      {new Date(booking.checkIn).toLocaleDateString('en-GB')} — {new Date(booking.checkOut).toLocaleDateString('en-GB')}
                    </p>
                  </div>

                  {/* PRICE & ACTIONS */}
                  <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1">Total Settlement</p>
                      <p className="text-2xl font-black italic text-white">₹{booking.totalAmount}</p>
                    </div>

                    <div className="flex gap-3">
                      {booking.status === "CONFIRMED" && (
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/20"
                        >
                          <FaTrash size={14} />
                        </button>
                      )}
                      <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all">
                        <FaArrowUpRightFromSquare size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* EMPTY STATE */}
            {filteredBookings.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="md:col-span-3 py-32 border border-dashed border-white/10 rounded-[4rem] flex flex-col items-center justify-center bg-white/[0.01]"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5 text-gray-700">
                   {activeTab === "CONFIRMED" ? <FaCheckDouble size={30} /> : activeTab === "PENDING" ? <FaInbox size={30} /> : <FaXmark size={30} />}
                </div>
                <p className="text-gray-600 font-black italic text-3xl uppercase tracking-tighter">No {activeTab} Records</p>
                <p className="text-[9px] text-gray-700 font-bold uppercase tracking-[0.4em] mt-2">Check other ledger segments</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaTrash, FaFingerprint, FaArrowUpRightFromSquare, FaCircle } from "react-icons/fa6";

// export default function MyBookingsPage() {
//   const [bookings, setBookings] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [canceling, setCanceling] = useState<string | null>(null);

//   const fetchBookings = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     try {
//       const res = await fetch("http://localhost:4000/bookings/my", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setBookings(Array.isArray(data) ? data : data.bookings || []);
//     } catch (err) {
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const cancelBooking = async (id: string) => {
//     if (!confirm("TERMINATE RESERVATION?")) return;
//     setCanceling(id);
//     try {
//       await fetch(`http://localhost:4000/bookings/cancel/${id}`, {
//         method: "PATCH",
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       fetchBookings();
//     } finally {
//       setCanceling(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white px-8 py-6 selection:bg-indigo-500">
//       <h1 className="text-xl font-bold ">
//         HOTEL<span className="text-indigo-500">OS</span>
//       </h1>
//       <div className="max-w-7xl mx-auto">
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
//           <div>
//             <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">
//               Active <br /> <span className="text-indigo-500">Inventory.</span>
//             </h1>
//             <p className="mt-6 text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">
//               HotelOS // Secure Ledger v3.0
//             </p>
//           </div>
//           <div className="flex gap-4">
//             <div className="bg-[#111] border border-white/5 p-6 rounded-[2rem]">
//               <p className="text-[10px] text-gray-600 font-black uppercase mb-1">Total Units</p>
//               <p className="text-3xl font-black italic">{bookings.length}</p>
//             </div>
//           </div>
//         </div>

//         {/* LOADING STATE */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="h-80 bg-[#080808] border border-white/5 rounded-[3rem] animate-pulse" />
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <AnimatePresence>
//               {bookings.map((booking) => (
//                 <motion.div
//                   key={booking.id}
//                   layout
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="group relative bg-[#080808] border border-white/5 rounded-[3rem] p-10 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-500 min-h-[380px]"
//                 >
//                   {/* STATUS BADGE */}
//                   <div className="flex justify-between items-start mb-8">
//                     <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${booking.status === "CONFIRMED" ? "border-green-500/30 text-green-400 bg-green-500/5" : "border-red-500/30 text-red-500 bg-red-500/5"
//                       }`}>
//                       <FaCircle className={booking.status === "CONFIRMED" ? "animate-pulse" : ""} size={6} />
//                       {booking.status}
//                     </div>
//                     <FaFingerprint className="text-gray-800 group-hover:text-indigo-500 transition-colors" size={24} />
//                   </div>

//                   {/* ROOM INFO */}
//                   <div>
//                     <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-2">
//                       {booking.room.name}
//                     </h2>
//                     <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
//                       Stay Period: {new Date(booking.checkIn).toLocaleDateString('en-GB')} — {new Date(booking.checkOut).toLocaleDateString('en-GB')}
//                     </p>
//                   </div>

//                   {/* PRICE & ACTIONS */}
//                   <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
//                     <div>
//                       <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1">Total Settled</p>
//                       <p className="text-2xl font-black italic text-white">₹{booking.totalAmount}</p>
//                     </div>

//                     <div className="flex gap-3">
//                       {booking.status !== "CANCELLED" && (
//                         <button
//                           onClick={() => cancelBooking(booking.id)}
//                           className="w-12 h-12 flex items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
//                         >
//                           <FaTrash size={14} />
//                         </button>
//                       )}
//                       <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all cursor-pointer">
//                         <FaArrowUpRightFromSquare size={14} />
//                       </div>
//                     </div>
//                   </div>

//                   {/* ID FOOTER */}
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                     <span className="text-[8px] font-mono text-gray-700 uppercase tracking-tighter">TRC_ID: {booking.id}</span>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>

//             {/* EMPTY STATE SLOT */}
//             {bookings.length === 0 && (
//               <div className="md:col-span-3 py-40 border-2 border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center">
//                 <p className="text-gray-700 font-black italic text-4xl uppercase tracking-tighter">Empty Ledger</p>
//                 <p className="text-[10px] text-gray-800 font-bold uppercase tracking-[0.5em] mt-4 underline cursor-pointer hover:text-indigo-500">Initialize New Booking</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }