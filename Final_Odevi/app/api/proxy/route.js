// Final_Odevi/app/api/proxy/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let ip = searchParams.get('ip');

  // Eğer kullanıcı bir IP girmediyse (ilk açılış), 
  // Vercel üzerinden gelen gerçek kullanıcı IP'sini (x-forwarded-for) al.
  if (!ip) {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
      ip = forwarded.split(',')[0]; // Birden fazla IP varsa ilkini al
    } else {
      ip = ""; // Bulunamazsa boş bırak (ip-api sunucu IP'sini döndürür)
    }
  }

  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=66846719`);
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ status: "fail", message: "Veri çekilemedi" }, { status: 500 });
  }
}
