import { useState } from "react";
import type { Booking, DateRange, Room } from "./types";

export function useBookingState() {
  const [booking, setBooking] = useState<Booking>({});

  return {
    booking,
    setDates: (dates: DateRange) =>
      setBooking((b) => ({ ...b, dates })),
    setRoom: (room: Room) =>
      setBooking((b) => ({ ...b, room })),
    reset: () => setBooking({}),
  };
}
