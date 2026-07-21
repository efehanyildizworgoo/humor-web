import type { Metadata } from "next";
import Work from "@/components/Work";
import HomeCTA from "@/components/HomeCTA";
import PageHero from "@/components/PageHero";
import {
  listPublishedProjects,
  listPublishedProjectCategories,
} from "@/lib/queries/projects";
import { getPageContent } from "@/lib/pageContent";
import { readSettings } from "@/lib/settings";
import { pageSeo } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent("portfolio");
  return pageSeo({
    path: "/portfolio",
    title: c["portfolio.meta.title"],
    description: c["portfolio.meta.description"],
  });
}

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const [projects, categories, c, home, contact] = await Promise.all([
    listPublishedProjects(),
    listPublishedProjectCategories(),
    getPageContent("portfolio"),
    getPageContent("anasayfa"),
    readSettings(["contact.whatsapp", "contact.phone"]),
  ]);
  const waRaw = (contact["contact.whatsapp"] as string) || (contact["contact.phone"] as string) || "";
  const whatsappHref = waRaw ? `https://wa.me/${waRaw.replace(/[^0-9]/g, "")}` : "#";

  return (
    <>
      <PageHero
        eyebrow={c["portfolio.hero.eyebrow"]}
        title={c["portfolio.hero.title"]}
        titleHighlight={c["portfolio.hero.title_highlight"]}
        subtitle={c["portfolio.hero.subtitle"]}
        image={c["portfolio.hero.image"]}
      />

      <Work projects={projects} categories={categories} />
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
