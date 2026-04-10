"use client";

import { X, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

const SUGGESTIONS = ["Stranger Things", "The Witcher", "Breaking Bad", "Inception"];

export default function SearchModal({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [query, setQuery] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/98 z-[100] animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto px-6 pt-20">
        <div className="flex items-center border-b-2 border-white/30 pb-2">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Titles, people, genres..."
            className="w-full text-3xl md:text-5xl bg-transparent outline-none text-white placeholder:text-gray-600 font-light"
          />
          <button onClick={() => { setOpen(false); setQuery(""); }}>
            <X size={40} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="mt-12">
          <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
            <TrendingUp size={16} /> Popular Searches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUGGESTIONS.map((item) => (
              <div 
                key={item} 
                className="bg-white/5 hover:bg-white/10 p-4 rounded-md cursor-pointer transition-all border border-transparent hover:border-white/20"
              >
                <span className="text-white font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}