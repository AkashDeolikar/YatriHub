import { create } from "zustand";

type BookingState = {
  movie: any;
  show: any;
  seats: string[];

  setMovie: (movie: any) => void;
  setShow: (show: any) => void;
  setSeats: (seats: string[]) => void;

  addSeat: (seat: string) => void;
  removeSeat: (seat: string) => void;
  clearSeats: () => void;

  clearBooking: () => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  movie: null,
  show: null,
  seats: [],

  setMovie: (movie) => set({ movie }),
  setShow: (show) => set({ show }),
  setSeats: (seats) => set({ seats }),

  addSeat: (seat) =>
  set((state) => ({
    seats: state.seats.includes(seat)
      ? state.seats
      : [...state.seats, seat],
  })),

  removeSeat: (seat) =>
    set((state) => ({
      seats: state.seats.filter((s) => s !== seat),
    })),

  clearSeats: () => set({ seats: [] }),

  clearBooking: () =>
    set({
      movie: null,
      show: null,
      seats: [],
    }),
}));