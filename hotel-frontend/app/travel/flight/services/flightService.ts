import { Flight } from "../types/flight"

export const searchFlights = async (): Promise<Flight[]> => {

  const res = await fetch("http://localhost:3000/flights")

  if (!res.ok) {
    throw new Error("Failed to fetch flights")
  }

  return res.json()

}