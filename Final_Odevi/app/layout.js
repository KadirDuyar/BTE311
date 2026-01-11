import "../styles/globals.css";

export const metadata = {
  title: "IP Sorgulama",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
