export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  const res = await fetch(`https://api.erail.in/v1/stations?search=${encodeURIComponent(name)}&apikey=${process.env.ERAIL_API_KEY}`);
  const data = await res.json();

  return Response.json({ code: data.stations[0]?.code ?? null });
}