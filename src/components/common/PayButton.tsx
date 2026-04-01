type Props = {
  bookingId: string;
};

export function PayButton({ bookingId }: Props) {
  const handlePay = async () => {
    const res = await fetch("http://localhost:3000/payments/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId }),
    });

    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <button onClick={handlePay}>
      Pay Now
    </button>
  );
}
