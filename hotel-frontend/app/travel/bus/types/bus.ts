export interface Route {
  from: string;
  to: string;
  date: string;
}

export interface Bus {
  id: number;
  name: string;
  busNo: string;
  type: string;
  departure: string;
  arrival: string;
  price: number;
  origin: string;
  destination: string;
}

export interface Passenger {
  name: string;
  age: string;
  gender: string;
}