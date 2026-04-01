"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Helper to auto-adjust map view based on markers
function MapController({ routePath }: { routePath: [number, number][] }) {
  const map = useMap();
  
  useEffect(() => {
    if (routePath.length > 1) {
      const bounds = L.latLngBounds(routePath);
      map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1.5 });
    }
  }, [routePath, map]);

  return null;
}

interface TrainMapProps {
  routePath: [number, number][];
  filteredTrains: any[];
}

export default function TrainMap({ routePath, filteredTrains }: TrainMapProps) {
  // Memoize icon to prevent re-renders
  const trainIcon = useMemo(() => new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/723/723631.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
  }), []);

  return (
    <MapContainer 
      center={routePath[0]} 
      zoom={6} 
      zoomControl={false} 
      className="h-full w-full grayscale-[0.2] brightness-[0.8]"
    >
      <TileLayer 
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      
      {routePath.length > 1 && (
        <Polyline 
          positions={routePath} 
          pathOptions={{
            color: "#6366f1",
            weight: 3,
            dashArray: "8, 12",
            lineCap: "round",
            opacity: 0.6
          }} 
        />
      )}
      
      {filteredTrains.map((train, idx) => (
        <Marker key={`${train.number}-${idx}`} position={train.path[0]} icon={trainIcon}>
          <Popup closeButton={false} className="custom-train-popup">
            <div className="p-2 min-w-[120px] font-sans">
              <div className="text-indigo-600 font-bold text-sm uppercase tracking-tighter">
                {train.name}
              </div>
              <div className="text-[10px] text-gray-500 font-mono">LIVE POSITION</div>
              <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-2/3 animate-pulse" />
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
      
      <MapController routePath={routePath} />
    </MapContainer>
  );
}