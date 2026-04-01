import { apiClient } from "../../../services/apiClient";

export const createPayment = (data: {
  amount: number;
  currency: string;
  provider: "razorpay" | "stripe";
  bookingId: string;
}) => {
  return apiClient.post("/payments/create", data);
};
