# 🌍 IP VISION - Dinamik Geolocation Takip Sistemi

![Vercel Status](https://img.shields.io/website?url=https%3A%2F%2Fbte-311.vercel.app&label=Deployment&style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

**IP Vision**, kullanıcıların IP adreslerini gerçek zamanlı olarak sorgulayan, konum verilerini analiz eden ve görsel bir harita üzerinde sunan modern bir Web uygulamasıdır. 

---

## 📸 Uygulama Görünümü
![Uygulama Ana Sayfa](./public/screenshot.png)
*Gece mavisi ve neon detaylı modern "Dark Mode" arayüzü.*

---

## ✨ Öne Çıkan Özellikler

- 📍 **Otomatik IP Algılama:** Kullanıcı siteye girdiği an `x-forwarded-for` protokolü ile gerçek IP adresi ve konumu anında listelenir.
- 🔍 **Global Sorgulama:** Herhangi bir IPv4 adresini saniyeler içinde analiz eder.
- 🗺️ **Canlı Harita Entegrasyonu:** Google Maps Embed API ile koordinatları görselleştirir.
- 🛡️ **Gelişmiş API Proxy:** HTTPS kısıtlamalarını aşmak için sunucu taraflı (Server-side) veri çekme mimarisi kullanılmıştır.
- 📱 **Responsive Tasarım:** Mobil, tablet ve masaüstü cihazlarla tam uyumlu.

---

## 🖥️ Terminal Önizlemesi (Geliştirme Ortamı)

Uygulama yerel ortamda (`localhost:3000`) çalıştırıldığında terminal görüntüsü şu şekildedir:

```text
> ip-vision-app@0.1.0 dev
> next dev

   ▲ Next.js 14.x.x
   - Local:        http://localhost:3000
   - Environments: .env

 ✓ Ready in 1200ms
 ○ Compiling / ...
 ✓ Compiled in 450ms (165 modules)
 GET /api/proxy?ip= 200 in 150ms  <-- Otomatik IP tespiti başarılı!
