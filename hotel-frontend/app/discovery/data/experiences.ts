import { Experience } from "../types";

export const experiences: Experience[] = [
  { 
    id: 101, 
    name: "Heritage Night Walk", 
    category: "Discovery", 
    price: 1200, 
    rating: 4.9, 
    type: "Guided Tour", 
    duration: "3 hrs", 
    image: "https://images.unsplash.com/photo-1541432901042-2dad8fa9c7d1?q=80&w=1000",
    tags: ["Hidden Gem", "Photography"],
    availableSlots: ["06:00 PM", "09:00 PM"],
    description: "Explore historic streets and hidden local spots with an expert guide."
  },
  { 
    id: 102, 
    name: "Art District Tour", 
    category: "Discovery", 
    price: 1800, 
    rating: 4.7, 
    type: "Walking Tour", 
    duration: "2 hrs", 
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
    tags: ["Street Art", "Culture"],
    availableSlots: ["07:00 PM", "10:30 PM"],
    description: "Discover vibrant street art, galleries, and local creative culture."
  },
  { 
    id: 103, 
    name: "Sunset Rooftop Yoga", 
    category: "Wellness", 
    price: 1500, 
    rating: 4.8, 
    type: "Yoga Session", 
    duration: "1.5 hrs", 
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000",
    tags: ["Relaxation", "Premium"],
    availableSlots: ["05:30 PM"],
    description: "Relax your mind and body with a peaceful rooftop yoga session at sunset."
  },
  { 
    id: 104, 
    name: "Local Food Trail", 
    category: "Culinary", 
    price: 2200, 
    rating: 5.0, 
    type: "Food Tour", 
    duration: "4 hrs", 
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
    tags: ["Must Try", "Authentic"],
    availableSlots: ["12:00 PM", "07:00 PM"],
    description: "Taste authentic local dishes and explore the city’s best food spots."
  },
  { 
    id: 105, 
    name: "Meditation & Wellness Session", 
    category: "Wellness", 
    price: 3500, 
    rating: 4.9, 
    type: "Wellness", 
    duration: "45 mins", 
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000",
    tags: ["Mental Health", "Relaxation"],
    availableSlots: ["10:00 AM", "02:00 PM", "04:00 PM"],
    description: "Guided meditation session designed to help you relax and recharge."
  },
  { 
    id: 106, 
    name: "Skydiving Simulator", 
    category: "Adventure", 
    price: 4500, 
    rating: 4.6, 
    type: "Adventure", 
    duration: "1 hr", 
    image: "https://images.unsplash.com/photo-1521133573892-e44906baee46?q=80&w=1000",
    tags: ["Adrenaline", "Simulation"],
    availableSlots: ["11:00 AM", "03:30 PM"],
    description: "Experience the thrill of skydiving safely with a high-tech simulator."
  },
  { 
    id: 107, 
    name: "Mixology Workshop", 
    category: "Culinary", 
    price: 2800, 
    rating: 4.8, 
    type: "Workshop", 
    duration: "2.5 hrs", 
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000",
    tags: ["Drinks", "Nightlife"],
    availableSlots: ["08:00 PM", "11:00 PM"],
    description: "Learn to craft cocktails with professional mixologists."
  },
  { 
    id: 108, 
    name: "Racing Arena Experience", 
    category: "Adventure", 
    price: 5000, 
    rating: 4.9, 
    type: "Experience", 
    duration: "3 hrs", 
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000",
    tags: ["Exclusive", "Social"],
    availableSlots: ["10:00 PM"],
    description: "Enjoy an exclusive racing arena experience with live action and entertainment."
  }
];