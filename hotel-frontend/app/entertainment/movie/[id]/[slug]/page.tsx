"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay, FaPlus } from "react-icons/fa";
import { movies } from "../../../data/movies";
import MovieRow from "../../../components/MovieRow";

export default function MovieDetails() {
  const { slug } = useParams();
  const router = useRouter();

  const movie = movies.find((m) => m.slug === slug);

  if (!movie) {
    return <div className="text-white p-10">Movie not found</div>;
  }

  const similar = movies.filter(
    (m) =>
      m.slug !== movie.slug &&
      m.genre?.some((g: string) => movie.genre.includes(g))
  );

  return (
    <div className="bg-black text-white">

      {/* 🎥 HERO */}
      <div className="relative h-[85vh] w-full overflow-hidden">

        {/* VIDEO / IMAGE */}
        {movie.trailer ? (
          <iframe
            src={`${movie.trailer}?autoplay=1&mute=1&controls=0&loop=1`}
            className="absolute w-full h-full object-cover scale-110"
            allow="autoplay; encrypted-media"
          />
        ) : (
          <Image
            src={movie.image}
            alt={movie.title}
            fill
            priority
            className="object-cover scale-105"
          />
        )}

        {/* 🎬 CINEMATIC OVERLAYS */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* 🎯 FLOATING CONTENT */}
        <div className="absolute bottom-24 left-6 md:left-14 max-w-xl bg-black/40 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl">

          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            {movie.title}
          </h1>

          {/* META */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-3">
            <span className="text-green-400 font-semibold">
              ⭐ {movie.rating}
            </span>
            <span>• {movie.duration}</span>
            <span>• {movie.language}</span>
            <span className="border border-white/20 px-2 text-xs">HD</span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-300 text-sm line-clamp-3 mb-4">
            {movie.description}
          </p>

          {/* ACTIONS */}
          <div className="flex gap-3">
            <button
              onClick={() =>
                router.push(`/entertainment/booking/${movie.slug}`)
              }
              className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
            >
              <FaPlay />
              Book Now
            </button>

            <button className="flex items-center gap-2 bg-white/10 backdrop-blur px-6 py-2 rounded font-semibold hover:bg-white/20 transition">
              <FaPlus />
              My List
            </button>
          </div>
        </div>

        {/* FADE */}
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* 🎭 DETAILS */}
      <div className="px-6 md:px-14 py-12 space-y-8">

        {/* GENRES */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {movie.genre.map((g: string) => (
              <span
                key={g}
                className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-xs transition"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* INFO GRID */}
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-400">
          <div>
            <p className="text-gray-500">Language</p>
            <p className="text-white">{movie.language}</p>
          </div>

          <div>
            <p className="text-gray-500">Duration</p>
            <p className="text-white">{movie.duration}</p>
          </div>

          <div>
            <p className="text-gray-500">Votes</p>
            <p className="text-white">{movie.votes}</p>
          </div>
        </div>
      </div>

      {/* 🎬 SIMILAR */}
      {similar.length > 0 && (
        <div className="px-6 md:px-10 pb-16">
          <MovieRow title="More Like This" movies={similar} />
        </div>
      )}

      {/* 📱 MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-black/95 border-t border-white/10 p-4 flex justify-between items-center md:hidden">

        <div>
          <p className="text-sm font-semibold">{movie.title}</p>
          <p className="text-xs text-gray-400">⭐ {movie.rating}</p>
        </div>

        <button
          onClick={() =>
            router.push(`/entertainment/booking/${movie.slug}`)
          }
          className="bg-red-600 px-5 py-2 rounded font-semibold"
        >
          Book
        </button>
      </div>

    </div>
  );
}