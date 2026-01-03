import { useState, useEffect } from 'react';

export default function Content() {
  const [ipData, setIpData] = useState(null);
  const [searchIp, setSearchIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIpData = async (ip = "") => {
    setLoading(true);
    setError(null);
    try {
      // ip-api.com boş bırakılırsa istek atan kişinin IP'sini döner
      const res = await fetch(`http://ip-api.com/json/${ip}?fields=66846719`);
      const data = await res.json();
      
      if (data.status === "fail") throw new Error("Geçersiz IP veya veri bulunamadı.");
      setIpData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // İlk girişte kullanıcının kendi IP'sini getirir
  useEffect(() => {
    fetchIpData();
  }, []);

  return (
    <div className="content">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="IP Adresi giriniz (örn: 8.8.8.8)" 
          value={searchIp}
          onChange={(e) => setSearchIp(e.target.value)}
        />
        <button onClick={() => fetchIpData(searchIp)}>Sorgula</button>
      </div>

      {loading && <div className="loading">Veriler çekiliyor...</div>}
      {error && <div className="error">⚠️ {error}</div>}

      {ipData && !loading && !error && (
        <div className="result-grid">
          {/* Sol Panel: Bilgiler */}
          <div className="info-card">
            <div className="flag-wrapper">
              <img 
                src={`https://flagcdn.com/w160/${ipData.countryCode.toLowerCase()}.png`} 
                alt="Ülke Bayrağı" 
              />
              <h2 className="neon-text">{ipData.country}</h2>
            </div>
            <div className="details">
              <p><strong>Şehir:</strong> {ipData.city}</p>
              <p><strong>Bölge:</strong> {ipData.regionName}</p>
              <p><strong>İnternet Sağlayıcı:</strong> {ipData.isp}</p>
              <p><strong>IP Adresi:</strong> {ipData.query}</p>
              <p><strong>Koordinat:</strong> {ipData.lat}, {ipData.lon}</p>
            </div>
          </div>

          {/* Sağ Panel: Harita (Google Maps Embed) */}
          <div className="map-card">
            <iframe 
              title="map"
              width="100%" 
              height="300" 
              src={`https://maps.google.com/maps?q=${ipData.lat},${ipData.lon}&z=10&output=embed`}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
