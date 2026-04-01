"use client";

import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { useBooking } from "../bus/hooks/useBooking";
import { Bus } from "../bus/types/bus";

// UI Components
import SearchHero from "./components/bus-booking/SearchHero";
import FleetList from "./components/bus-booking/FleetList";
import SeatMapper from "./components/bus-booking/SeatMapper";
import PassengerGate from "./components/bus-booking/PassengerGate";
import FinalReceipt from "./components/bus-booking/FinalReceipt";

const MOCK_FLEET: Bus[] = [
  { id: 1, name: "Neeta Terminal", busNo: "NX-88", type: "AC Sleeper", departure: "21:00", arrival: "05:00", price: 1200, origin: "Mumbai", destination: "Goa" },
  { id: 2, name: "Star Link", busNo: "SL-01", type: "Executive", departure: "10:00", arrival: "18:00", price: 950, origin: "Mumbai", destination: "Pune" },
];

export default function BusBookingPage() {
  const {
    step,
    route,
    selectedBus,
    selectedSeats,
    passenger,
    bookingId,
    handleRouteSelection,
    handleBusSelection,
    toggleSeat,
    finalizeBooking,
    reset,
    prevStep
  } = useBooking();

  const activeFleet = useMemo(() => 
    MOCK_FLEET.filter(b => b.origin === route?.from && b.destination === route?.to), 
  [route]);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-16 border-b border-white/5 pb-4">
          <h1 className="text-2xl font-bold">HOTEL<span className="text-pink-500">OS</span></h1>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map(s => (
              <div key={s} className={`h-1 w-8 rounded-full transition-all duration-500 ${step >= s ? "bg-pink-500" : "bg-white/10"}`} />
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <SearchHero key="search" onProceed={handleRouteSelection} />
          )}

          {step === 1 && (
            <FleetList 
              key="fleet" 
              items={activeFleet} 
              route={route!} 
              onBack={prevStep} 
              onSelect={handleBusSelection} 
            />
          )}

          {step === 2 && selectedBus && (
            <SeatMapper 
              key="seats" 
              bus={selectedBus} 
              selected={selectedSeats} 
              onToggle={toggleSeat} 
              onProceed={() => handleBusSelection(selectedBus)} // Reuse selection logic to move next
            />
          )}

          {step === 3 && selectedBus && (
            <PassengerGate 
              key="gate" 
              total={selectedSeats.length * selectedBus.price} 
              onComplete={finalizeBooking} 
            />
          )}

          {step === 4 && selectedBus && passenger && (
            <FinalReceipt 
              key="receipt" 
              id={bookingId} 
              bus={selectedBus} 
              seats={selectedSeats} 
              passenger={passenger} 
              onReset={reset} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}