"use client";

import { motion } from "framer-motion";

interface FareProps {
  price: number;
  count: number;
}

export function FareBreakdown({ price, count }: FareProps) {
  const taxes = 450;
  const fee = 200;
  const subtotal = price * count;
  const total = subtotal + taxes + fee;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-[1px] w-8 bg-teal-500/50" />
        <h3 className="text-[10px] font-black tracking-[0.4em] text-white uppercase">Ledger Manifest</h3>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end group">
          <span className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase">Base Transit (x{count})</span>
          <span className="text-xs font-mono text-zinc-300">₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase">Regulatory Surcharges</span>
          <span className="text-xs font-mono text-zinc-300">₹{taxes.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-end pb-4 border-b border-zinc-900">
          <span className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase">Convenience Protocol</span>
          <span className="text-xs font-mono text-zinc-300">₹{fee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-[10px] font-black text-teal-500 tracking-[0.3em] uppercase">Total Liability</span>
          <span className="text-2xl font-light text-white tracking-tighter">₹{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}