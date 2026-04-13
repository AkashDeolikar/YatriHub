import { useState, useEffect } from 'react';

export const usePlaces = (coords: { lat: number; lng: number } | null) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!coords) return;
    setLoading(true);

    // Mock data for your local environment
    const data = [
      { id: '101', name: 'Ambazari Lake', category: 'Nature', distance: '1.2 km' },
      { id: '102', name: 'Futala Lake', category: 'Hangout', distance: '3.5 km' },
      { id: '103', name: 'Deekshabhoomi', category: 'Heritage', distance: '4.8 km' },
      { id: '104', name: 'Ramdaspeth Food Street', category: 'Food', distance: '2.1 km' },
    ];

    setTimeout(() => {
      setPlaces(data as any);
      setLoading(false);
    }, 1200);
  }, [coords]);

  return { places, loading };
};