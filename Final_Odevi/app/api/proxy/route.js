// Final_Odevi/app/api/proxy/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get('ip') || ""; // Eğer IP boşsa kendi IP'ni çeker

  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=66846719`);
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ status: "fail", message: "Veri çekilemedi" }, { status: 500 });
  }
}
