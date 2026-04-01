import type { Booking } from "../types";

export default function BookingSummary({ booking }: { booking: Booking }) {
  if (!booking.dates || !booking.room) return null;

  return (
    <div>
      <h3>Confirm Booking</h3>
      <p>Room: {booking.room.name}</p>
      <p>Price: ₹{booking.room.price}</p>
      <button>Proceed to Payment</button>
    </div>
  );
}
