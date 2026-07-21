import type { Metadata } from "next";
import Contact from "@/components/Contact";
import PageHero from "@/components/PageHero";
import { readSettings } from "@/lib/settings";
import { listPublishedServices } from "@/lib/queries/services";
import { getPageContent } from "@/lib/pageContent";
import { pageSeo } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent("iletisim");
  return pageSeo({
    path: "/iletisim",
    title: c["iletisim.meta.title"],
    description: c["iletisim.meta.description"],
  });
}

export const dynamic = "force-dynamic";

export default async function IletisimPage() {
  const [settings, services, c] = await Promise.all([
    readSettings([
      "contact.phone",
      "contact.email",
      "contact.address",
      "social.instagram",
      "social.linkedin",
      "social.twitter",
      "social.youtube",
    ]),
    listPublishedServices(),
    getPageContent("iletisim"),
  ]);

  const serviceOptions = services.map((s) => ({ value: s.title, label: s.title }));
  const contact = {
    phone: (settings["contact.phone"] as string) || undefined,
    email: (settings["contact.email"] as string) || undefined,
    address: (settings["contact.address"] as string) || undefined,
  };
  const social = {
    instagram: (settings["social.instagram"] as string) || undefined,
    linkedin: (settings["social.linkedin"] as string) || undefined,
    twitter: (settings["social.twitter"] as string) || undefined,
    youtube: (settings["social.youtube"] as string) || undefined,
  };

  return (
    <>
      <PageHero
        eyebrow={c["iletisim.hero.eyebrow"]}
        title={c["iletisim.hero.title"]}
        titleHighlight={c["iletisim.hero.title_highlight"]}
        subtitle={c["iletisim.hero.subtitle"]}
        image={c["iletisim.hero.image"]}
      />

      <Contact serviceOptions={serviceOptions} contact={contact} social={social} />

      {/* Full-width Google Map */}
      <section className="relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0d1220] to-transparent z-10 pointer-events-none" />
        <div className="relative w-full h-[450px] lg:h-[500px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0!2d32.8!3d39.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU1JzU0LjAiTiAzMsKwNDcnNDUuNiJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Humor Creative Konum"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d1220] to-transparent z-10 pointer-events-none" />
      </section>
    </>
  );
}
