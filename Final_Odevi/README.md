# 🌍 IP Vision - Konum Takip Uygulaması

Bu proje, **Web Programcılığı** dersi final ödevi kapsamında React (Next.js) kullanılarak geliştirilmiş dinamik bir web uygulamasıdır. Kullanıcıların IP adreslerini sorgulayarak coğrafi konumlarını, internet sağlayıcılarını ve harita üzerindeki yerlerini anlık olarak gösterir.

## 🚀 Proje Özellikleri
- **Otomatik Algılama:** Site açıldığında kullanıcının kendi IP adresini ve konumunu otomatik olarak getirir.
- **Dinamik Sorgulama:** Kullanıcıdan alınan IP parametresi ile dünya üzerindeki herhangi bir adresin bilgilerine erişim sağlar.
- **Görsel Zenginlik:** Sorgulanan ülkenin bayrağını ve konumun Google Maps üzerindeki canlı haritasını gösterir.
- **Modern Arayüz:** Gece mavisi ve neon mavi detaylarla tasarlanmış, kullanıcı dostu karanlık tema.
- **Güvenli API Erişimi:** HTTPS/HTTP kısıtlamalarını aşmak için Next.js API Routes (Proxy) mimarisi kullanılmıştır.

## 🛠️ Kullanılan Teknolojiler
- **Framework:** [Next.js](https://nextjs.org/) (React tabanlı)
- **API:** [ip-api.com](http://ip-api.com) (Açık API)
- **Stil:** Özel CSS (Neon Dark Theme)
- **Harita:** Google Maps Embed API
- **Yayın (Deployment):** Vercel

## 🔗 Kullanılan API Bilgisi
Projede kullanılan veriler ücretsiz ve açık kaynaklı olan **ip-api** servisinden çekilmektedir.
- **API Linki:** [http://ip-api.com](http://ip-api.com)

## 📦 Kurulum ve Çalıştırma
Projeyi yerel bilgisayarınızda çalıştırmak için şu adımları izleyin:

1. Projeyi bilgisayarınıza indirin veya clone'layın.
2. Terminal üzerinden proje klasörüne gidin.
3. Gerekli paketleri kurun:
   ```bash
   npm install
