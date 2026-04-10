"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function HeroBanner({ movies }: any) {
  const [index, setIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [paused, setPaused] = useState(false);

  const router = useRouter();
  const movie = movies[index];

  // 🎬 AUTO SLIDE LOGIC
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 8000); // 8 seconds for a more relaxed, premium feel

    return () => clearInterval(timer);
  }, [index, paused]);

  const handleNext = () => {
    setIsChanging(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % movies.length);
      setIsChanging(false);
    }, 800); // Matches the duration-1000 transition
  };

  if (!movie) return null;

  return (
    <div
      className="relative h-[90vh] w-full overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 🎥 BACKGROUND LAYER */}
      <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isChanging ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
        {movie.video ? (
          <video
            key={movie.video}
            src={movie.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover brightness-[0.7]"
          />
        ) : (
          <Image
            key={movie.image}
            src={movie.image}
            alt={movie.title}
            fill
            priority
            className="object-cover brightness-[0.7]"
          />
        )}
      </div>

      {/* 🌑 CINEMATIC GRADIENTS */}
      {/* Radial glow to focus on text */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,0,0,0.4)_0%,transparent_100%)]" />
      {/* Left sidebar darkener */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
      {/* Bottom shelf for content legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* 🎬 CONTENT AREA */}
      <div className="absolute inset-0 flex flex-col justify-end pb-32 px-6 md:px-16 z-10">
        <div className={`max-w-2xl space-y-6 transition-all duration-700 delay-300 ${isChanging ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
          
          {/* Brand/Category Tag */}
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-[10px] font-black px-2 py-0.5 rounded-sm tracking-tighter italic">YATRIPLAY ORIGINAL</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter drop-shadow-2xl uppercase">
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 text-sm font-bold text-white/90">
            <span className="text-green-500">{(movie.rating * 10).toFixed(0)}% Match</span>
            <span>{movie.year}</span>
            <span className="px-1.5 py-0.5 border border-white/40 text-[10px] rounded-sm">4K ULTRA HD</span>
            <span className="text-gray-400 font-medium italic">{movie.genre || "Action • Drama"}</span>
          </div>

          <p className="text-gray-200 text-lg md:text-xl line-clamp-3 leading-snug max-w-lg font-medium drop-shadow-md">
            {movie.description}
          </p>

          {/* 🎯 ACTION BUTTONS */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={() => router.push(`/entertainment/booking/${movie.slug}`)}
              className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-md font-black hover:bg-white/90 transition-all hover:scale-105 active:scale-95 group shadow-xl"
            >
              <FaPlay className="text-lg group-hover:scale-125 transition-transform" />
              PLAY
            </button>

            <button
              onClick={() => router.push(`/entertainment/movie/${movie.slug}`)}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-md font-bold hover:bg-white/20 transition-all shadow-xl"
            >
              <FaInfoCircle className="text-lg" />
              MORE INFO
            </button>
          </div>
        </div>
      </div>

      {/* 🔘 NAVIGATION INDICATORS */}
      <div className="absolute bottom-10 right-6 md:right-16 flex items-center gap-4 z-20">
        <div className="flex gap-2">
          {movies.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => {
                setIsChanging(true);
                setTimeout(() => {
                  setIndex(i);
                  setIsChanging(false);
                }, 400);
              }}
              className={`h-1 transition-all duration-500 rounded-full ${
                i === index ? "bg-red-600 w-12" : "bg-white/20 w-4 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">
          {index + 1} / {movies.length}
        </span>
      </div>

      {/* Bottom Gradient Transition to Content */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-[5]" />
    </div>
  );
}