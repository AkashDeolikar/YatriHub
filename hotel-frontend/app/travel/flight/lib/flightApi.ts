import { Flight } from "../store/bookingStore";
import { MOCK_FLIGHTS } from "./mockData";

// Artificial delay to simulate network latency
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function searchFlights(searchData: any): Promise<Flight[]> {
  console.log("Mocking search for:", searchData);
  
  // Simulate network delay
  await sleep(1000);

  // Filter mock data based on input (optional)
  const filtered = MOCK_FLIGHTS.filter(
    (f) => f.from === searchData.from && f.to === searchData.to
  );

  // If no match found in mock, return all mock flights for testing purposes
  return filtered.length > 0 ? filtered : MOCK_FLIGHTS;
}

export const bookFlight = async (bookingData: any, token?: string) => {
  console.log("Mocking booking with data:", bookingData);
  
  await new Promise(r => setTimeout(r, 1500));

  // Return exactly what the component expects
  return {
    success: true,
    pnr: "MOCK" + Math.random().toString(36).substring(2, 6).toUpperCase(),
    message: "Booking confirmed (MOCK)",
    url: "/success" // Add this so the component can redirect
  };
};