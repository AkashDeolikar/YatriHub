export const calculatePrice = (
  basePrice: number,
  passengers: number
) => {

  const taxes = 450
  const fee = 200

  const total = (basePrice * passengers) + taxes + fee

  return {
    base: basePrice * passengers,
    taxes,
    fee,
    total
  }

}