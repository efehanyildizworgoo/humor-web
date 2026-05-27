import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { listNavItems, listFooterSections } from "@/lib/queries/content";
import { listPublishedServices } from "@/lib/queries/services";
import { readSettings } from "@/lib/settings";

const siteUrl = "https://www.humorkreatif.com";

export const metadata: Metadata = {
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
    description: "Strateji, içerik, prodüksiyon. Sınır yok, kalıp yok, sadece iyi fikir var.",
    url: siteUrl,
    siteName: "Humor",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Humor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humor | Ankara Kreatif Ajans",
    description: "Strateji, içerik, prodüksiyon. Sınır yok, kalıp yok, sadece iyi fikir var.",
    images: ["/og-image.jpg"],
  },
};

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navLinks, footerSections, services, settings] = await Promise.all([
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
  ]);

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
    name: "Humor",
    alternateName: "Humor Kreatif Ajans",
    description: "Ankara merkezli kreatif ajans. Sosyal medya, dijital strateji, içerik üretimi ve prodüksiyon hizmetleri.",
    url: siteUrl,
    telephone: (settings["contact.phone"] as string) || undefined,
    email: (settings["contact.email"] as string) || undefined,
    address: (settings["contact.address"] as string) || undefined,
    priceRange: "$$",
    image: `${siteUrl}/og-image.jpg`,
    sameAs: Object.values(social).filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar navLinks={navLinks} megaServices={megaServices} />
      <main>{children}</main>
      <Footer
        navLinks={navLinks}
        sections={footerSections}
        social={social}
        address={(settings["contact.address"] as string) || undefined}
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
