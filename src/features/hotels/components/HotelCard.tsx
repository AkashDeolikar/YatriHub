import type { Hotel } from "../types";
import { useNavigate } from "react-router-dom";

interface Props {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="h-48 w-full object-cover rounded-t-xl"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{hotel.name}</h2>
        <p className="text-gray-500">{hotel.location}</p>

        <div className="flex justify-between items-center">
          <p className="font-bold text-blue-600">
            ₹{hotel.pricePerNight} / night
          </p>
          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
            ⭐ {hotel.rating}
          </span>
        </div>

        <button
          onClick={() => navigate("/booking")}
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
