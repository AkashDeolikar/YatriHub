"use client"

import { useState } from "react"
import { useBookingStore } from "../../store/bookingStore"
import { Passenger } from "../../store/bookingStore"

export default function PassengerForm({ count, onNext }: any) {

  const setPassengers = useBookingStore((s: any) => s.setPassengers)

  const [passengers, setLocal] = useState<Passenger[]>(
    Array.from({ length: count }).map(() => ({
      title: "Mr",
      firstName: "",
      lastName: "",
      gender: "Male",
      dob: "",
      mealPref: "Veg",
      baggage: "15kg"
    }))
  )

  const update = (i: number, field: keyof Passenger, value: string) => {
    const p = [...passengers]
    p[i][field] = value
    setLocal(p)
  }

  return (
    <div className="space-y-6">
      {passengers.map((p, i) => (
        <div key={i} className="bg-[#121826] p-6">
          <input
            placeholder="First Name"
            onChange={e => update(i, "firstName", e.target.value)}
          />
          <input
            placeholder="Last Name"
            onChange={e => update(i, "lastName", e.target.value)}
          />
          <input
            type="date"
            onChange={e => update(i, "dob", e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={() => {
          setPassengers(passengers)
          onNext()
        }}
        className="bg-indigo-600 px-6 py-3"
      >
        Continue
      </button>
    </div>
  )
}