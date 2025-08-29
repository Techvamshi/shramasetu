export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return new Response(JSON.stringify({ error: "Latitude and longitude are required" }), {
      status: 400,
    });
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: { "User-Agent": "nextjs-location-app/1.0" }, // Required by Nominatim
      }
    );
    const data = await response.json();

    return new Response(
      JSON.stringify({
        latitude: lat,
        longitude: lon,
        country: data.address.country,
        state: data.address.state,
        locality: data.address.city || data.address.town || data.address.village,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch location details" }), {
      status: 500,
    });
  }
}
