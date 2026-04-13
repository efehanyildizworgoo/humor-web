import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const siteUrl = "https://www.humorkreatif.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Humor | Ankara Kreatif Ajans — Strateji, İçerik, Prodüksiyon",
    template: "%s | Humor",
  },
  description:
    "Ankara merkezli kreatif ajans. Sosyal medya yönetimi, dijital strateji, içerik üretimi, reklam yönetimi, prodüksiyon, drone çekimi ve canlı yayın hizmetleri.",
  keywords: [
    "kreatif ajans ankara",
    "sosyal medya yönetimi",
    "dijital strateji",
    "içerik üretimi",
    "reklam yönetimi",
    "prodüksiyon ankara",
    "drone çekimi",
    "video kurgulama",
    "canlı yayın",
    "senaryo yazımı",
    "humor creative",
    "humor kreatif",
    "ankara reklam ajansı",
  ],
  authors: [{ name: "Humor" }],
  creator: "Humor",
  publisher: "Humor",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Humor | Ankara Kreatif Ajans",
    description: "Strateji, içerik, prodüksiyon. Sınır yok, kalıp yok — sadece iyi fikir var.",
    url: siteUrl,
    siteName: "Humor",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Humor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humor | Ankara Kreatif Ajans",
    description: "Strateji, içerik, prodüksiyon. Sınır yok, kalıp yok — sadece iyi fikir var.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#organization`,
  name: "Humor",
  alternateName: "Humor Kreatif Ajans",
  description: "Ankara merkezli kreatif ajans. Sosyal medya, dijital strateji, içerik üretimi ve prodüksiyon hizmetleri.",
  url: siteUrl,
  telephone: "+90-540-006-55-44",
  email: "info@humorkreatif.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Beştepe Mah. 31. Sok. 2/B İç Kapı: 104",
    addressLocality: "Yenimahalle",
    addressRegion: "Ankara",
    addressCountry: "TR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 39.9334, longitude: 32.8597 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$",
  image: `${siteUrl}/og-image.jpg`,
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-[#0d1220] text-[#e8e9f0] antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
