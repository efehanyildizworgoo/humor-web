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
  // Site geneli, TÜM sayfalarca miras alınan alanlar (keywords/robots/icons).
  // Canonical ve OpenGraph her sayfada `pageSeo` ile ayrı üretilir — burada
  // set edilirlerse sığ-birleşme yüzünden ya yanlış (ana sayfa) canonical
  // miras kalır ya da sayfa OG'si onları ezerdi.
  let brand: Record<string, string> = {};
  try {
    brand = await getPageContent("marka");
  } catch {
    // DB hiccup — icons/robots defaults on düşer.
  }
  const faviconRaw = (brand["brand.favicon"] || "").trim();
  const appleRaw = (brand["brand.apple_icon"] || "").trim();
  const favicon = faviconRaw || appleRaw || "/favicon.ico";
  const appleIcon = appleRaw || faviconRaw || "";
  const siteName = brand["brand.site_name"] || "Humor";

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
    icons: {
      icon: favicon,
      shortcut: favicon,
      ...(appleIcon ? { apple: appleIcon } : {}),
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
      "whatsapp",
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
    title: s.menuLabel?.trim() || s.title,
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
      <Navbar whatsapp={(settings["contact.whatsapp"] as string) || (settings["whatsapp"] as string) || (settings["contact.phone"] as string)} navLinks={navLinks} megaServices={megaServices} logoUrl={logoUrl} siteName={siteName} />
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
