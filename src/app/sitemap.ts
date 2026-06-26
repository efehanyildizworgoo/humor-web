import type { MetadataRoute } from "next";
import { listPublishedServiceSlugs } from "@/lib/queries/services";
import { listPublishedProjectSlugs } from "@/lib/queries/projects";
import { listPublishedPostSlugs, listCategories } from "@/lib/queries/blog";

export const dynamic = "force-dynamic";

const siteUrl = "https://www.humorkreatif.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/hakkimizda`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/hizmetler`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/iletisim`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  try {
    for (const x of await listPublishedServiceSlugs()) {
      entries.push({ url: `${siteUrl}/hizmetler/${x.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 });
    }
  } catch { /* DB unavailable — skip */ }

  try {
    for (const x of await listPublishedProjectSlugs()) {
      entries.push({ url: `${siteUrl}/portfolio/${x.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
    }
  } catch { /* skip */ }

  try {
    for (const x of await listPublishedPostSlugs()) {
      entries.push({ url: `${siteUrl}/blog/${x.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
    }
  } catch { /* skip */ }

  try {
    for (const c of await listCategories()) {
      entries.push({ url: `${siteUrl}/blog/kategori/${c.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.5 });
    }
  } catch { /* skip */ }

  return entries;
}
