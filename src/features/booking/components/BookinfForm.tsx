import DateSelector from "./DateSelector";
import type { Room } from "../types";

const rooms: Room[] = [
  { id: "1", name: "Deluxe", price: 5000 },
  { id: "2", name: "Suite", price: 9000 },
];

type Props = {
  onDates: (d: any) => void;
  onRoom: (r: Room) => void;
};

export default function BookingForm({ onDates, onRoom }: Props) {
  return (
    <>
      <DateSelector onSelect={onDates} />

      <h3>Select Room</h3>
      {rooms.map((room) => (
        <div key={room.id}>
          {room.name} – ₹{room.price}
          <button onClick={() => onRoom(room)}>Select</button>
        </div>
      ))}
    </>
  );
}
