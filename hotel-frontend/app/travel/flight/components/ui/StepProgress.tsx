"use client"

import { motion } from "framer-motion"

interface Props {
  step: number
}

const steps = [
  "Search",
  "Flights",
  "Seats",
  "Passengers",
  "Payment"
]

export default function StepProgress({ step }: Props) {

  return (

    <div className="flex justify-center mb-12">

      <div className="flex items-center gap-8">

        {steps.map((label, i) => {

          const active = step >= i

          return (

            <div key={i} className="flex items-center gap-2">

              <motion.div
                animate={{
                  backgroundColor: active ? "#6366f1" : "#1f2937"
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
              >
                {i + 1}
              </motion.div>

              <span className="text-sm hidden md:block">
                {label}
              </span>

            </div>

          )

        })}

      </div>

    </div>

  )

}