import { create } from "zustand";

export interface Passenger {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  mealPref: string;
  baggage: string;
}

export interface Flight {
  flightNo: string;
  airline: string;
  from: string;
  to: string;
  dep: string;
  arr: string;
  basePrice: number;
}

interface BookingState {
  flight: Flight | null;
  passengers: Passenger[];
  seats: string[];
  searchParams: { from: string; to: string; passengers: number } | null;
  
  setSearchParams: (params: any) => void;
  setFlight: (f: Flight) => void;
  setPassengers: (p: Passenger[]) => void;
  setSeats: (s: string[]) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  flight: null,
  passengers: [],
  seats: [],
  searchParams: null,

  setSearchParams: (searchParams) => set({ searchParams }),
  setFlight: (flight) => set({ flight }),
  setPassengers: (passengers) => set({ passengers }),
  setSeats: (seats) => set({ seats }),
  reset: () => set({ flight: null, passengers: [], seats: [], searchParams: null })
}));