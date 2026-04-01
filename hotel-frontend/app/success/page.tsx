"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

function SuccessContent() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/bookings");
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative bg-[#141414] w-full max-w-md rounded-2xl p-10 shadow-2xl border border-white/10"
    >
      {/* SUCCESS ICON */}
      <div className="flex justify-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
        >
          <FaCheck className="text-white text-3xl" />
        </motion.div>
      </div>

      {/* TEXT */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Booking Confirmed
        </h1>
        <p className="text-gray-400 text-sm">
          Your reservation has been successfully completed.
        </p>
      </div>

      {/* DETAILS */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 text-sm text-gray-300">
        <div className="flex justify-between">
          <span>Status</span>
          <span className="text-green-400 font-semibold">Confirmed</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Payment</span>
          <span className="text-white">Successful</span>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col gap-3">
        <Link
          href="/bookings"
          className="w-full bg-white text-black py-3 rounded-full text-sm font-semibold text-center hover:bg-gray-200 transition"
        >
          Go to My Bookings
        </Link>

        <Link
          href="/"
          className="w-full border border-white/20 text-gray-300 py-3 rounded-full text-sm font-semibold text-center hover:bg-white/10 transition"
        >
          Back to Home
        </Link>
      </div>

      {/* PROGRESS BAR */}
      <div className="mt-8">
        <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 8, ease: "linear" }}
            className="h-full bg-red-600"
          />
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          Redirecting in {countdown}s
        </p>
      </div>
    </motion.div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      
      {/* NETFLIX BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-black to-black/80" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-red-600/10 blur-[120px] rounded-full" />
      </div>

      <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}