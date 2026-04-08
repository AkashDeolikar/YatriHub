"use client"

import { motion } from "framer-motion"

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-20 gap-6">
      <div className="relative flex items-center justify-center">
        {/* Inner Core */}
        <div className="h-4 w-4 bg-teal-500 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
        
        {/* Scanning Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 2.5 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut"
            }}
            className="absolute h-full w-full border border-teal-500/30 rounded-full"
          />
        ))}
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-[8px] font-black tracking-[0.6em] text-white uppercase animate-pulse">
          Synchronizing Nodes
        </span>
        <div className="h-[1px] w-24 bg-zinc-900 mt-2 overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="h-full w-1/2 bg-teal-500/40"
          />
        </div>
      </div>
    </div>
  )
}