import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
    const [params] = useSearchParams();
    const bookingId = params.get("bookingId");

    useEffect(() => {
        if (!bookingId) return;

        const interval = setInterval(async () => {
            const res = await fetch(`http://localhost:3000/bookings/${bookingId}`);
            const booking = await res.json();

            if (booking.status === "CONFIRMED") {
                clearInterval(interval);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [bookingId]);

    return (
        <div>
            <h1>Payment received 🎉</h1>
            <p>Your booking is being confirmed.</p>
            {bookingId && <p>Booking ID: {bookingId}</p>}
        </div>
    );
}
