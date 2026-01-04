// Final_Odevi/app/api/proxy/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let ip = searchParams.get('ip');

  // Eğer IP parametresi boşsa (ilk açılış), kullanıcının gerçek IP'sini bul
  if (!ip) {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
      // Vercel üzerinden gelen gerçek kullanıcı IP'sini al
      ip = forwarded.split(',')[0].trim();
    } else {
      ip = ""; // Header yoksa boş bırak (API sunucu konumunu döner)
    }
  }

  try {
    // HTTPS destekli ve hızlı ipwho.is kullanıyoruz
    const res = await fetch(`https://ipwho.is/${ip}`);
    const data = await res.json();
    
    const formattedData = {
      status: data.success ? "success" : "fail",
      country: data.country,
      countryCode: data.country_code,
      city: data.city,
      regionName: data.region,
      isp: data.connection?.isp,
      query: data.ip, // Kullanıcının IP adresi
      lat: data.latitude,
      lon: data.longitude
    };

    return Response.json(formattedData);
  } catch (error) {
    return Response.json({ status: "fail" }, { status: 500 });
  }
}
