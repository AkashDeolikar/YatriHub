"use client";

import { useState, useCallback, useMemo } from "react";
import { Bus, Passenger, Route } from "../types/bus";
import { generateBookingId, LOCATION_REGISTRY } from "../lib/bus-utils";

/**
 * PRODUCTION-GRADE HOOK
 * Features: Atomic resets, computed pricing, and state guards.
 */

export const useBooking = () => {
  // 1. Primary States
  const [step, setStep] = useState(0);
  const [route, setRoute] = useState<Route | null>(null);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [passenger, setPassenger] = useState<Passenger | null>(null);
  const [bookingId, setBookingId] = useState("");

  // 2. Computed Values (PaaS "Analytics")
  const subtotal = useMemo(() => 
    (selectedSeats.length * (selectedBus?.price || 0)), 
  [selectedSeats, selectedBus]);

  const tax = useMemo(() => subtotal * 0.18, [subtotal]); // 18% GST for India nodes
  const totalCharge = useMemo(() => subtotal + tax, [subtotal, tax]);

  // 3. Action Handlers
  const nextStep = useCallback(() => setStep((s) => s + 1), []);
  const prevStep = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  const handleRouteSelection = useCallback((r: Route) => {
    // Validate that nodes exist in registry before proceeding
    if (LOCATION_REGISTRY[r.from as keyof typeof LOCATION_REGISTRY]) {
      setRoute(r);
      nextStep();
    }
  }, [nextStep]);

  const handleBusSelection = useCallback((b: Bus) => {
    setSelectedBus(b);
    // Auto-clear seats if a new bus is selected to prevent "stale" selections
    setSelectedSeats([]);
    nextStep();
  }, [nextStep]);

  const toggleSeat = useCallback((seat: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  }, []);

  const finalizeBooking = useCallback((p: Passenger) => {
    // Atomically finalize the "deployment"
    setPassenger(p);
    const id = generateBookingId("TXN");
    setBookingId(id);
    nextStep();
    return id; // Return ID for immediate logging/analytics
  }, [nextStep]);

  const reset = useCallback(() => {
    setStep(0);
    setRoute(null);
    setSelectedBus(null);
    setSelectedSeats([]);
    setPassenger(null);
    setBookingId("");
  }, []);

  // 4. Interface Export
  return {
    // States
    step,
    route,
    selectedBus,
    selectedSeats,
    passenger,
    bookingId,
    
    // Computed (Real-time calculations)
    financials: {
      subtotal,
      tax,
      totalCharge
    },

    // Methods
    setStep,
    nextStep,
    prevStep,
    handleRouteSelection,
    handleBusSelection,
    toggleSeat,
    finalizeBooking,
    reset,
  };
};