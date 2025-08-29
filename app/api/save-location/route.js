let lastLocation = null; // simple in-memory storage

export async function GET(req) {
  if (lastLocation) {
    return new Response(JSON.stringify(lastLocation), { status: 200 });
  }
  return new Response(JSON.stringify({ error: "No location found" }), { status: 404 });
}

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return new Response(JSON.stringify({ error: "Latitude and longitude required" }), {
      status: 400,
    });
  }

  // Save in memory
  lastLocation = { latitude: lat, longitude: lon };
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
