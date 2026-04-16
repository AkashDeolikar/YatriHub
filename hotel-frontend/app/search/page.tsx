'use client';

import { motion } from "framer-motion";

export default function SearchPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050505] text-white px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          🚧 We’re Building This
        </h1>

        <p className="text-gray-400 max-w-md mx-auto">
          This feature is currently under development. We're working hard to bring you a world-class experience.
        </p>

        <div className="mt-6 text-sm text-gray-500">
          Stay tuned — something amazing is coming.
        </div>

        {/* Animated loader */}
        <div className="flex justify-center mt-8">
          <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      {/* ACTION */}
      <button
        onClick={() => window.history.back()}
        className="
            mt-6 px-5 py-2
            rounded-full
            bg-white/10 hover:bg-white/20
            border border-white/10
            text-sm text-white
            transition
          "
      >
        Go Back
      </button>
      </motion.div>


    </main>
  );
}