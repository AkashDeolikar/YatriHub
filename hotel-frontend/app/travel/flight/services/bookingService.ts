export const createBooking = async (data: any) => {

  const res = await fetch("http://localhost:3000/flights/book", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(data)

  })

  if (!res.ok) {
    throw new Error("Booking failed")
  }

  return res.json()

}