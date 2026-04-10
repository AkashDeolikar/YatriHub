// =========================
// FILE: components/navbar/NavLinks.tsx
// =========================
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/entertainment" },
  { label: "TV Shows", href: "/entertainment/tv" },
  { label: "Movies", href: "/entertainment/movies" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex gap-8">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm uppercase ${
            pathname === item.href ? "text-white" : "text-gray-400"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}