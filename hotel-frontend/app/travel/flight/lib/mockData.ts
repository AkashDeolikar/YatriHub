import { Flight } from "../store/bookingStore";

export const MOCK_FLIGHTS: Flight[] = [
  {
    flightNo: "6E-203",
    airline: "IndiGo",
    from: "DEL",
    to: "BOM",
    dep: "2024-05-20T06:30:00Z",
    arr: "2024-05-20T09:30:00Z",
    basePrice: 4500
  },
  {
    flightNo: "AI-101",
    airline: "Air India",
    from: "DEL",
    to: "BOM",
    dep: "2024-05-20T10:00:00Z",
    arr: "2024-05-20T12:45:00Z",
    basePrice: 5200
  },
  {
    flightNo: "UK-943",
    airline: "Vistara",
    from: "DEL",
    to: "BOM",
    dep: "2024-05-20T18:00:00Z",
    arr: "2024-05-20T20:15:00Z",
    basePrice: 6800
  }
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function searchFlights(searchData: any): Promise<Flight[]> {
  await sleep(800); // Simulate network latency
  // Return mock data filtered by 'from' and 'to'
  return MOCK_FLIGHTS.filter(
    f => f.from.toLowerCase() === searchData.from.toLowerCase() && 
         f.to.toLowerCase() === searchData.to.toLowerCase()
  );
}

export const bookFlight = async (bookingData: any, token: string) => {
  await sleep(1200);
  return {
    id: "bk_" + Math.random().toString(36).substr(2, 9),
    url: "https://checkout.stripe.com/pay/mock_session", // Mock Stripe URL
    success: true
  };
};