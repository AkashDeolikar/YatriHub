import { Place } from "../types/place";

export const places: Place[] = [
  {
    id: "1",
    name: "Futala Lake",
    city: "Nagpur",
    description: "Famous lake with beautiful sunset view",
    rating: 4.5,
    timeRequired: "1-2 hours",
    tags: ["sunset", "couples", "photography"],
    bestTime: "Evening",
    distance: 3.2,
    image: "/images/futala.jpg",
  },
  {
    id: "2",
    name: "Ambazari Lake",
    city: "Nagpur",
    description: "Perfect for relaxing and walking",
    rating: 4.2,
    timeRequired: "2 hours",
    tags: ["family", "nature"],
    bestTime: "Morning",
    distance: 5,
    image: "/images/ambazari.jpg",
  },
];