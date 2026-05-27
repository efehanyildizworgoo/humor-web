import "server-only";
import { db } from "@/lib/db";
import {
  projects,
  projectServices,
  projectResults,
  projectGallery,
} from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

export type PublicProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  client: string;
  year: string;
  challenge: string;
  solution: string;
  services: string[];
  results: string[];
  gallery: string[];
};

export type PublicProjectListItem = Pick<
  PublicProject,
  "slug" | "title" | "category" | "image" | "desc" | "client" | "year"
>;

export async function listPublishedProjects(): Promise<PublicProjectListItem[]> {
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.published, true))
    .orderBy(asc(projects.orderIndex), asc(projects.id));

  return rows.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    image: p.image,
    desc: p.desc,
    client: p.client,
    year: p.year,
  }));
}

export async function listPublishedProjectCategories(): Promise<string[]> {
  const list = await listPublishedProjects();
  const set = new Set<string>();
  for (const p of list) if (p.category) set.add(p.category);
  return ["Tümü", ...Array.from(set)];
}

export async function getProjectBySlug(slug: string): Promise<PublicProject | null> {
  const [p] = await db.select().from(projects).where(eq(projects.slug, slug));
  if (!p || !p.published) return null;

  const [svcs, results, gallery] = await Promise.all([
    db.select().from(projectServices).where(eq(projectServices.projectId, p.id)).orderBy(asc(projectServices.orderIndex), asc(projectServices.id)),
    db.select().from(projectResults).where(eq(projectResults.projectId, p.id)).orderBy(asc(projectResults.orderIndex), asc(projectResults.id)),
    db.select().from(projectGallery).where(eq(projectGallery.projectId, p.id)).orderBy(asc(projectGallery.orderIndex), asc(projectGallery.id)),
  ]);

  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: p.category,
    image: p.image,
    desc: p.desc,
    client: p.client,
    year: p.year,
    challenge: p.challenge,
    solution: p.solution,
    services: svcs.map((s) => s.name),
    results: results.map((r) => r.text),
    gallery: gallery.map((g) => g.imageUrl),
  };
}

export async function listPublishedProjectSlugs(): Promise<{ slug: string }[]> {
  const rows = await db
    .select({ slug: projects.slug })
    .from(projects)
    .where(eq(projects.published, true));
  return rows;
}
