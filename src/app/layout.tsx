import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { getPageContent } from "@/lib/pageContent";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://www.humorkreatif.com";

export async function generateMetadata(): Promise<Metadata> {
  let brand: Record<string, string> = {};
  try {
    brand = await getPageContent("marka");
  } catch {
    // DB not reachable at build/SSG time; fall back to defaults.
  }
  const siteName = brand["brand.site_name"] || "Humor";
  const favicon = brand["brand.favicon"] || "/favicon.ico";
  const appleIcon = brand["brand.apple_icon"] || "";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteName} | Ankara Kreatif Ajans, Strateji, İçerik, Prodüksiyon`,
      template: `%s | ${siteName}`,
    },
    description:
      "Ankara merkezli kreatif ajans. Sosyal medya yönetimi, dijital strateji, içerik üretimi, reklam yönetimi, prodüksiyon, drone çekimi ve canlı yayın hizmetleri.",
    icons: {
      icon: favicon,
      shortcut: favicon,
      ...(appleIcon ? { apple: appleIcon } : {}),
    },
  };
}

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
