import "server-only";
import { db } from "@/lib/db";
import {
  services,
  serviceKeywords,
  serviceIdealFor,
  serviceFeatures,
  serviceProcess,
  serviceFaqs,
  serviceGallery,
  serviceTestimonials,
} from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { htmlToPlainText } from "@/lib/sanitize";

export type PublicService = {
  id: number;
  slug: string;
  icon: string;
  title: string;
  shortDesc: string;
  heroImage: string;
  aboutImage: string;
  description: string;
  longDescription: string;
  whyUs: string;
  seoText: string;
  bannerText: string;
  keywords: string[];
  idealFor: string[];
  features: { title: string; text: string }[];
  process: { step: string; desc: string }[];
  faqs: { q: string; a: string }[];
  gallery: string[];
  testimonials: { name: string; title: string; text: string }[];
};

export type PublicServiceListItem = Pick<
  PublicService,
  "slug" | "icon" | "title" | "shortDesc" | "heroImage" | "description"
> & { keywords: string[] };

/** All published services in display order (with keywords for previews). */
export async function listPublishedServices(): Promise<PublicServiceListItem[]> {
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.published, true))
    .orderBy(asc(services.orderIndex), asc(services.id));

  if (rows.length === 0) return [];

  const ids = rows.map((r) => r.id);
  const kws = await db
    .select()
    .from(serviceKeywords)
    .orderBy(asc(serviceKeywords.serviceId), asc(serviceKeywords.orderIndex));
  const byService = new Map<number, string[]>();
  for (const k of kws) {
    if (!ids.includes(k.serviceId)) continue;
    const arr = byService.get(k.serviceId) ?? [];
    arr.push(k.keyword);
    byService.set(k.serviceId, arr);
  }

  return rows.map((r) => ({
    slug: r.slug,
    icon: r.icon,
    title: r.title,
    shortDesc: r.shortDesc,
    heroImage: r.heroImage,
    // description may contain HTML; for list previews give a plain-text excerpt.
    description: htmlToPlainText(r.description, 200),
    keywords: byService.get(r.id) ?? [],
  }));
}

/** Full service detail by slug — returns null if not found or unpublished. */
export async function getServiceBySlug(slug: string): Promise<PublicService | null> {
  const [s] = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug));

  if (!s || !s.published) return null;

  const [keywords, idealFor, features, process, faqs, gallery, testimonials] =
    await Promise.all([
      db.select().from(serviceKeywords).where(eq(serviceKeywords.serviceId, s.id)).orderBy(asc(serviceKeywords.orderIndex), asc(serviceKeywords.id)),
      db.select().from(serviceIdealFor).where(eq(serviceIdealFor.serviceId, s.id)).orderBy(asc(serviceIdealFor.orderIndex), asc(serviceIdealFor.id)),
      db.select().from(serviceFeatures).where(eq(serviceFeatures.serviceId, s.id)).orderBy(asc(serviceFeatures.orderIndex), asc(serviceFeatures.id)),
      db.select().from(serviceProcess).where(eq(serviceProcess.serviceId, s.id)).orderBy(asc(serviceProcess.orderIndex), asc(serviceProcess.id)),
      db.select().from(serviceFaqs).where(eq(serviceFaqs.serviceId, s.id)).orderBy(asc(serviceFaqs.orderIndex), asc(serviceFaqs.id)),
      db.select().from(serviceGallery).where(eq(serviceGallery.serviceId, s.id)).orderBy(asc(serviceGallery.orderIndex), asc(serviceGallery.id)),
      db.select().from(serviceTestimonials).where(eq(serviceTestimonials.serviceId, s.id)).orderBy(asc(serviceTestimonials.orderIndex), asc(serviceTestimonials.id)),
    ]);

  return {
    id: s.id,
    slug: s.slug,
    icon: s.icon,
    title: s.title,
    shortDesc: s.shortDesc,
    heroImage: s.heroImage,
    aboutImage: s.aboutImage,
    description: s.description,
    longDescription: s.longDescription,
    whyUs: s.whyUs,
    seoText: s.seoText,
    bannerText: s.bannerText,
    keywords: keywords.map((k) => k.keyword),
    idealFor: idealFor.map((i) => i.item),
    features: features.map((f) => ({ title: f.title, text: f.text })),
    process: process.map((p) => ({ step: p.step, desc: p.desc })),
    faqs: faqs.map((f) => ({ q: f.q, a: f.a })),
    gallery: gallery.map((g) => g.imageUrl),
    testimonials: testimonials.map((t) => ({ name: t.name, title: t.title, text: t.text })),
  };
}

/** Slugs for generateStaticParams. */
export async function listPublishedServiceSlugs(): Promise<{ slug: string }[]> {
  const rows = await db
    .select({ slug: services.slug })
    .from(services)
    .where(eq(services.published, true));
  return rows;
}
