export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: "card" | "upi" | "netbanking";
  status: "pending" | "success" | "failed";
}
