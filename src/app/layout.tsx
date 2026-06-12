import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { getPageContent } from "@/lib/pageContent";
import { readSettings } from "@/lib/settings";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://www.humorkreatif.com";

const FALLBACK_DESCRIPTION =
  "Ankara merkezli kreatif ajans. Sosyal medya yönetimi, dijital strateji, içerik üretimi, reklam yönetimi, prodüksiyon, drone çekimi ve canlı yayın hizmetleri.";

export async function generateMetadata(): Promise<Metadata> {
  let brand: Record<string, string> = {};
  let settings: Record<string, unknown> = {};
  try {
    [brand, settings] = await Promise.all([
      getPageContent("marka"),
      readSettings(["seo.default_title", "seo.default_description"]),
    ]);
  } catch {
    // DB not reachable at build/SSG time; fall back to defaults.
  }
  const siteName = brand["brand.site_name"] || "Humor";
  const seoTitle = String(settings["seo.default_title"] ?? "").trim();
  const seoDescription = String(settings["seo.default_description"] ?? "").trim();
  // Either field can be empty — fall back to the other if so.
  const faviconRaw = (brand["brand.favicon"] || "").trim();
  const appleRaw = (brand["brand.apple_icon"] || "").trim();
  const favicon = faviconRaw || appleRaw || "/favicon.ico";
  const appleIcon = appleRaw || faviconRaw || "";

  // Home page (and any child without its own title) uses title.default verbatim
  // — admin's "Varsayılan Başlık" wins, then siteName-prefixed fallback.
  const defaultTitle =
    seoTitle || `${siteName} | Ankara Kreatif Ajans, Strateji, İçerik, Prodüksiyon`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description: seoDescription || FALLBACK_DESCRIPTION,
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
