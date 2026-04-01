"use client"

import { useBookingStore } from "../../store/bookingStore"

export default function FlightResults({ flights, onNext }: any) {

  const setFlight = useBookingStore((s: any) => s.setFlight)

  return (

    <div className="space-y-6">

      {flights.map((f: any, i: number) => (

        <div key={i} className="bg-[#121826] p-6 rounded-xl">

          <div className="flex justify-between items-center">

            <div>
              <h3 className="text-lg">{f.airline}</h3>
              <p>{f.flightNo}</p>
            </div>

            <div>{f.dep} → {f.arr}</div>

            <div>₹{f.basePrice}</div>

            <button
              onClick={() => {

                setFlight(f)
                onNext()

              }}
              className="bg-indigo-600 px-4 py-2 rounded-lg"
            >
              Select
            </button>

          </div>

        </div>

      ))}

    </div>

  )
}