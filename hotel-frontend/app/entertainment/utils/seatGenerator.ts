export function generateSeats(rows = 6, cols = 8) {
  const seats: any[] = [];

  for (let i = 0; i < rows; i++) {
    const rowLetter = String.fromCharCode(65 + i);

    for (let j = 1; j <= cols; j++) {
      let type = "Regular";
      let price = 200;

      if (i < 2) {
        type = "VIP";
        price = 400;
      } else if (i < 4) {
        type = "Premium";
        price = 300;
      }

      // deterministic booking (same seats always booked)
      const isBooked = (i + j) % 7 === 0;

      seats.push({
        id: `${rowLetter}${j}`,
        row: rowLetter,
        number: j,
        type,
        price,
        status: isBooked ? "booked" : "available",
      });
    }
  }

  return seats;
}