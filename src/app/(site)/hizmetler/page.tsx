import type { Metadata } from "next";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import HomeCTA from "@/components/HomeCTA";
import PageHero from "@/components/PageHero";
import { listPublishedServices } from "@/lib/queries/services";
import { listFaqs } from "@/lib/queries/content";
import { getPageContent } from "@/lib/pageContent";
import { readSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Hizmetler",
  description: "Sosyal medya yönetimi, dijital strateji, içerik üretimi, reklam yönetimi, prodüksiyon, drone çekimi, canlı yayın ve senaryo yazımı hizmetlerimiz.",
};

export const dynamic = "force-dynamic";

export default async function HizmetlerPage() {
  const [services, faqs, c, home, contact] = await Promise.all([
    listPublishedServices(),
    listFaqs(),
    getPageContent("hizmetler"),
    getPageContent("anasayfa"),
    readSettings(["contact.whatsapp", "contact.phone"]),
  ]);
  const waRaw = (contact["contact.whatsapp"] as string) || (contact["contact.phone"] as string) || "";
  const whatsappHref = waRaw ? `https://wa.me/${waRaw.replace(/[^0-9]/g, "")}` : "#";

  return (
    <>
      <PageHero
        eyebrow={c["hizmetler.hero.eyebrow"]}
        title={c["hizmetler.hero.title"]}
        titleHighlight={c["hizmetler.hero.title_highlight"]}
        subtitle={c["hizmetler.hero.subtitle"]}
        image={c["hizmetler.hero.image"]}
      />

      <Services items={services} />
      <FAQ items={faqs} />
      <HomeCTA
        title={home["home.cta.title"]}
        titleHighlight={home["home.cta.title_highlight"]}
        subtitle={home["home.cta.subtitle"]}
        primaryLabel={home["home.cta.primary_label"]}
        primaryHref={home["home.cta.primary_href"]}
        whatsappLabel={home["home.cta.whatsapp_label"]}
        whatsappHref={whatsappHref}
      />
    </>
  );
}
