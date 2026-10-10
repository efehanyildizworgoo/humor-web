"use server";

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
import { eq, asc, sql, and, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertFormSize } from "@/lib/action-security";
import { requireSession } from "@/lib/auth";
import { sanitizeRichHtml } from "@/lib/sanitize";

// ============ helpers ============
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
  revalidatePath("/hizmetler");
  revalidatePath("/");
  if (slug) revalidatePath(`/hizmetler/${slug}`);
}

function revalidateAdmin(id?: number) {
  revalidatePath("/admin/hizmetler");
  if (id) revalidatePath(`/admin/hizmetler/${id}`, "layout");
}

// ============ service main ============
export async function createServiceAction(
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

  // Ensure unique slug
  const existing = await db.select({ id: services.id }).from(services).where(eq(services.slug, slug));
  if (existing.length > 0) return { error: "Bu slug zaten kullanılıyor." };

  const [next] = await db
    .select({ max: sql<number>`coalesce(max(${services.orderIndex}), -1) + 1` })
    .from(services);

  const [created] = await db
    .insert(services)
    .values({
      slug,
      title,
      icon: String(formData.get("icon") ?? "FileText"),
      shortDesc: String(formData.get("shortDesc") ?? ""),
      orderIndex: next.max,
      published: false,
    })
    .returning({ id: services.id });

  revalidateAdmin();
  revalidatePublic();
  redirect(`/admin/hizmetler/${created.id}`);
}

export async function updateServiceAction(
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

  // Unique slug excluding self
  const dup = await db
    .select({ id: services.id })
    .from(services)
    .where(and(eq(services.slug, slug), ne(services.id, id)));
  if (dup.length > 0) return { error: "Bu slug zaten kullanılıyor." };

  await db
    .update(services)
    .set({
      title,
      menuLabel: String(formData.get("menuLabel") ?? "").trim(),
      slug,
      icon: String(formData.get("icon") ?? "FileText"),
      shortDesc: String(formData.get("shortDesc") ?? ""),
      heroImage: String(formData.get("heroImage") ?? ""),
      aboutImage: String(formData.get("aboutImage") ?? ""),
      description: sanitizeRichHtml(String(formData.get("description") ?? "")),
      longDescription: sanitizeRichHtml(String(formData.get("longDescription") ?? "")),
      whyUs: sanitizeRichHtml(String(formData.get("whyUs") ?? "")),
      seoText: sanitizeRichHtml(String(formData.get("seoText") ?? "")),
      metaTitle: String(formData.get("metaTitle") ?? "").trim(),
      metaDescription: String(formData.get("metaDescription") ?? "").trim(),
      bannerText: String(formData.get("bannerText") ?? ""),
      published: formData.get("published") === "on",
      updatedAt: new Date(),
    })
    .where(eq(services.id, id));

  revalidateAdmin(id);
  revalidatePublic(slug);
  return { ok: true };
}

export async function deleteServiceAction(id: number): Promise<void> {
  await requireSession();
  const [row] = await db.select({ slug: services.slug }).from(services).where(eq(services.id, id));
  await db.delete(services).where(eq(services.id, id));
  revalidateAdmin();
  revalidatePublic(row?.slug);
  redirect("/admin/hizmetler");
}

export async function moveServiceAction(id: number, direction: "up" | "down"): Promise<void> {
  await requireSession();
  const all = await db.select().from(services).orderBy(asc(services.orderIndex), asc(services.id));
  const idx = all.findIndex((s) => s.id === id);
  if (idx === -1) return;
  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= all.length) return;
  const a = all[idx];
  const b = all[swapIdx];
  await db.transaction(async (tx) => {
    await tx.update(services).set({ orderIndex: b.orderIndex }).where(eq(services.id, a.id));
    await tx.update(services).set({ orderIndex: a.orderIndex }).where(eq(services.id, b.id));
  });
  revalidateAdmin();
  revalidatePublic();
}

