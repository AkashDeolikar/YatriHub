export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get("src");
  const dest = searchParams.get("dest");
  const date = searchParams.get("date");

  const res = await fetch(
    `https://api.erail.in/v1/trains?source=${src}&dest=${dest}&date=${date}&apikey=${process.env.ERAIL_API_KEY}`
  );

  const data = await res.json();
  return Response.json(data);
}