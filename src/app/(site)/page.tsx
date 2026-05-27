import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import ServicesCarousel from "@/components/ServicesCarousel";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import HomeCTA from "@/components/HomeCTA";
import SeoText from "@/components/SeoText";
import { listPublishedServices } from "@/lib/queries/services";
import { listStats, listTestimonials } from "@/lib/queries/content";
import { getPageContent } from "@/lib/pageContent";
import { readSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [services, stats, testimonials, c, contact] = await Promise.all([
    listPublishedServices(),
    listStats(),
    listTestimonials(),
    getPageContent("anasayfa"),
    readSettings(["contact.whatsapp", "contact.phone"]),
  ]);

  const whatsappRaw =
    (contact["contact.whatsapp"] as string) ||
    (contact["contact.phone"] as string) ||
    "";
  const whatsappHref = whatsappRaw
    ? `https://wa.me/${whatsappRaw.replace(/[^0-9]/g, "")}`
    : "#";

  return (
    <>
      <Hero
        eyebrow={c["home.hero.eyebrow"]}
        title={c["home.hero.title"]}
        subtitle={c["home.hero.subtitle"]}
        ctaPrimaryLabel={c["home.hero.cta_primary_label"]}
        ctaPrimaryHref={c["home.hero.cta_primary_href"]}
        ctaSecondaryLabel={c["home.hero.cta_secondary_label"]}
        ctaSecondaryHref={c["home.hero.cta_secondary_href"]}
        scrollLabel={c["home.hero.scroll_label"]}
      />
      <HomeAbout
        html={c["home.about.text"]}
        linkLabel={c["home.about.link_label"]}
        linkHref={c["home.about.link_href"]}
      />
      <ServicesCarousel items={services} />
      <Stats items={stats} />
      <Testimonials items={testimonials} />
      <HomeCTA
        title={c["home.cta.title"]}
        titleHighlight={c["home.cta.title_highlight"]}
        subtitle={c["home.cta.subtitle"]}
        primaryLabel={c["home.cta.primary_label"]}
        primaryHref={c["home.cta.primary_href"]}
        whatsappLabel={c["home.cta.whatsapp_label"]}
        whatsappHref={whatsappHref}
      />
      <SeoText html={c["home.seo_text"]} />
    </>
  );
}
