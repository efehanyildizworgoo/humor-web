"use server";

import { db } from "@/lib/db";
import { testimonials, faqs, stats } from "@/lib/db/schema";
import { eq, asc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth";

function revalidateAll() {
  revalidatePath("/", "layout");
}

type FlatTable = typeof testimonials | typeof faqs | typeof stats;

async function nextOrder(table: FlatTable): Promise<number> {
  const [row] = await db
    .select({ max: sql<number>`coalesce(max(${table.orderIndex}), -1) + 1` })
    .from(table);
  return row.max;
}

async function moveFlat(table: FlatTable, id: number, direction: "up" | "down") {
  const all = await db.select().from(table).orderBy(asc(table.orderIndex), asc(table.id));
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

// ============ testimonials ============
export async function addTestimonialAction(formData: FormData) {
  await requireSession();
  const name = String(formData.get("name") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  if (!name || !text) return { error: "İsim ve yorum gerekli." };
  const order = await nextOrder(testimonials);
  await db.insert(testimonials).values({
    name,
    title: String(formData.get("title") ?? ""),
    text,
    avatar: String(formData.get("avatar") ?? ""),
    orderIndex: order,
  });
  revalidatePath("/admin/referanslar");
  revalidateAll();
}
export async function updateTestimonialAction(id: number, formData: FormData) {
  await requireSession();
  const name = String(formData.get("name") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  if (!name || !text) return { error: "İsim ve yorum gerekli." };
  await db.update(testimonials).set({
    name,
    title: String(formData.get("title") ?? ""),
    text,
    avatar: String(formData.get("avatar") ?? ""),
  }).where(eq(testimonials.id, id));
  revalidatePath("/admin/referanslar");
  revalidateAll();
}
export async function deleteTestimonialAction(id: number) {
  await requireSession();
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/admin/referanslar");
  revalidateAll();
}
export async function moveTestimonialAction(id: number, dir: "up" | "down") {
  await requireSession();
  await moveFlat(testimonials, id, dir);
  revalidatePath("/admin/referanslar");
  revalidateAll();
}
export async function toggleTestimonialPublishedAction(id: number) {
  await requireSession();
  const [t] = await db.select().from(testimonials).where(eq(testimonials.id, id));
  if (!t) return;
  await db.update(testimonials).set({ published: !t.published }).where(eq(testimonials.id, id));
  revalidatePath("/admin/referanslar");
  revalidateAll();
}

// ============ faqs ============
export async function addFaqAction(formData: FormData) {
  await requireSession();
  const q = String(formData.get("q") ?? "").trim();
  const a = String(formData.get("a") ?? "").trim();
  if (!q || !a) return { error: "Soru ve cevap gerekli." };
  const order = await nextOrder(faqs);
  await db.insert(faqs).values({ q, a, orderIndex: order });
  revalidatePath("/admin/sss");
  revalidateAll();
}
export async function updateFaqAction(id: number, formData: FormData) {
  await requireSession();
  const q = String(formData.get("q") ?? "").trim();
  const a = String(formData.get("a") ?? "").trim();
  if (!q || !a) return { error: "Soru ve cevap gerekli." };
  await db.update(faqs).set({ q, a }).where(eq(faqs.id, id));
  revalidatePath("/admin/sss");
  revalidateAll();
}
export async function deleteFaqAction(id: number) {
  await requireSession();
  await db.delete(faqs).where(eq(faqs.id, id));
  revalidatePath("/admin/sss");
  revalidateAll();
}
export async function moveFaqAction(id: number, dir: "up" | "down") {
  await requireSession();
  await moveFlat(faqs, id, dir);
  revalidatePath("/admin/sss");
  revalidateAll();
}

// ============ stats ============
export async function addStatAction(formData: FormData) {
  await requireSession();
  const label = String(formData.get("label") ?? "").trim();
  const value = String(formData.get("value") ?? "").trim();
  if (!label || !value) return { error: "Etiket ve değer gerekli." };
  const order = await nextOrder(stats);
  await db.insert(stats).values({ label, value, orderIndex: order });
  revalidatePath("/admin/istatistikler");
  revalidateAll();
}
export async function updateStatAction(id: number, formData: FormData) {
  await requireSession();
  const label = String(formData.get("label") ?? "").trim();
  const value = String(formData.get("value") ?? "").trim();
  if (!label || !value) return { error: "Etiket ve değer gerekli." };
  await db.update(stats).set({ label, value }).where(eq(stats.id, id));
  revalidatePath("/admin/istatistikler");
  revalidateAll();
}
export async function deleteStatAction(id: number) {
  await requireSession();
  await db.delete(stats).where(eq(stats.id, id));
  revalidatePath("/admin/istatistikler");
  revalidateAll();
}
export async function moveStatAction(id: number, dir: "up" | "down") {
  await requireSession();
  await moveFlat(stats, id, dir);
  revalidatePath("/admin/istatistikler");
  revalidateAll();
}
