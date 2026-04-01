"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { movies } from "../../data/movies";
import { FaArrowLeft } from "react-icons/fa";

export default function MovieDetails() {
  const { slug } = useParams();
  const router = useRouter();

  const movie = movies.find((m) => m.slug === slug);

  if (!movie) {
    return (
      <div className="text-white p-6">
        Movie not found
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-6 space-y-6">

      {/* 🔙 BACK */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-white"
      >
        <FaArrowLeft /> Back
      </button>

      {/* 🎬 HERO */}
      <div className="relative h-[400px] rounded-xl overflow-hidden">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-300">⭐ {movie.rating}</p>

          <button
            onClick={() =>
              router.push(`/entertainment/booking/${movie.slug}`)
            }
            className="mt-4 bg-red-600 px-6 py-2 rounded font-semibold hover:bg-red-700"
          >
            Book Tickets 🎟️
          </button>
        </div>
      </div>

      {/* 📄 DETAILS */}
      <div className="max-w-3xl">
        <p className="text-gray-300">{movie.description}</p>

        <div className="mt-4 text-sm text-gray-400 space-y-1">
          <p>Duration: {movie.duration}</p>
          <p>Language: {movie.language}</p>
          <p>Genre: {movie.genre.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}