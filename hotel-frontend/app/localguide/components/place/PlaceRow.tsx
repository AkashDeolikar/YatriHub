// import { PlaceCard } from "./PlaceCard";
// import { usePlaces } from "../../hooks/usePlaces";

// export default function PlaceRow({ title }: { title: string }) {
//   const { places } = usePlaces();

//   return (
//     <div className="mb-8">
//       <h2 className="text-xl font-bold mb-3">{title}</h2>

//       <div className="flex gap-4 overflow-x-auto scrollbar-hide">
//         {places.map((place) => (
//           <PlaceCard key={place.id} place={place} />
//         ))}
//       </div>
//     </div>
//   );
// }