import { useParams, useNavigate } from "react-router-dom";
import { hotels } from "../data";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const hotel = hotels.find((h) => h.id === id);

  if (!hotel) return <div>Hotel not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={hotel.image}
        className="w-full h-80 object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold mt-4">{hotel.name}</h1>
      <p className="text-gray-500">{hotel.location}</p>

      <p className="mt-4 text-lg">
        ₹{hotel.pricePerNight} / night
      </p>

      <button
        onClick={() => navigate("/booking")}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Book Now
      </button>
    </div>
  );
};

export default HotelDetails;
