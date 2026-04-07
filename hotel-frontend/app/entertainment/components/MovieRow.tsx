"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

export default function MovieRow({ title, movies }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -800 : 800,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-28 relative group">

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-6 px-4 group-hover:translate-x-2 transition">
        {title}
      </h2>

      {/* NAV */}
      <button
        onClick={() => scroll("left")}
        className="opacity-0 group-hover:opacity-100 absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-black/60 p-3 rounded-full"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => scroll("right")}
        className="opacity-0 group-hover:opacity-100 absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-black/60 p-3 rounded-full"
      >
        <FaChevronRight />
      </button>

      {/* ROW */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide px-10 pb-20"
      >
        {movies.map((movie: any, index: number) => {
          const isHovered = hoveredId === movie.id;

          return (
            <div
              key={movie.id}
              onMouseEnter={() => setHoveredId(movie.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative flex-shrink-0 transition-all duration-500 ease-out
              ${isHovered ? "z-50 scale-125" : "z-10 scale-100"}
              ${
                hoveredId && hoveredId !== movie.id
                  ? "opacity-40 blur-[2px]"
                  : "opacity-100"
              }
              `}
            >
              {/* CARD */}
              <div
                onClick={() =>
                  router.push(`/entertainment/movie/${movie.slug}`)
                }
                className="relative w-[200px] h-[300px] rounded-xl overflow-hidden cursor-pointer"
              >
                {/* IMAGE */}
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  className="object-cover transition duration-500"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* HOVER CONTENT */}
                <div
                  className={`absolute bottom-0 p-4 w-full transition-all duration-500
                  ${
                    isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <h3 className="text-sm font-semibold">
                    {movie.title}
                  </h3>

                  <p className="text-xs text-gray-300">
                    ⭐ {movie.rating} • {movie.duration}
                  </p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/entertainment/booking/${movie.slug}`
                        );
                      }}
                      className="bg-white text-black px-3 py-1 text-xs rounded flex items-center gap-1"
                    >
                      <FaPlay size={10} />
                      Play
                    </button>

                    <button className="bg-gray-700/70 px-3 py-1 text-xs rounded">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}