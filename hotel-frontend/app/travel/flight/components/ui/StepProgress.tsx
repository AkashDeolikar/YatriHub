"use client"

import { motion } from "framer-motion"

interface Props {
  step: number
}

const steps = [
  "Search",
  "Transit",
  "Allocation",
  "Manifest",
  "Handshake"
]

export default function StepProgress({ step }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-20 px-4">
      <div className="relative flex justify-between items-start">
        {/* Background Track */}
        <div className="absolute top-4 left-0 w-full h-[1px] bg-zinc-900 z-0" />
        
        {/* Active Progress Track */}
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          className="absolute top-4 left-0 h-[1px] bg-teal-500/40 shadow-[0_0_10px_rgba(20,184,166,0.2)] z-0"
        />

        {steps.map((label, i) => {
          const isActive = step === i
          const isCompleted = step > i

          return (
            <div key={i} className="relative z-10 flex flex-col items-center group">
              {/* Step Node */}
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isActive || isCompleted ? "#ffffff" : "#050505",
                  borderColor: isActive || isCompleted ? "#ffffff" : "#27272a",
                  scale: isActive ? 1.2 : 1
                }}
                className="w-8 h-8 rounded-sm border flex items-center justify-center transition-all duration-500"
              >
                {isCompleted ? (
                  <span className="text-black text-[10px] font-black italic">✓</span>
                ) : (
                  <span className={`text-[10px] font-mono ${isActive ? 'text-black font-black' : 'text-zinc-700'}`}>
                    0{i + 1}
                  </span>
                )}
              </motion.div>

              {/* Label */}
              <div className="mt-4 text-center">
                <p className={`text-[7px] font-black uppercase tracking-[0.3em] transition-colors duration-500 ${
                  isActive ? 'text-teal-400' : isCompleted ? 'text-zinc-400' : 'text-zinc-700'
                }`}>
                  {label}
                </p>
                {isActive && (
                  <motion.div 
                    layoutId="underline"
                    className="h-[1px] w-4 bg-teal-500 mx-auto mt-1"
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}