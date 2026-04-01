// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const BookingPage = () => {
//   const navigate = useNavigate();

//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [guests, setGuests] = useState(1);

//   const pricePerNight = 4500;

//   const calculateTotal = () => {
//     if (!checkIn || !checkOut) return 0;
//     const days =
//       (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
//       (1000 * 60 * 60 * 24);
//     return days * pricePerNight;
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Book Your Stay</h1>

//       <div className="bg-white shadow rounded-xl p-6 space-y-4">
//         <input
//           type="date"
//           className="w-full border p-2 rounded"
//           onChange={(e) => setCheckIn(e.target.value)}
//         />

//         <input
//           type="date"
//           className="w-full border p-2 rounded"
//           onChange={(e) => setCheckOut(e.target.value)}
//         />

//         <input
//           type="number"
//           min={1}
//           value={guests}
//           className="w-full border p-2 rounded"
//           onChange={(e) => setGuests(Number(e.target.value))}
//         />

//         <p className="font-semibold">
//           Total: ₹{calculateTotal()}
//         </p>

//         <button
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//           onClick={() => navigate("/payment")}
//         >
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;
import BookingForm from "../components/BookinfForm";
import BookingSummary from "../components/BookingSummary";
import { useBookingState } from "../bookingSlice";

export default function BookingPage() {
  const { booking, setDates, setRoom } = useBookingState();

  return (
    <>
      <h1>Hotel Booking</h1>
      <BookingForm onDates={setDates} onRoom={setRoom} />
      <BookingSummary booking={booking} />
    </>
  );
}
