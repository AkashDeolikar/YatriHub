"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
} from "react-icons/fa";

export default function MovieRow({ title, movies }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  // 🔥 Smooth hover (no flicker)
  const handleEnter = (id: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);

    hoverTimer.current = setTimeout(() => {
      setHoveredId(id);
    }, 150);
  };

  const handleLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHoveredId(null);
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    const width = scrollRef.current.clientWidth;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -width * 0.9 : width * 0.9,
      behavior: "smooth",
    });
  };

  const scrollToCenter = (el: HTMLDivElement | null) => {
    if (!el || !scrollRef.current) return;

    const container = scrollRef.current;

    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const offset =
      elRect.left -
      containerRect.left -
      containerRect.width / 2 +
      elRect.width / 2;

    container.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-24 relative group">

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-6 px-3 transition group-hover:translate-x-2">
        {title}
      </h2>

      {/* FADE EDGES */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-30 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-30 pointer-events-none" />

      {/* NAV */}
      <button
        onClick={() => scroll("left")}
        className="hidden group-hover:flex absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-black/60 backdrop-blur-md p-3 rounded-full hover:bg-black transition"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => scroll("right")}
        className="hidden group-hover:flex absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-black/60 backdrop-blur-md p-3 rounded-full hover:bg-black transition"
      >
        <FaChevronRight />
      </button>

      {/* ROW */}
      <div
        ref={scrollRef}
        className="
        flex gap-6 overflow-x-auto scrollbar-hide
        px-10 pb-28
        snap-x snap-mandatory
        scroll-smooth
        "
      >
        {movies.map((movie: any, index: number) => {
          const isHovered = hoveredId === movie.id;

          return (
            <div
              key={movie.id}
              onMouseEnter={() => handleEnter(movie.id)}
              onMouseLeave={handleLeave}
              className={`relative min-w-[220px] h-[320px] flex-shrink-0 snap-center transition-all duration-500
              ${hoveredId && hoveredId !== movie.id ? "opacity-40 scale-95" : "opacity-100"}
              `}
              style={{
                zIndex: isHovered ? 50 : 10 - index,
              }}
            >
              {/* 🎬 CARD */}
              <div
                onClick={() =>
                  router.push(`/entertainment/movie/${movie.slug}`)
                }
                className={`absolute inset-0 rounded-xl overflow-hidden transition-all duration-500 ease-out
                ${isHovered ? "w-[420px] shadow-[0_25px_80px_rgba(0,0,0,0.9)]" : "w-full"}
                `}
              >
                {/* 🎥 IMAGE / VIDEO */}
                {isHovered && movie.trailer?.includes("youtube") ? (
                  <iframe
                    src={`${movie.trailer}&autoplay=1&mute=1&controls=0`}
                    className="absolute w-full h-full object-cover scale-110 pointer-events-none"
                    allow="autoplay; encrypted-media"
                  />
                ) : (
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className={`object-cover transition-all duration-500
                    ${isHovered ? "scale-110 brightness-50" : "scale-100"}
                    `}
                  />
                )}

                {/* 🎯 GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

                {/* 🎯 LEFT CONTENT */}
                <div
                  className={`absolute left-0 top-0 h-full w-[55%] p-5 flex flex-col justify-end
                  transition-all duration-500
                  ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                  `}
                >
                  <h3 className="text-lg font-bold leading-tight">
                    {movie.title}
                  </h3>

                  <p className="text-green-400 text-sm mt-1">
                    ⭐ {movie.rating}
                  </p>

                  <p className="text-xs text-gray-300">
                    {movie.duration}
                  </p>

                  {/* GENRES */}
                  <div className="flex flex-wrap gap-1 text-[10px] text-gray-400 mt-1">
                    {movie.genre?.slice(0, 3).map((g: string) => (
                      <span key={g}>• {g}</span>
                    ))}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/entertainment/booking/${movie.slug}`
                        );
                      }}
                      className="bg-white text-black px-3 py-1 text-xs rounded flex items-center gap-1 hover:bg-gray-200 transition"
                    >
                      <FaPlay size={10} />
                      Play
                    </button>

                    <button className="bg-gray-700/70 px-3 py-1 text-xs rounded hover:bg-gray-600 transition">
                      + Watchlist
                    </button>
                  </div>
                </div>

                {/* RIGHT SHIFT */}
                <div
                  className={`absolute right-0 top-0 h-full transition-all duration-500
                  ${isHovered ? "w-[50%]" : "w-full"}
                  `}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}