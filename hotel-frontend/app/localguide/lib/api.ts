import { places } from "../data/places";

export const getPlaces = async () => {
  return places;
};

export const getPlaceById = async (id: string) => {
  return places.find((p) => p.id === id);
};