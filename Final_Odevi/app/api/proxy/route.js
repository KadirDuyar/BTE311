
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let ip = searchParams.get('ip');


  if (!ip) {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {

      ip = forwarded.split(',')[0].trim();
    } else {
      ip = ""; 
    }
  }

  try {

    const res = await fetch(`https://ipwho.is/${ip}`);
    const data = await res.json();
    
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
