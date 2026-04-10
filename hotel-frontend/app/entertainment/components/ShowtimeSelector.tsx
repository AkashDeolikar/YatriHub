"use client";

import { useState, useMemo } from "react";
import { Info, Zap, Calendar, Filter, ChevronRight, Monitor, X, MapPin, Coffee, ParkingCircle, Accessibility } from "lucide-react";

// Added detailed info for the "Info Frame"
const THEATRES = [
  {
    id: "t1",
    name: "PVR Cinemas",
    location: "Vegas Mall, Dwarka",
    distance: "2.4 km",
    amenities: ["Valet Parking", "Recliners", "Gourmet Menu"],
    description: "Experience luxury cinema at its best with state-of-the-art Dolby 7.1 surround sound and plush seating.",
    shows: [
      { time: "10:00 AM", price: 150, format: "2D", status: "available" },
      { time: "01:30 PM", price: 200, format: "4K Dolby Atmos", status: "filling" },
      { time: "09:45 PM", price: 220, format: "2D", status: "available" },
    ],
  },
  {
    id: "t2",
    name: "INOX",
    location: "Insignia Epicurus",
    distance: "4.1 km",
    amenities: ["App-based Food", "4K Projection", "E-Seating"],
    description: "A premium boutique cinema experience featuring the world's best projection systems and a curated kitchen.",
    shows: [
      { time: "04:00 PM", price: 250, format: "IMAX 3D", status: "available" },
      { time: "07:30 PM", price: 300, format: "4K", status: "sold" },
      { time: "11:00 PM", price: 280, format: "IMAX 3D", status: "filling" },
    ],
  },
];

const DATES = [
  { day: "MON", date: "10", month: "APR" },
  { day: "TUE", date: "11", month: "APR" },
  { day: "WED", date: "12", month: "APR" },
  { day: "THU", date: "13", month: "APR" },
];

const FORMATS = ["All", "2D", "4K", "IMAX 3D"];

export default function ShowtimeSelector({ onSelect }: any) {
  const [selectedDate, setSelectedDate] = useState("10");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [selectedShow, setSelectedShow] = useState<any>(null);
  const [activeInfo, setActiveInfo] = useState<any>(null); // New state for Info Frame

  const filteredTheatres = useMemo(() => {
    if (selectedFormat === "All") return THEATRES;
    return THEATRES.map(t => ({
      ...t,
      shows: t.shows.filter(s => s.format.includes(selectedFormat))
    })).filter(t => t.shows.length > 0);
  }, [selectedFormat]);

  const handleSelect = (theatre: any, show: any) => {
    if (show.status === "sold") return;
    const data = { theatre: theatre.name, location: theatre.location, ...show, date: selectedDate };
    setSelectedShow(data);
    onSelect?.(data);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 relative">
      
      {/* 📅 DATE SELECTOR */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
        {DATES.map((d) => (
          <button
            key={d.date}
            onClick={() => setSelectedDate(d.date)}
            className={`flex flex-col items-center min-w-[70px] py-3 rounded-2xl border transition-all duration-300
              ${selectedDate === d.date 
                ? "bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-500/20 scale-105" 
                : "bg-white/5 border-white/10 hover:border-white/30"}`}
          >
            <span className={`text-[10px] font-bold tracking-widest ${selectedDate === d.date ? "text-indigo-200" : "text-gray-500"}`}>
              {d.day}
            </span>
            <span className="text-xl font-black text-white">{d.date}</span>
            <span className="text-[9px] font-medium text-gray-400">{d.month}</span>
          </button>
        ))}
      </div>

      {/* 🧪 FILTERS & LEGEND */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="flex gap-2">
          {FORMATS.map(f => (
            <button
              key={f}
              onClick={() => setSelectedFormat(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all
                ${selectedFormat === f ? "bg-white text-black" : "bg-white/10 text-gray-400 hover:bg-white/20"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-6">
          <LegendItem color="bg-green-500" label="Available" />
          <LegendItem color="bg-orange-500" label="Fast Filling" />
          <LegendItem color="bg-zinc-700" label="Sold Out" />
        </div>
      </div>

      {/* 📽 THEATRES LIST */}
      <div className="space-y-6">
        {filteredTheatres.map((theatre) => (
          <div
            key={theatre.id}
            className="group bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-6 md:p-8 transition-all hover:border-white/20"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                   <Monitor size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {theatre.name}
                    <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full font-bold">EXPRESS</span>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{theatre.location} • <span className="text-indigo-400">{theatre.distance}</span></p>
                </div>
              </div>
              
              {/* CLICKABLE INFO BUTTON */}
              <button 
                onClick={() => setActiveInfo(theatre)}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest font-bold"
              >
                Theatre Info <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {theatre.shows.map((show, idx) => {
                const isActive = selectedShow?.time === show.time && selectedShow?.theatre === theatre.name;
                const isSold = show.status === "sold";
                return (
                  <button
                    key={idx}
                    disabled={isSold}
                    onClick={() => handleSelect(theatre, show)}
                    className={`relative p-4 rounded-2xl transition-all duration-500 border flex flex-col items-center
                      ${isSold ? "opacity-20 grayscale cursor-not-allowed bg-transparent border-dashed border-white/10" : "cursor-pointer"}
                      ${isActive ? "bg-white border-white scale-105 shadow-xl" : "bg-white/5 border-white/5 hover:bg-white/10"}
                    `}
                  >
                    <span className={`text-base font-black ${isActive ? "text-black" : "text-white"}`}>{show.time}</span>
                    <span className={`text-[9px] mt-1 font-bold uppercase ${isActive ? "text-gray-600" : "text-gray-500"}`}>{show.format}</span>
                    <span className={`mt-2 text-xs font-black ${isActive ? "text-black" : "text-indigo-400"}`}>₹{show.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 🖼 THEATRE INFO MODAL/FRAME */}
      {activeInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative bg-[#111] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/20 blur-[80px]" />
            
            <button 
              onClick={() => setActiveInfo(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.3em]">Theatre Details</span>
                <h2 className="text-3xl font-black text-white mt-1">{activeInfo.name}</h2>
                <div className="flex items-center gap-2 text-gray-500 mt-2 text-sm">
                  <MapPin size={16} /> {activeInfo.location}
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed text-sm">
                {activeInfo.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {activeInfo.amenities.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    {item.includes("Food") || item.includes("Menu") ? <Coffee size={16} className="text-indigo-400" /> : <ParkingCircle size={16} className="text-indigo-400" />}
                    <span className="text-xs font-bold text-gray-300">{item}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <Accessibility size={16} className="text-indigo-400" />
                  <span className="text-xs font-bold text-gray-300">Wheelchair Access</span>
                </div>
              </div>

              <button 
                onClick={() => setActiveInfo(null)}
                className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform active:scale-95"
              >
                Close Info
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
      <span className="text-[9px] uppercase tracking-widest font-black text-gray-500">{label}</span>
    </div>
  );
}