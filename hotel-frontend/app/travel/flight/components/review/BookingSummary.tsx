"use client"

interface Props {
  price: number
}

export default function FareBreakdown({ price }: Props) {

  const taxes = 450
  const fee = 200
  const total = price + taxes + fee

  return (

    <div className="bg-[#121826] p-6 rounded-xl">

      <h3 className="text-lg mb-4">Fare Breakdown</h3>

      <div className="flex justify-between">
        <p>Base Fare</p>
        <p>₹{price}</p>
      </div>

      <div className="flex justify-between">
        <p>Taxes</p>
        <p>₹{taxes}</p>
      </div>

      <div className="flex justify-between">
        <p>Convenience Fee</p>
        <p>₹{fee}</p>
      </div>

      <hr className="my-4"/>

      <div className="flex justify-between text-lg font-semibold">
        <p>Total</p>
        <p>₹{total}</p>
      </div>

    </div>

  )
}