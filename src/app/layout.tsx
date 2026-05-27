import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://www.humorkreatif.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Humor | Ankara Kreatif Ajans, Strateji, İçerik, Prodüksiyon",
    template: "%s | Humor",
  },
  description:
    "Ankara merkezli kreatif ajans. Sosyal medya yönetimi, dijital strateji, içerik üretimi, reklam yönetimi, prodüksiyon, drone çekimi ve canlı yayın hizmetleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`scroll-smooth overflow-x-hidden ${manrope.variable}`}>
      <body
        className={`${manrope.variable} bg-[#0d1220] text-[#e8e9f0] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
