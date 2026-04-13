import { PlaceCard } from './PlaceCard';

export const PlaceGrid = ({ places }: { places: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {places.map((place) => (
      <PlaceCard key={place.id} place={place} />
    ))}
  </div>
);