"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
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
    <div className="text-white">

      {/* 🎥 HERO SECTION */}
      <div className="relative h-[85vh] w-full">

        {/* VIDEO / IMAGE */}
        {movie.trailer ? (
          <iframe
            src={movie.trailer}
            className="absolute w-full h-full object-cover"
            allow="autoplay; encrypted-media"
          />
        ) : (
          <Image
            src={movie.image}
            alt={movie.title}
            fill
            className="object-cover"
          />
        )}

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* CONTENT */}
        <div className="absolute bottom-20 left-6 md:left-14 max-w-2xl space-y-4">

          <h1 className="text-4xl md:text-6xl font-extrabold">
            {movie.title}
          </h1>

          <div className="flex gap-3 text-sm text-gray-300">
            <span className="text-green-400 font-semibold">
              ⭐ {movie.rating}
            </span>
            <span>• {movie.duration}</span>
            <span>• {movie.language}</span>
          </div>

          <p className="text-gray-300 text-sm md:text-base">
            {movie.description}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() =>
                router.push(`/entertainment/booking/${movie.slug}`)
              }
              className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200"
            >
              <FaPlay />
              Book Now
            </button>
          </div>

        </div>

        {/* FADE */}
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* 🎭 DETAILS SECTION */}
      <div className="px-6 md:px-14 py-10 space-y-6">

        {/* GENRES */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Genres</h3>
          <div className="flex gap-2">
            {movie.genre.map((g: string) => (
              <span
                key={g}
                className="bg-zinc-800 px-3 py-1 rounded text-sm"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="text-sm text-gray-400 space-y-1">
          <p>Language: {movie.language}</p>
          <p>Votes: {movie.votes}</p>
          <p>Duration: {movie.duration}</p>
        </div>

      </div>

      {/* 🎬 SIMILAR MOVIES */}
      {similar.length > 0 && (
        <div className="px-6 md:px-10">
          <MovieRow title="More Like This" movies={similar} />
        </div>
      )}

    </div>
  );
}