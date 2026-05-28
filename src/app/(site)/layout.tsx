import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { listNavItems, listFooterSections } from "@/lib/queries/content";
import { listPublishedServices } from "@/lib/queries/services";
import { readSettings } from "@/lib/settings";
import { getPageContent } from "@/lib/pageContent";

const siteUrl = "https://www.humorkreatif.com";

const KEYWORDS = [
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
];

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getPageContent("marka");
  const ogImage = brand["brand.og_image"] || "/og-image.jpg";
  const faviconRaw = (brand["brand.favicon"] || "").trim();
  const appleRaw = (brand["brand.apple_icon"] || "").trim();
  const favicon = faviconRaw || appleRaw || "/favicon.ico";
  const appleIcon = appleRaw || faviconRaw || "";
  const siteName = brand["brand.site_name"] || "Humor";
  const ogTitle = brand["brand.og_title"] || "Humor | Ankara Kreatif Ajans";
  const ogDescription =
    brand["brand.og_description"] ||
    "Strateji, içerik, prodüksiyon. Sınır yok, kalıp yok, sadece iyi fikir var.";

  return {
    keywords: KEYWORDS,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
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
    icons: {
      icon: favicon,
      shortcut: favicon,
      ...(appleIcon ? { apple: appleIcon } : {}),
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: siteUrl,
      siteName,
      locale: "tr_TR",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navLinks, footerSections, services, settings, brand] = await Promise.all([
    listNavItems(),
    listFooterSections(),
    listPublishedServices(),
    readSettings([
      "contact.phone",
      "contact.whatsapp",
      "contact.email",
      "contact.address",
      "social.instagram",
      "social.linkedin",
      "social.twitter",
      "social.youtube",
    ]),
    getPageContent("marka"),
  ]);

  const logoUrl = brand["brand.logo_white"] || "/logo-white.svg";
  const siteName = brand["brand.site_name"] || "Humor";
  const ogImage = brand["brand.og_image"] || "/og-image.jpg";

  const megaServices = services.map((s) => ({
    icon: s.icon,
    title: s.title,
    desc: s.shortDesc || s.description.slice(0, 60),
    href: `/hizmetler/${s.slug}`,
  }));

  const social = {
    instagram: (settings["social.instagram"] as string) || undefined,
    linkedin: (settings["social.linkedin"] as string) || undefined,
    twitter: (settings["social.twitter"] as string) || undefined,
    youtube: (settings["social.youtube"] as string) || undefined,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    alternateName: `${siteName} Kreatif Ajans`,
    description: "Ankara merkezli kreatif ajans. Sosyal medya, dijital strateji, içerik üretimi ve prodüksiyon hizmetleri.",
    url: siteUrl,
    telephone: (settings["contact.phone"] as string) || undefined,
    email: (settings["contact.email"] as string) || undefined,
    address: (settings["contact.address"] as string) || undefined,
    priceRange: "$$",
    image: ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`,
    sameAs: Object.values(social).filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar navLinks={navLinks} megaServices={megaServices} logoUrl={logoUrl} siteName={siteName} />
      <main>{children}</main>
      <Footer
        navLinks={navLinks}
        sections={footerSections}
        social={social}
        address={(settings["contact.address"] as string) || undefined}
        logoUrl={logoUrl}
        siteName={siteName}
      />
      <WhatsAppButton
        phone={
          ((settings["contact.whatsapp"] as string) ||
            (settings["contact.phone"] as string) ||
            "") as string
        }
      />
    </>
  );
}
