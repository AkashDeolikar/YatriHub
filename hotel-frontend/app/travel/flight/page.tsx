"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBookingStore } from "./store/bookingStore";
import { searchFlights } from "./lib/flightApi"; 

import StepProgress from "./components/ui/StepProgress";
import FlightSearch from "./components/search/FlightSearch";
import FlightResults from "./components/results/FlightResults";
import PassengerForm from "./components/passengers/PassengerForm";
import SeatMap from "./components/seats/SeatMap";
import PaymentGateway from "./components/payment/PaymentGateway";
import FareBreakdown from "./components/payment/FareBreakdown";

enum BookingStep {
  SEARCH = 0,
  RESULTS = 1,
  SEATS = 2,
  PASSENGERS = 3,
  PAYMENT = 4,
}

export default function FlightsPage() {
  const [step, setStep] = useState(BookingStep.SEARCH);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { setFlight, setPassengers, flight, passengers, setSearchParams, searchParams } = useBookingStore();

  const handleSearch = async (data: any) => {
    setLoading(true);
    try {
      setSearchParams(data);
      const flights = await searchFlights(data);
      setResults(flights);
      setStep(BookingStep.RESULTS);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFlight = (f: any) => {
    setFlight(f);
    setStep(BookingStep.SEATS);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white py-10">
      <StepProgress step={step} />

      <main className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {step === BookingStep.SEARCH && <FlightSearch onSearch={handleSearch} />}

            {step === BookingStep.RESULTS && (
              <FlightResults flights={results} onNext={handleSelectFlight} />
            )}

            {step === BookingStep.SEATS && (
              <SeatMap 
                passengerCount={searchParams?.passengers || 1} 
                onNext={() => setStep(BookingStep.PASSENGERS)} 
              />
            )}

            {step === BookingStep.PASSENGERS && (
              <PassengerForm 
                count={searchParams?.passengers || 1} 
                onNext={(p: any) => {
                  setPassengers(p);
                  setStep(BookingStep.PAYMENT);
                }} 
              />
            )}

            {step === BookingStep.PAYMENT && (
              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
                <FareBreakdown price={flight?.basePrice || 0} passengers={searchParams?.passengers || 1} />
                <PaymentGateway amount={(flight?.basePrice || 0) * (searchParams?.passengers || 1) + 650} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}