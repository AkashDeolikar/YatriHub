import { motion } from 'framer-motion';
import Link from 'next/link';

export const PlaceCard = ({ place }: { place: any }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="group bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div className="relative h-64 w-full bg-gray-200 rounded-[1.5rem] overflow-hidden">
      {/* Placeholder for real images */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm">
        {place.distance}
      </div>
    </div>
    
    <div className="mt-6 px-2 pb-2">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-blue-600 font-bold text-xs tracking-widest uppercase">{place.category}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{place.name}</h3>
        </div>
      </div>
      <Link href={`/localguide/place/${place.id}`}>
        <button className="w-full mt-6 py-4 bg-black text-white rounded-2xl font-semibold hover:bg-zinc-800 transition-colors">
          Explore Details
        </button>
      </Link>
    </div>
  </motion.div>
);