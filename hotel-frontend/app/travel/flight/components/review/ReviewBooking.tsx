"use client"

import { useBookingStore } from "../../store/bookingStore"
import { bookFlight } from "../../lib/flightApi"
import { useState } from "react"
import { Loader2, Plane } from "lucide-react"

export default function ReviewBooking() {
  const { flight, passengers, seats } = useBookingStore()
  const [loading, setLoading] = useState(false)

  // Type Guard: Prevents "possibly null" errors
  if (!flight) return <div className="p-10 text-center">No flight selected.</div>

  const handleConfirm = async () => {
    setLoading(true)
    try {
      const res = await bookFlight({ flight, passengers, seats })
      window.location.href = res.url // Redirect to mock success
    } catch (err) {
      alert("Booking failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-[#121826] p-8 rounded-2xl border border-white/5">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Plane className="text-indigo-400" /> Review Your Trip
      </h2>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between border-b border-white/5 pb-4">
          <span>{flight.airline} ({flight.flightNo})</span>
          <span className="font-bold">₹{flight.basePrice}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Passengers: {passengers.length}</span>
          <span>Seats: {seats.join(", ")}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-indigo-400 pt-4">
          <span>Total Amount</span>
          <span>₹{flight.basePrice * passengers.length + 650}</span>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-bold flex justify-center items-center gap-2"
      >
        {loading && <Loader2 className="animate-spin" size={20} />}
        Confirm & Pay
      </button>
    </div>
  )
}