// ============ generic child collection factory ============
type ChildTable =
  | typeof serviceKeywords
  | typeof serviceIdealFor
  | typeof serviceFeatures
  | typeof serviceProcess
  | typeof serviceFaqs
  | typeof serviceGallery
  | typeof serviceTestimonials;

async function nextOrder(table: ChildTable, serviceId: number): Promise<number> {
  const [row] = await db
    .select({ max: sql<number>`coalesce(max(${table.orderIndex}), -1) + 1` })
    .from(table)
    .where(eq(table.serviceId, serviceId));
  return row.max;
}

async function moveChild(
  table: ChildTable,
  id: number,
  direction: "up" | "down",
  serviceId: number,
) {
  const all = await db
    .select()
    .from(table)
    .where(eq(table.serviceId, serviceId))
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

async function getServiceSlug(serviceId: number): Promise<string | undefined> {
  const [s] = await db.select({ slug: services.slug }).from(services).where(eq(services.id, serviceId));
  return s?.slug;
}

// ============ keywords ============
export async function addKeywordAction(serviceId: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const keyword = String(formData.get("keyword") ?? "").trim();
  if (!keyword) return { error: "Anahtar kelime boş olamaz." };
  const order = await nextOrder(serviceKeywords, serviceId);
  await db.insert(serviceKeywords).values({ serviceId, keyword, orderIndex: order });
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function updateKeywordAction(serviceId: number, id: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const keyword = String(formData.get("keyword") ?? "").trim();
  if (!keyword) return { error: "Boş olamaz." };
  await db.update(serviceKeywords).set({ keyword }).where(eq(serviceKeywords.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function deleteKeywordAction(serviceId: number, id: number) {
  await requireSession();
  await db.delete(serviceKeywords).where(eq(serviceKeywords.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function moveKeywordAction(serviceId: number, id: number, dir: "up" | "down") {
  await requireSession();
  await moveChild(serviceKeywords, id, dir, serviceId);
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}

// ============ idealFor ============
export async function addIdealForAction(serviceId: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const item = String(formData.get("item") ?? "").trim();
  if (!item) return { error: "Boş olamaz." };
  const order = await nextOrder(serviceIdealFor, serviceId);
  await db.insert(serviceIdealFor).values({ serviceId, item, orderIndex: order });
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function updateIdealForAction(serviceId: number, id: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const item = String(formData.get("item") ?? "").trim();
  if (!item) return { error: "Boş olamaz." };
  await db.update(serviceIdealFor).set({ item }).where(eq(serviceIdealFor.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function deleteIdealForAction(serviceId: number, id: number) {
  await requireSession();
  await db.delete(serviceIdealFor).where(eq(serviceIdealFor.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function moveIdealForAction(serviceId: number, id: number, dir: "up" | "down") {
  await requireSession();
  await moveChild(serviceIdealFor, id, dir, serviceId);
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}

// ============ features (title, text) ============
export async function addFeatureAction(serviceId: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const title = String(formData.get("title") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  if (!title || !text) return { error: "Başlık ve açıklama gerekli." };
  const order = await nextOrder(serviceFeatures, serviceId);
  await db.insert(serviceFeatures).values({ serviceId, title, text, orderIndex: order });
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function updateFeatureAction(serviceId: number, id: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const title = String(formData.get("title") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  if (!title || !text) return { error: "Başlık ve açıklama gerekli." };
  await db.update(serviceFeatures).set({ title, text }).where(eq(serviceFeatures.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function deleteFeatureAction(serviceId: number, id: number) {
  await requireSession();
  await db.delete(serviceFeatures).where(eq(serviceFeatures.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function moveFeatureAction(serviceId: number, id: number, dir: "up" | "down") {
  await requireSession();
  await moveChild(serviceFeatures, id, dir, serviceId);
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}

// ============ process (step, desc) ============
export async function addProcessAction(serviceId: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const step = String(formData.get("step") ?? "").trim();
  const desc = String(formData.get("desc") ?? "").trim();
  if (!step || !desc) return { error: "Adım ve açıklama gerekli." };
  const order = await nextOrder(serviceProcess, serviceId);
  await db.insert(serviceProcess).values({ serviceId, step, desc, orderIndex: order });
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function updateProcessAction(serviceId: number, id: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const step = String(formData.get("step") ?? "").trim();
  const desc = String(formData.get("desc") ?? "").trim();
  if (!step || !desc) return { error: "Adım ve açıklama gerekli." };
  await db.update(serviceProcess).set({ step, desc }).where(eq(serviceProcess.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function deleteProcessAction(serviceId: number, id: number) {
  await requireSession();
  await db.delete(serviceProcess).where(eq(serviceProcess.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function moveProcessAction(serviceId: number, id: number, dir: "up" | "down") {
  await requireSession();
  await moveChild(serviceProcess, id, dir, serviceId);
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}

// ============ faqs (q, a) ============
export async function addFaqAction(serviceId: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const q = String(formData.get("q") ?? "").trim();
  const a = String(formData.get("a") ?? "").trim();
  if (!q || !a) return { error: "Soru ve cevap gerekli." };
  const order = await nextOrder(serviceFaqs, serviceId);
  await db.insert(serviceFaqs).values({ serviceId, q, a, orderIndex: order });
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function updateFaqAction(serviceId: number, id: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const q = String(formData.get("q") ?? "").trim();
  const a = String(formData.get("a") ?? "").trim();
  if (!q || !a) return { error: "Soru ve cevap gerekli." };
  await db.update(serviceFaqs).set({ q, a }).where(eq(serviceFaqs.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function deleteFaqAction(serviceId: number, id: number) {
  await requireSession();
  await db.delete(serviceFaqs).where(eq(serviceFaqs.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function moveFaqAction(serviceId: number, id: number, dir: "up" | "down") {
  await requireSession();
  await moveChild(serviceFaqs, id, dir, serviceId);
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}

// ============ gallery (imageUrl) ============
export async function addGalleryAction(serviceId: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  if (!imageUrl) return { error: "Görsel URL'i gerekli." };
  const order = await nextOrder(serviceGallery, serviceId);
  await db.insert(serviceGallery).values({ serviceId, imageUrl, orderIndex: order });
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function updateGalleryAction(serviceId: number, id: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  if (!imageUrl) return { error: "URL boş olamaz." };
  await db.update(serviceGallery).set({ imageUrl }).where(eq(serviceGallery.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function deleteGalleryAction(serviceId: number, id: number) {
  await requireSession();
  await db.delete(serviceGallery).where(eq(serviceGallery.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function moveGalleryAction(serviceId: number, id: number, dir: "up" | "down") {
  await requireSession();
  await moveChild(serviceGallery, id, dir, serviceId);
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}

// ============ testimonials (name, title, text) ============
export async function addServiceTestimonialAction(serviceId: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const name = String(formData.get("name") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  if (!name || !text) return { error: "İsim ve yorum gerekli." };
  const order = await nextOrder(serviceTestimonials, serviceId);
  await db.insert(serviceTestimonials).values({
    serviceId,
    name,
    title: String(formData.get("title") ?? ""),
    text,
    orderIndex: order,
  });
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function updateServiceTestimonialAction(serviceId: number, id: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const name = String(formData.get("name") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  if (!name || !text) return { error: "İsim ve yorum gerekli." };
  await db.update(serviceTestimonials).set({
    name,
    title: String(formData.get("title") ?? ""),
    text,
  }).where(eq(serviceTestimonials.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function deleteServiceTestimonialAction(serviceId: number, id: number) {
  await requireSession();
  await db.delete(serviceTestimonials).where(eq(serviceTestimonials.id, id));
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
export async function moveServiceTestimonialAction(serviceId: number, id: number, dir: "up" | "down") {
  await requireSession();
  await moveChild(serviceTestimonials, id, dir, serviceId);
  revalidateAdmin(serviceId);
  revalidatePublic(await getServiceSlug(serviceId));
}
