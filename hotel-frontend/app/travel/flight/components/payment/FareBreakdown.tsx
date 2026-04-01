"use client";

interface Props {
  price: number;
  passengers: number;
}

export default function FareBreakdown({ price, passengers }: Props) {
  const taxes = 450;
  const fee = 200;
  const subtotal = price * passengers;
  const total = subtotal + taxes + fee;

  return (
    <div className="bg-[#121826] p-6 rounded-xl border border-white/5">
      <h3 className="text-lg mb-6 font-semibold">Price Details</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-gray-400">Base Fare (₹{price} × {passengers})</p>
          <p>₹{subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-400">Taxes & Surcharges</p>
          <p>₹{taxes}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-400">Convenience Fee</p>
          <p>₹{fee}</p>
        </div>
        <hr className="border-white/5 my-4"/>
        <div className="flex justify-between text-xl font-bold text-indigo-400">
          <p>Total Amount</p>
          <p>₹{total}</p>
        </div>
      </div>
    </div>
  );
}