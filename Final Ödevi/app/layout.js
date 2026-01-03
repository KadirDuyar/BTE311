import "../styles/globals.css";

export const metadata = {
  title: "IP Vision - Geolocation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
