"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function HeroBanner({ movies }: any) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const movie = movies[index];
  const prevMovie = movies[prevIndex];

  // 🎬 AUTO SLIDE
  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(() => {
      setPrevIndex(index);
      setIndex((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [index, paused, movies.length]);

  if (!movie) return null;

  return (
    <div
      className="relative h-[85vh] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 🎥 PREVIOUS */}
      {prevMovie && (
        <div className="absolute inset-0 transition-opacity duration-1000 opacity-100">
          {prevMovie.video ? (
            <video
              src={prevMovie.video}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover scale-105"
            />
          ) : (
            <Image
              src={prevMovie.image}
              alt=""
              fill
              className="object-cover scale-105"
            />
          )}
        </div>
      )}

      {/* 🎥 CURRENT */}
      <div className="absolute inset-0 transition-opacity duration-1000 opacity-100">
        {movie.video ? (
          <video
            key={movie.video}
            src={movie.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-110 animate-zoomSlow"
          />
        ) : (
          <Image
            key={movie.image}
            src={movie.image}
            alt={movie.title}
            fill
            priority
            className="object-cover scale-110 animate-zoomSlow"
          />
        )}
      </div>

      {/* 🌑 OVERLAYS (refined) */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* 🎬 CONTENT */}
      <div className="absolute bottom-24 left-6 md:left-16 max-w-xl space-y-5 z-10 animate-fadeUp">

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-xl">
          {movie.title}
        </h1>

        <div className="flex gap-3 text-sm text-gray-300">
          <span className="text-green-400 font-semibold">
            ⭐ {movie.rating}
          </span>
          <span>• {movie.year || "2026"}</span>
          <span>• {movie.duration || "2h 10m"}</span>
          <span className="border border-white/30 px-1 text-xs">HD</span>
        </div>

        <p className="text-gray-300 line-clamp-3 text-sm leading-relaxed">
          {movie.description}
        </p>

        {/* 🎯 ACTIONS */}
        <div className="flex gap-4 pt-2">

          <button
            onClick={() =>
              router.push(`/entertainment/booking/${movie.slug}`)
            }
            className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
          >
            <FaPlay />
            Play
          </button>

          <button
            onClick={() =>
              router.push(`/entertainment/movie/${movie.slug}`)
            }
            className="flex items-center gap-2 bg-white/20 backdrop-blur px-6 py-2 rounded font-semibold hover:bg-white/30 transition"
          >
            <FaInfoCircle />
            More Info
          </button>

        </div>
      </div>

      {/* 🔘 DOT NAV */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {movies.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => {
              setPrevIndex(index);
              setIndex(i);
            }}
            className={`transition-all rounded-full ${
              i === index
                ? "bg-white w-6 h-2"
                : "bg-gray-500/60 w-2 h-2 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* 🌫 FADE */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}