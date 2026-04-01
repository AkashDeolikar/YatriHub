import { useState, useCallback } from "react";
import { Bus, Passenger, Route } from "../types/bus";
import { generateBookingId } from "../lib/bus-utils";

export const useBooking = () => {
  const [step, setStep] = useState(0);
  const [route, setRoute] = useState<Route | null>(null);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [passenger, setPassenger] = useState<Passenger | null>(null);
  const [bookingId, setBookingId] = useState("");

  const nextStep = useCallback(() => setStep((s) => s + 1), []);
  const prevStep = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  const handleRouteSelection = (r: Route) => {
    setRoute(r);
    nextStep();
  };

  const handleBusSelection = (b: Bus) => {
    setSelectedBus(b);
    nextStep();
  };

  const toggleSeat = (seat: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const finalizeBooking = (p: Passenger) => {
    setPassenger(p);
    setBookingId(generateBookingId());
    nextStep();
  };

  const reset = () => {
    setStep(0);
    setRoute(null);
    setSelectedBus(null);
    setSelectedSeats([]);
    setPassenger(null);
    setBookingId("");
  };

  return {
    step,
    route,
    selectedBus,
    selectedSeats,
    passenger,
    bookingId,
    setStep,
    handleRouteSelection,
    handleBusSelection,
    toggleSeat,
    finalizeBooking,
    reset,
    prevStep,
  };
};