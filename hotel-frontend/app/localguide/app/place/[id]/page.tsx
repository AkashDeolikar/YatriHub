"use client";
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function PlaceDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-white">
      <div className="h-[50vh] bg-gray-900 relative">
        {/* Hero Image Section */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-12 left-12 text-white">
          <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-bold">TOP DESTINATION</span>
          <h1 className="text-6xl font-bold mt-4 uppercase tracking-tighter">Location ID: {id}</h1>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-3 gap-12">
        <div className="col-span-2">
          <h2 className="text-3xl font-bold mb-6">About this place</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Experience the best of the city here. This location is popular among travelers for its 
            unique atmosphere and cultural significance. 
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 h-fit">
          <h3 className="font-bold text-xl mb-4">Quick Info</h3>
          <ul className="space-y-4 text-gray-600">
            <li className="flex justify-between"><span>Open:</span> <b>24 Hours</b></li>
            <li className="flex justify-between"><span>Entry:</span> <b>Free</b></li>
            <li className="flex justify-between"><span>Type:</span> <b>Sightseeing</b></li>
          </ul>
        </div>
      </div>
    </div>
  );
}