import type { DateRange } from "../types";

type Props = {
  onSelect: (dates: DateRange) => void;
};

export default function DateSelector({ onSelect }: Props) {
  return (
    <div>
      <h3>Select Dates</h3>

      <input
        type="date"
        onChange={(e) =>
          onSelect({ checkIn: e.target.value, checkOut: "" })
        }
      />

      <input
        type="date"
        onChange={(e) =>
          onSelect({ checkIn: "", checkOut: e.target.value })
        }
      />
    </div>
  );
}
