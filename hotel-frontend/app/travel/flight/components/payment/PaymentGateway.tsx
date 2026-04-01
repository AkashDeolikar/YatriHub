"use client"

import { useState } from "react"
import { CreditCard, Loader2, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

interface Props {
  amount: number
}

export default function PaymentGateway({ amount }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
      })

      const data = await res.json()

      if (data.url) {
        // "Beyond Human Thinking" Approach: 
        // Direct server-side URL redirect is more robust than client-side redirectToCheckout
        window.location.href = data.url
      } else {
        throw new Error("No redirection URL received")
      }
    } catch (err) {
      console.error("Payment Error:", err)
      alert("Payment initialization failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#121826] p-8 rounded-2xl border border-white/5 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-500/10 rounded-lg">
          <ShieldCheck className="text-green-500" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold">Secure Checkout</h3>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Powered by Stripe</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Transaction Security</span>
          <span className="text-green-400 flex items-center gap-1">
            <ShieldCheck size={14} /> SSL Encrypted
          </span>
        </div>
        <div className="p-4 bg-gray-900/50 rounded-xl border border-white/5 flex items-center gap-4">
          <CreditCard className="text-indigo-400" />
          <div>
            <p className="text-xs text-gray-500">Total Payable</p>
            <p className="text-xl font-mono font-bold">₹{amount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <button
        disabled={isLoading}
        onClick={handlePayment}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            Proceed to Payment
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </>
        )}
      </button>
      
      <p className="text-[10px] text-center text-gray-500 mt-4 leading-relaxed">
        By clicking, you agree to the SkyBook Terms of Service. <br/> 
        Your data is processed securely via Stripe's encrypted gateway.
      </p>
    </motion.div>
  )
}