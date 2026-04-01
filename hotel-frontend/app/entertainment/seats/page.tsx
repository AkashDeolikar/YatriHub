"use client";

import { useEffect, useState } from "react";
import { generateSeats } from "../utils/seatGenerator";
import { useRouter } from "next/navigation";

export default function SeatsPage() {
    const [seats, setSeats] = useState<any[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
    const router = useRouter();
    const maxSeats = 6;

    useEffect(() => {
        setSeats(generateSeats());
    }, []);

    const handleSelect = (seat: any) => {
        if (seat.status === "booked") return;

        const exists = selectedSeats.find(s => s.id === seat.id);

        if (exists) {
            setSelectedSeats(prev => prev.filter(s => s.id !== seat.id));
        } else {
            if (selectedSeats.length >= maxSeats) {
                alert("You can select max 6 seats");
                return;
            }
            setSelectedSeats(prev => [...prev, seat]);
        }
    };

    const getColor = (seat: any) => {
        if (seat.status === "booked") return "bg-red-500 cursor-not-allowed";
        if (selectedSeats.find(s => s.id === seat.id))
            return "bg-blue-500";
        return "bg-green-500 hover:scale-105";
    };

    // Group seats by row
    const rows = Array.from(new Set(seats.map(s => s.row)));

    const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);

    return (
        <div className="bg-black text-white min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Select Your Seats</h1>

            {/* SCREEN */}
            <div className="text-center mb-8">
                <div className="inline-block bg-gray-300 text-black px-10 py-2 rounded-full text-sm font-bold shadow">
                    SCREEN
                </div>
            </div>

            {/* SEAT GRID */}
            <div className="flex flex-col items-center gap-3">
                {rows.map((row) => (
                    <div key={row} className="flex items-center gap-3">

                        {/* Row Label */}
                        <span className="w-6 text-gray-400">{row}</span>

                        {/* Seats */}
                        <div className="flex gap-2">
                            {seats
                                .filter((s) => s.row === row)
                                .map((seat) => (
                                    <div
                                        key={seat.id}
                                        onClick={() => handleSelect(seat)}
                                        className={`w-8 h-8 text-xs flex items-center justify-center rounded cursor-pointer transition ${getColor(seat)}`}
                                    >
                                        {seat.number}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* LEGEND */}
            <div className="flex justify-center gap-6 mt-8 text-sm">
                <Legend color="bg-green-500" label="Available" />
                <Legend color="bg-red-500" label="Booked" />
                <Legend color="bg-blue-500" label="Selected" />
            </div>

            {/* SUMMARY */}
            <div className="mt-8 text-center">
                <p className="mb-2">
                    Seats: {selectedSeats.map(s => s.id).join(", ") || "None"}
                </p>
                <p className="text-xl font-bold">Total: ₹{total}</p>

                <button
                    disabled={selectedSeats.length === 0}
                    onClick={() =>
                        router.push(
                            `/entertainment/checkout?seats=${JSON.stringify(selectedSeats)}`
                        )
                    }
                    className="mt-4 px-6 py-2 bg-indigo-600 rounded disabled:bg-gray-600"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

// Legend Component
function Legend({ color, label }: any) {
    return (
        <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${color}`} />
            <span>{label}</span>
        </div>
    );
}