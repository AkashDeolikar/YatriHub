export type DateRange = {
  checkIn: string;
  checkOut: string;
};

export type Room = {
  id: string;
  name: string;
  price: number;
};

export type Booking = {
  dates?: DateRange;
  room?: Room;
};
