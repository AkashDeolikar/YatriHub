"use client";

/**
 * PRODUCTION-GRADE UTILITIES
 * Focus: Type Safety, Collision Resistance, and Performance
 */

// 1. Enhanced ID Generation
// Using crypto.randomUUID() for high-entropy unique IDs or a custom nanoid approach.
export const generateBookingId = (prefix: "TXN" | "RES" | "SYS" = "TXN"): string => {
  // Use crypto for higher entropy than Math.random()
  const entropy = typeof window !== 'undefined' 
    ? window.crypto.randomUUID().split('-')[0].toUpperCase()
    : Math.random().toString(36).toUpperCase().slice(2, 10);
    
  const timestamp = Date.now().toString(36).toUpperCase();
  
  return `${prefix}-${timestamp}-${entropy}`;
};

// 2. Strongly Typed Locations
// Using 'as const' to allow TypeScript to treat these as literal types
export const LOCATIONS = [
  "MUMBAI",
  "PUNE",
  "GOA",
  "BANGALORE",
  "HYDERABAD",
  "DELHI",
  "CHENNAI",
  "AHMEDABAD",
  "KOLKATA",
  "JAIPUR"
] as const;

export type LocationNode = typeof LOCATIONS[number];

// 3. Location Metadata (The PaaS "Registry" Feel)
export interface NodeMetadata {
  id: string;
  label: string;
  region: string;
  timezone: string;
  active: boolean;
}

export const LOCATION_REGISTRY: Record<LocationNode, NodeMetadata> = {
  MUMBAI: { id: "BOM-01", label: "Mumbai", region: "in-west-1", timezone: "IST", active: true },
  PUNE: { id: "PNQ-02", label: "Pune", region: "in-west-1", timezone: "IST", active: true },
  GOA: { id: "GOI-04", label: "Goa", region: "in-west-2", timezone: "IST", active: true },
  BANGALORE: { id: "BLR-01", label: "Bangalore", region: "in-south-1", timezone: "IST", active: true },
  HYDERABAD: { id: "HYD-03", label: "Hyderabad", region: "in-south-2", timezone: "IST", active: true },
  DELHI: { id: "DEL-01", label: "Delhi", region: "in-north-1", timezone: "IST", active: true },
  CHENNAI: { id: "MAA-01", label: "Chennai", region: "in-south-3", timezone: "IST", active: true },
  AHMEDABAD: { id: "AMD-01", label: "Ahmedabad", region: "in-west-3", timezone: "IST", active: true },
  KOLKATA: { id: "CCU-01", label: "Kolkata", region: "in-east-1", timezone: "IST", active: true },
  JAIPUR: { id: "JAI-01", label: "Jaipur", region: "in-north-2", timezone: "IST", active: true },
};

// 4. Validation Helper
export const isValidRoute = (from: string, to: string): boolean => {
  return from !== to && LOCATIONS.includes(from as any) && LOCATIONS.includes(to as any);
};