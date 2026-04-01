"use client";

import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from 'leaflet';
import { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';

export default function MapComponent({ pickup, drop, fleet }: any) {
  const [route, setRoute] = useState<[number, number][]>([]);
  const [coords, setCoords] = useState({ 
    start: [19.076, 72.877] as [number, number], 
    end: null as [number, number] | null 
  });

  // Fetch real road path from OSRM
  useEffect(() => {
    const fetchRoute = async () => {
      if (!coords.start || !coords.end) return;
      
      const query = `${coords.start[1]},${coords.start[0]};${coords.end[1]},${coords.end[0]}`;
      try {
        const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${query}?overview=full&geometries=geojson`);
        const data = await res.json();
        if (data.routes && data.routes[0]) {
          const path = data.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]]);
          setRoute(path);
        }
      } catch (err) {
        console.error("Routing error:", err);
      }
    };
    fetchRoute();
  }, [coords]);

  return (
    <div className="h-full w-full bg-[#050505]">
      <MapContainer center={coords.start} zoom={13} zoomControl={false} className="h-full w-full grayscale invert opacity-90">
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        
        <Marker position={coords.start} />
        {coords.end && <Marker position={coords.end} />}
        
        {/* Real road polyline */}
        {route.length > 0 && (
          <Polyline positions={route} color="#6366f1" weight={5} opacity={0.7} lineJoin="round" />
        )}

        {fleet.map((cab: any) => (
          <Marker key={cab.id} position={cab.pos} />
        ))}
      </MapContainer>
    </div>
  );
}