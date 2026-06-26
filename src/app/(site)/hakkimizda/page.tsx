import type { Metadata } from "next";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import PageHero from "@/components/PageHero";
import { listStats, listTestimonials } from "@/lib/queries/content";
import { getPageContent } from "@/lib/pageContent";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent("hakkimizda");
  const title = c["hakkimizda.meta.title"];
  const description = c["hakkimizda.meta.description"];
  return { title, description, openGraph: { title, description } };
}

export const dynamic = "force-dynamic";

export default async function HakkimizdaPage() {
  const [stats, testimonials, c, home] = await Promise.all([
    listStats(),
    listTestimonials(),
    getPageContent("hakkimizda"),
    getPageContent("anasayfa"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={c["hakkimizda.hero.eyebrow"]}
        title={c["hakkimizda.hero.title"]}
        titleHighlight={c["hakkimizda.hero.title_highlight"]}
        subtitle={c["hakkimizda.hero.subtitle"]}
        image={c["hakkimizda.hero.image"]}
      />

      <About
        leftHtml={c["hakkimizda.about.left"]}
        rightHtml={c["hakkimizda.about.right"]}
        tagline={c["hakkimizda.about.tagline"]}
      />
      <Stats items={stats} />
      <Testimonials
        items={testimonials}
        eyebrow={home["home.testimonials_section.eyebrow"]}
        title={home["home.testimonials_section.title"]}
        titleHighlight={home["home.testimonials_section.title_highlight"]}
      />
    </>
  );
}
