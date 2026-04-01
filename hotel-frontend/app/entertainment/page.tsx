"use client";

import { useState } from "react";
import { movies } from "./data/movies";
import MovieRow from "./components/MovieRow";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import HeroBanner from "./components/HeroBanner";

export default function Entertainment() {
  const [search, setSearch] = useState("");

  const trending = movies.filter((m) => m.category === "Trending");
  const topRated = movies.filter((m) => m.category === "Top Rated");
  const nowShowing = movies.filter((m) => m.category === "Now Showing");
  const upcoming = movies.filter((m) => m.category === "Upcoming");

  // 🔍 search filter
  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  // 🎬 hero movie (first trending)
  const hero = trending[0];

  return (
    <div className="bg-black text-white min-h-screen">

      <div className="px-6">

        {/* 🔥 HERO */}
      <HeroBanner movies={movies.slice(0, 5)} />

        {/* 🔍 SEARCH RESULTS */}
        {search ? (
          <MovieRow title="Search Results" movies={filtered} />
        ) : (
          <>
            <MovieRow title="🔥 Trending Now" movies={trending} />
            <MovieRow title="⭐ Top Rated" movies={topRated} />
            <MovieRow title="🎟 Now Showing" movies={nowShowing} />
            <MovieRow title="🎬 Upcoming" movies={upcoming} />
          </>
        )}
      </div>
    </div>
  );
}