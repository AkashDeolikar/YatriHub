export interface Experience {
  id: number;
  name: string;
  category: "Discovery" | "Wellness" | "Adventure" | "Culinary";
  price: number;
  rating: number;
  type: string;
  duration: string;
  image: string;
  tags: string[];
  availableSlots: string[];
  description: string;
}

export interface BookingDetails {
  experienceId: number;
  date: string;
  slot: string;
  guests: number;
  totalPrice: number;
}