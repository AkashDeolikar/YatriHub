import { Flight } from "../store/bookingStore";
export const calculatePrice = (
  basePricePerPerson: number,
  passengerCount: number
) => {
  const TAX_RATE = 0.12; // 12% GST/VAT
  const SERVICE_FEE = 250; 
  const FUEL_SURCHARGE = 400;

  const subtotal = basePricePerPerson * passengerCount;
  const taxes = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxes + SERVICE_FEE + FUEL_SURCHARGE;

  return {
    base: subtotal,
    taxes,
    fees: SERVICE_FEE + FUEL_SURCHARGE,
    total,
    currency: "INR"
  };
};
// export const calculatePrice = (
//   basePrice: number,
//   passengers: number
// ) => {

//   const taxes = 450
//   const fee = 200

//   const total = (basePrice * passengers) + taxes + fee

//   return {
//     base: basePrice * passengers,
//     taxes,
//     fee,
//     total
//   }

// }