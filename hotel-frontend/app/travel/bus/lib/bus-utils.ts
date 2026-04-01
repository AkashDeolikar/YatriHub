export const generateBookingId = () => `TXN-${Math.random().toString(36).toUpperCase().slice(2, 10)}`;
export const LOCATIONS = ["Mumbai", "Pune", "Goa", "Bangalore", "Hyderabad", "Delhi"];