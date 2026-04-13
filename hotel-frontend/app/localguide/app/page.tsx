"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '../hooks/useLocation';
import { usePlaces } from '../hooks/usePlaces';
import { PlaceGrid } from '../components/place/PlaceGrid';
import Navbar from '../components/layout/Navbar';

export default function LocalGuideHome() {
  const { coords, error } = useLocation();
  const { places, loading } = usePlaces(coords);

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Navbar />
      <main className="max-w-[1400px] mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">Discover Local</h1>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl">
            Explore curated destinations and hidden gems near your current location. 
            Seamlessly integrated with your travel plans.
          </p>
        </motion.div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-8">
            Please enable location services to see nearby places.
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 font-medium">Scanning your surroundings...</p>
          </div>
        ) : (
          <PlaceGrid places={places} />
        )}
      </main>
    </div>
  );
}