import { Flight } from "../store/bookingStore";

export const MOCK_FLIGHTS: Flight[] = [
  {
    flightNo: "YH-101",
    airline: "Yatri Airways",
    from: "DEL",
    to: "BOM",
    dep: "2026-05-20T06:30:00Z",
    arr: "2026-05-20T09:30:00Z",
    basePrice: 4850
  },
  {
    flightNo: "YH-772",
    airline: "Yatri Airways",
    from: "DEL",
    to: "BOM",
    dep: "2026-05-20T14:15:00Z",
    arr: "2026-05-20T17:00:00Z",
    basePrice: 5900
  },
  {
    flightNo: "UK-943",
    airline: "Vistara",
    from: "DEL",
    to: "BOM",
    dep: "2026-05-20T18:00:00Z",
    arr: "2026-05-20T20:15:00Z",
    basePrice: 7200
  }
];

const simulateLatency = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * 🔍 SEARCH LOGIC
 * Added error handling and case-insensitivity.
 */
export async function searchFlights(searchData: { from: string; to: string }): Promise<Flight[]> {
  await simulateLatency(1200); // Increased slightly for "Aetherial" loading feel
  
  const results = MOCK_FLIGHTS.filter(
    f => f.from.toUpperCase() === searchData.from.toUpperCase() && 
         f.to.toUpperCase() === searchData.to.toUpperCase()
  );

  if (results.length === 0) {
    console.warn("No transit paths found for given coordinates.");
  }
  
  return results;
}

/**
 * 💳 BOOKING & GATEWAY
 * Simulates a secure handshake with the payment provider.
 */
export const bookFlight = async (bookingData: any, token: string) => {
  if (!token) throw new Error("UNAUTHORIZED_ACCESS_DENIED");

  await simulateLatency(2000); // Simulate processing the "Identity Node"
  
  return {
    bookingReference: `YH-${Math.random().toString(36).toUpperCase().substring(2, 8)}`,
    checkoutUrl: "https://checkout.yatrihub.com/mock_session",
    status: "PENDING_PAYMENT",
    timestamp: new Date().toISOString()
  };
};