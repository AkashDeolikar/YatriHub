import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "SkyBook Flights",
    template: "%s | SkyBook"
  },
  description: "Search and book flights quickly, securely and at the best price.",
  keywords: ["flights", "flight booking", "airline tickets", "SkyBook"],
};

export default function FlightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-white">

      {/* HEADER */}
      <header className="border-b border-gray-800 backdrop-blur-lg bg-[#0b0f19]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* BRAND */}
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">
              Hotel<span className="text-indigo-400">OS</span>
            </h1>
            <span className="text-indigo-400 text-sm">(SkyBook)</span>
          </Link>

          {/* NAVIGATION */}
          <nav className="flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link href="/flights" className="hover:text-white transition">
              Flights
            </Link>

            <Link href="/my-bookings" className="hover:text-white transition">
              My Bookings
            </Link>

            <Link href="/support" className="hover:text-white transition">
              Support
            </Link>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 gap-4">
          <p>© 2026 SkyBook Airlines. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>

            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}