export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let ip = searchParams.get('ip') || "";

  try {
    // ip-api yerine ipwho.is kullanıyoruz (Daha hızlı ve HTTPS dostu)
    const res = await fetch(`https://ipwho.is/${ip}`);
    const data = await res.json();
    
    // ipwho.is formatına göre veriyi düzenleyelim
    const formattedData = {
      status: data.success ? "success" : "fail",
      country: data.country,
      countryCode: data.country_code,
      city: data.city,
      regionName: data.region,
      isp: data.connection?.isp,
      query: data.ip,
      lat: data.latitude,
      lon: data.longitude
    };

    return Response.json(formattedData);
  } catch (error) {
    return Response.json({ status: "fail" }, { status: 500 });
  }
}
