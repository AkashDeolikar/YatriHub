"use client";

import Link from "next/link";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

export default function MovieCard({ movie }: any) {
  return (
    <Link href={`/entertainment/movie/${movie.slug}`}>
      <div className="relative min-w-[200px] h-[300px] rounded-xl overflow-hidden cursor-pointer group netflix-card">

        {/* IMAGE */}
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          sizes="200px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300" />

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 w-full p-3 netflix-gradient opacity-0 group-hover:opacity-100 transition duration-300">
          <h3 className="text-sm font-semibold">{movie.title}</h3>
          <p className="text-xs text-gray-300">⭐ {movie.rating}</p>

          <button className="mt-2 flex items-center gap-2 bg-white text-black px-3 py-1 text-xs rounded hover:bg-gray-200">
            <FaPlay size={10} />
            Play
          </button>
        </div>
      </div>
    </Link>
  );
}