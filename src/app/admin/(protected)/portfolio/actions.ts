"use server";

import { db } from "@/lib/db";
import {
  projects,
  projectServices,
  projectResults,
  projectGallery,
} from "@/lib/db/schema";
import { eq, asc, sql, and, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertFormSize } from "@/lib/action-security";
import { requireSession } from "@/lib/auth";
import { sanitizeRichHtml } from "@/lib/sanitize";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function revalidatePublic(slug?: string) {
  revalidatePath("/portfolio");
  revalidatePath("/");
  if (slug) revalidatePath(`/portfolio/${slug}`);
}
function revalidateAdmin(id?: number) {
  revalidatePath("/admin/portfolio");
  if (id) revalidatePath(`/admin/portfolio/${id}`, "layout");
}

// ============ project main ============
export async function createProjectAction(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  await requireSession();
  assertFormSize(formData);
  const title = String(formData.get("title") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  if (!title) return { error: "Başlık gerekli." };
  if (!slug) slug = slugify(title);
  if (!slug) return { error: "Geçerli bir slug üretilemedi." };

  const existing = await db.select({ id: projects.id }).from(projects).where(eq(projects.slug, slug));
  if (existing.length > 0) return { error: "Bu slug zaten kullanılıyor." };

  const [next] = await db
    .select({ max: sql<number>`coalesce(max(${projects.orderIndex}), -1) + 1` })
    .from(projects);

  const [created] = await db
    .insert(projects)
    .values({
      slug,
      title,
      category: String(formData.get("category") ?? ""),
      client: String(formData.get("client") ?? ""),
      year: String(formData.get("year") ?? ""),
      orderIndex: next.max,
      published: false,
    })
    .returning({ id: projects.id });

  revalidateAdmin();
  revalidatePublic();
  redirect(`/admin/portfolio/${created.id}`);
}

export async function updateProjectAction(
  id: number,
  _prev: { error?: string; ok?: boolean } | undefined,
  formData: FormData,
): Promise<{ error?: string; ok?: boolean }> {
  await requireSession();
  assertFormSize(formData);
  const title = String(formData.get("title") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  if (!title) return { error: "Başlık gerekli." };
  if (!slug) slug = slugify(title);

  const dup = await db
    .select({ id: projects.id })
    .from(projects)
    .where(and(eq(projects.slug, slug), ne(projects.id, id)));
  if (dup.length > 0) return { error: "Bu slug zaten kullanılıyor." };

  await db
    .update(projects)
    .set({
      title,
      slug,
      category: String(formData.get("category") ?? ""),
      image: String(formData.get("image") ?? ""),
      desc: String(formData.get("desc") ?? ""),
      client: String(formData.get("client") ?? ""),
      year: String(formData.get("year") ?? ""),
      challenge: sanitizeRichHtml(String(formData.get("challenge") ?? "")),
      solution: sanitizeRichHtml(String(formData.get("solution") ?? "")),
      published: formData.get("published") === "on",
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id));

  revalidateAdmin(id);
  revalidatePublic(slug);
  return { ok: true };
}

export async function deleteProjectAction(id: number): Promise<void> {
  await requireSession();
  const [row] = await db.select({ slug: projects.slug }).from(projects).where(eq(projects.id, id));
  await db.delete(projects).where(eq(projects.id, id));
  revalidateAdmin();
  revalidatePublic(row?.slug);
  redirect("/admin/portfolio");
}

export async function moveProjectAction(id: number, direction: "up" | "down"): Promise<void> {
  await requireSession();
  const all = await db.select().from(projects).orderBy(asc(projects.orderIndex), asc(projects.id));
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return;
  const swap = direction === "up" ? idx - 1 : idx + 1;
  if (swap < 0 || swap >= all.length) return;
  const a = all[idx], b = all[swap];
  await db.transaction(async (tx) => {
    await tx.update(projects).set({ orderIndex: b.orderIndex }).where(eq(projects.id, a.id));
    await tx.update(projects).set({ orderIndex: a.orderIndex }).where(eq(projects.id, b.id));
  });
  revalidateAdmin();
  revalidatePublic();
}

// ============ generic child helpers ============
type ChildTable =
  | typeof projectServices
  | typeof projectResults
  | typeof projectGallery;

async function nextOrder(table: ChildTable, projectId: number): Promise<number> {
  const [row] = await db
    .select({ max: sql<number>`coalesce(max(${table.orderIndex}), -1) + 1` })
    .from(table)
    .where(eq(table.projectId, projectId));
  return row.max;
}

async function moveChild(
  table: ChildTable,
  id: number,
  direction: "up" | "down",
  projectId: number,
) {
  const all = await db
    .select()
    .from(table)
    .where(eq(table.projectId, projectId))
    .orderBy(asc(table.orderIndex), asc(table.id));
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return;
  const swap = direction === "up" ? idx - 1 : idx + 1;
  if (swap < 0 || swap >= all.length) return;
  const a = all[idx], b = all[swap];
  await db.transaction(async (tx) => {
    await tx.update(table).set({ orderIndex: b.orderIndex }).where(eq(table.id, a.id));
    await tx.update(table).set({ orderIndex: a.orderIndex }).where(eq(table.id, b.id));
  });
}

async function getProjectSlug(projectId: number): Promise<string | undefined> {
  const [r] = await db.select({ slug: projects.slug }).from(projects).where(eq(projects.id, projectId));
  return r?.slug;
}

// ============ services (chips) ============
export async function addProjectServiceAction(projectId: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Boş olamaz." };
  const order = await nextOrder(projectServices, projectId);
  await db.insert(projectServices).values({ projectId, name, orderIndex: order });
  revalidateAdmin(projectId);
  revalidatePublic(await getProjectSlug(projectId));
}
export async function updateProjectServiceAction(projectId: number, id: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Boş olamaz." };
  await db.update(projectServices).set({ name }).where(eq(projectServices.id, id));
  revalidateAdmin(projectId);
  revalidatePublic(await getProjectSlug(projectId));
}
export async function deleteProjectServiceAction(projectId: number, id: number) {
  await requireSession();
  await db.delete(projectServices).where(eq(projectServices.id, id));
  revalidateAdmin(projectId);
  revalidatePublic(await getProjectSlug(projectId));
}
export async function moveProjectServiceAction(projectId: number, id: number, dir: "up" | "down") {
  await requireSession();
  await moveChild(projectServices, id, dir, projectId);
  revalidateAdmin(projectId);
  revalidatePublic(await getProjectSlug(projectId));
}

// ============ results ============
export async function addProjectResultAction(projectId: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const text = String(formData.get("text") ?? "").trim();
  if (!text) return { error: "Boş olamaz." };
  const order = await nextOrder(projectResults, projectId);
  await db.insert(projectResults).values({ projectId, text, orderIndex: order });
  revalidateAdmin(projectId);
  revalidatePublic(await getProjectSlug(projectId));
}
export async function updateProjectResultAction(projectId: number, id: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const text = String(formData.get("text") ?? "").trim();
  if (!text) return { error: "Boş olamaz." };
  await db.update(projectResults).set({ text }).where(eq(projectResults.id, id));
  revalidateAdmin(projectId);
  revalidatePublic(await getProjectSlug(projectId));
}
export async function deleteProjectResultAction(projectId: number, id: number) {
  await requireSession();
  await db.delete(projectResults).where(eq(projectResults.id, id));
  revalidateAdmin(projectId);
  revalidatePublic(await getProjectSlug(projectId));
}
export async function moveProjectResultAction(projectId: number, id: number, dir: "up" | "down") {
  await requireSession();
  await moveChild(projectResults, id, dir, projectId);
  revalidateAdmin(projectId);
  revalidatePublic(await getProjectSlug(projectId));
}

// ============ gallery ============
export async function addProjectGalleryAction(projectId: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  if (!imageUrl) return { error: "URL gerekli." };
  const order = await nextOrder(projectGallery, projectId);
  await db.insert(projectGallery).values({ projectId, imageUrl, orderIndex: order });
  revalidateAdmin(projectId);
  revalidatePublic(await getProjectSlug(projectId));
}
export async function updateProjectGalleryAction(projectId: number, id: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  if (!imageUrl) return { error: "URL boş olamaz." };
  await db.update(projectGallery).set({ imageUrl }).where(eq(projectGallery.id, id));
  revalidateAdmin(projectId);
  revalidatePublic(await getProjectSlug(projectId));
}
export async function deleteProjectGalleryAction(projectId: number, id: number) {
  await requireSession();
  await db.delete(projectGallery).where(eq(projectGallery.id, id));
  revalidateAdmin(projectId);
  revalidatePublic(await getProjectSlug(projectId));
}
export async function moveProjectGalleryAction(projectId: number, id: number, dir: "up" | "down") {
  await requireSession();
  await moveChild(projectGallery, id, dir, projectId);
  revalidateAdmin(projectId);
  revalidatePublic(await getProjectSlug(projectId));
}
