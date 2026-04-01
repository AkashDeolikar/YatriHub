"use client";

import { useParams, useRouter } from "next/navigation";
import { movies } from "../../data/movies";
import { theatres } from "../../data/theatre";
import ShowtimeSelector from "../../components/ShowtimeSelector";
import SeatGrid from "../../components/SeatGrid";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useBookingStore } from "../../store/bookingStore";

type Show = {
  theatre: string;
  time: string;
  movieSlug: string;
};

export default function BookingPage() {
  const { slug } = useParams();
  const router = useRouter();

  const safeSlug = Array.isArray(slug) ? slug[0] : slug;

  const movie = movies.find((m) => m.slug === safeSlug);

  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [playVideo, setPlayVideo] = useState(false);

  const seats = useBookingStore((s) => s.seats);
  const clearSeats = useBookingStore((s) => s.clearSeats);

  const seatRef = useRef<HTMLDivElement>(null);

  const total = seats.length * (movie?.price || 0);

  // 🎯 Delay video load (Netflix feel)
  useEffect(() => {
    const timer = setTimeout(() => setPlayVideo(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // 🎯 Reset seats when show changes
  useEffect(() => {
    clearSeats();
  }, [selectedShow]);

  // 🎯 Auto scroll to seats
  useEffect(() => {
    if (selectedShow && seatRef.current) {
      seatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedShow]);

  if (!movie) {
    return <div className="text-white p-10">Movie not found</div>;
  }

  // 🎬 Normalize trailer type
  const isYouTube = movie.trailer?.includes("youtube");
  const isVideo = movie.trailer?.endsWith(".mp4");

  const availableTheatres = theatres
    .map((t) => ({
      ...t,
      shows: t.shows.filter((s) => s.movieSlug === movie.slug),
    }))
    .filter((t) => t.shows.length > 0);

  return (
    <div className="text-white space-y-10 pb-32">

      {/* 🎬 HERO */}
      <div className="relative h-[45vh] rounded-xl overflow-hidden">

        {/* 🎥 VIDEO */}
        {playVideo && isYouTube ? (
          <iframe
            src={movie.trailer}
            className="absolute w-full h-full object-cover scale-150 pointer-events-none opacity-90"
            allow="autoplay; encrypted-media"
          />
        ) : playVideo && isVideo ? (
          <video
            src={movie.trailer}
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
          />
        ) : (
          <Image
            src={movie.image}
            alt={movie.title}
            fill
            priority
            className="object-cover scale-105 animate-zoom"
          />
        )}

        {/* 🎨 OVERLAYS */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* 🎬 CONTENT */}
        <div className="absolute bottom-6 left-6 z-10 space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold">
            {movie.title}
          </h1>

          <div className="flex gap-3 text-sm text-gray-300">
            <span className="text-green-400 font-semibold">
              ⭐ {movie.rating}
            </span>
            <span>• {movie.duration}</span>
            <span>• {movie.language}</span>
          </div>
        </div>
      </div>

      {/* 🎯 PROGRESS FLOW */}
      <div className="flex items-center gap-4 text-sm">
        <span className="text-white font-semibold">1. Showtime</span>
        <span className="text-gray-500">→</span>
        <span className={selectedShow ? "text-white font-semibold" : "text-gray-500"}>
          2. Seats
        </span>
        <span className="text-gray-500">→</span>
        <span className="text-gray-500">3. Payment</span>
      </div>

      {/* 🎟 SHOWTIME */}
      <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
        <h2 className="font-semibold mb-4">Choose Showtime</h2>

        {availableTheatres.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No shows available
          </p>
        ) : (
          <ShowtimeSelector
            theatres={availableTheatres}
            onSelect={(show: Show) => setSelectedShow(show)}
          />
        )}
      </div>

      {/* 🪑 SEATS */}
      {selectedShow && (
        <div
          ref={seatRef}
          className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 space-y-6"
        >
          <h2 className="font-semibold text-lg">
            {selectedShow.theatre} • {selectedShow.time}
          </h2>

          {/* SCREEN */}
          <div className="text-center text-xs text-gray-400">SCREEN</div>
          <div className="h-2 bg-gradient-to-r from-gray-500 to-white rounded-full shadow-inner" />

          {/* LEGEND */}
          <div className="flex justify-center gap-6 text-xs text-gray-400 mt-3">
            <span>🟩 Available</span>
            <span>🟥 Selected</span>
            <span>⬛ Booked</span>
          </div>

          <SeatGrid show={selectedShow} movie={movie} />
        </div>
      )}

      {/* 💳 PAYMENT BAR */}
      {selectedShow && (
        <div className="fixed bottom-0 left-0 w-full bg-black/95 border-t border-white/10 px-6 py-4 flex items-center justify-between z-50 backdrop-blur-md">

          {/* INFO */}
          <div>
            <p className="text-sm font-semibold">
              {seats.length} Seat(s)
            </p>
            <p className="text-xs text-gray-400">
              ₹ {total} • {selectedShow.theatre}
            </p>
          </div>

          {/* CTA */}
          <button
            disabled={seats.length === 0}
            onClick={() =>
              router.push(`/entertainment/checkout/${movie.slug}`)
            }
            className={`px-6 py-2 rounded font-semibold transition-all duration-300 ${
              seats.length === 0
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-500 hover:scale-105"
            }`}
          >
            {seats.length === 0
              ? "Select Seats"
              : `Pay ₹${total}`}
          </button>
        </div>
      )}

      {/* 🔐 TRUST */}
      <div className="text-center text-xs text-gray-500">
        🔒 Secure booking • Instant confirmation • No hidden charges
      </div>
    </div>
  );
}