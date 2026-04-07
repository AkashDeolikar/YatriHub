"use client";

import Link from "next/link";
import Image from "next/image";
import { FaPlay, FaPlus } from "react-icons/fa";

export default function MovieCard({ movie }: any) {
  return (
    <Link href={`/entertainment/movie/${movie.slug}`}>
      <div className="relative min-w-[200px] h-[300px] rounded-xl overflow-hidden cursor-pointer group">

        {/* 🎥 IMAGE */}
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          sizes="200px"
          className="
            object-cover
            transition-all duration-700 ease-out
            group-hover:scale-110 group-hover:brightness-75
          "
        />

        {/* 🌑 DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500" />

        {/* 🌈 GRADIENT (BOTTOM FADE) */}
        <div className="
          absolute inset-0 
          bg-gradient-to-t from-black via-black/60 to-transparent
          opacity-70 group-hover:opacity-100 transition duration-500
        " />

        {/* ▶ CENTER PLAY BUTTON */}
        <div className="
          absolute inset-0 flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition duration-500
        ">
          <div className="
            bg-white/90 text-black 
            p-3 rounded-full 
            scale-75 group-hover:scale-100
            transition duration-300
            shadow-xl
          ">
            <FaPlay size={14} />
          </div>
        </div>

        {/* 🎬 CONTENT */}
        <div className="
          absolute bottom-0 left-0 w-full p-4
          translate-y-6 group-hover:translate-y-0
          opacity-0 group-hover:opacity-100
          transition-all duration-500
        ">

          {/* TITLE */}
          <h3 className="text-sm font-semibold leading-tight line-clamp-1">
            {movie.title}
          </h3>

          {/* META */}
          <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
            <span className="text-green-400 font-semibold">
              ⭐ {movie.rating}
            </span>
            <span>• {movie.duration}</span>
          </div>

          {/* GENRES */}
          <div className="flex flex-wrap gap-1 text-[10px] text-gray-400 mt-1">
            {movie.genre?.slice(0, 2).map((g: string) => (
              <span key={g}>• {g}</span>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 mt-3">

            {/* PLAY */}
            <button
              onClick={(e) => e.preventDefault()}
              className="
                flex items-center gap-1
                bg-white text-black px-3 py-1 rounded text-xs font-medium
                hover:bg-gray-200 transition
              "
            >
              <FaPlay size={10} />
              Play
            </button>

            {/* WATCHLIST */}
            <button
              onClick={(e) => e.preventDefault()}
              className="
                flex items-center gap-1
                bg-white/10 backdrop-blur px-3 py-1 rounded text-xs
                hover:bg-white/20 transition
              "
            >
              <FaPlus size={10} />
            </button>

          </div>
        </div>

        {/* 💎 HOVER SHADOW */}
        <div className="
          absolute inset-0 rounded-xl
          shadow-[0_0_0_0_rgba(0,0,0,0)]
          group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)]
          transition duration-500
        " />

      </div>
    </Link>
  );
}