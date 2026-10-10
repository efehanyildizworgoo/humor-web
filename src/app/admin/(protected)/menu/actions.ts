"use server";

import { db } from "@/lib/db";
import { navItems, footerLinks, services } from "@/lib/db/schema";
import { eq, asc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { assertFormSize } from "@/lib/action-security";
import { requireSession } from "@/lib/auth";

function revalidateSite() {
  revalidatePath("/", "layout");
}

// ============ nav ============
async function nextNavOrder(): Promise<number> {
  const [row] = await db.select({ m: sql<number>`coalesce(max(${navItems.orderIndex}), -1) + 1` }).from(navItems);
  return row.m;
}

export async function addNavAction(formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const label = String(formData.get("label") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  if (!label || !href) return { error: "Etiket ve link gerekli." };
  await db.insert(navItems).values({ label, href, orderIndex: await nextNavOrder() });
  revalidatePath("/admin/menu");
  revalidateSite();
}
export async function updateNavAction(id: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const label = String(formData.get("label") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  if (!label || !href) return { error: "Etiket ve link gerekli." };
  await db.update(navItems).set({ label, href }).where(eq(navItems.id, id));
  revalidatePath("/admin/menu");
  revalidateSite();
}
export async function deleteNavAction(id: number) {
  await requireSession();
  await db.delete(navItems).where(eq(navItems.id, id));
  revalidatePath("/admin/menu");
  revalidateSite();
}
export async function moveNavAction(id: number, dir: "up" | "down") {
  await requireSession();
  const all = await db.select().from(navItems).orderBy(asc(navItems.orderIndex), asc(navItems.id));
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return;
  const swap = dir === "up" ? idx - 1 : idx + 1;
  if (swap < 0 || swap >= all.length) return;
  const a = all[idx], b = all[swap];
  await db.transaction(async (tx) => {
    await tx.update(navItems).set({ orderIndex: b.orderIndex }).where(eq(navItems.id, a.id));
    await tx.update(navItems).set({ orderIndex: a.orderIndex }).where(eq(navItems.id, b.id));
  });
  revalidatePath("/admin/menu");
  revalidateSite();
}

// ============ footer ============
async function nextFooterOrder(section: string): Promise<number> {
  const [row] = await db
    .select({ m: sql<number>`coalesce(max(${footerLinks.orderIndex}), -1) + 1` })
    .from(footerLinks)
    .where(eq(footerLinks.section, section));
  return row.m;
}

export async function addFooterAction(formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const section = String(formData.get("section") ?? "").trim();
  const label = String(formData.get("label") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  if (!section || !label || !href) return { error: "Bölüm, etiket ve link gerekli." };
  await db.insert(footerLinks).values({ section, label, href, orderIndex: await nextFooterOrder(section) });
  revalidatePath("/admin/menu");
  revalidateSite();
}
export async function updateFooterAction(id: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const section = String(formData.get("section") ?? "").trim();
  const label = String(formData.get("label") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  if (!section || !label || !href) return { error: "Bölüm, etiket ve link gerekli." };
  await db.update(footerLinks).set({ section, label, href }).where(eq(footerLinks.id, id));
  revalidatePath("/admin/menu");
  revalidateSite();
}
export async function deleteFooterAction(id: number) {
  await requireSession();
  await db.delete(footerLinks).where(eq(footerLinks.id, id));
  revalidatePath("/admin/menu");
  revalidateSite();
}
export async function moveFooterAction(id: number, dir: "up" | "down") {
  await requireSession();
  const [row] = await db.select({ section: footerLinks.section }).from(footerLinks).where(eq(footerLinks.id, id));
  if (!row) return;
  const all = await db
    .select()
    .from(footerLinks)
    .where(eq(footerLinks.section, row.section))
    .orderBy(asc(footerLinks.orderIndex), asc(footerLinks.id));
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return;
  const swap = dir === "up" ? idx - 1 : idx + 1;
  if (swap < 0 || swap >= all.length) return;
  const a = all[idx], b = all[swap];
  await db.transaction(async (tx) => {
    await tx.update(footerLinks).set({ orderIndex: b.orderIndex }).where(eq(footerLinks.id, a.id));
    await tx.update(footerLinks).set({ orderIndex: a.orderIndex }).where(eq(footerLinks.id, b.id));
  });
  revalidatePath("/admin/menu");
  revalidateSite();
}

// ============ mega menu (hizmet menü isimleri) ============
// Sadece hizmetin menu_label alanını günceller — mega menüde görünen kısa ad.
// Boş bırakılırsa sitede hizmet başlığına düşer (bkz. (site)/layout.tsx).
export async function updateMegaLabelAction(id: number, formData: FormData) {
  await requireSession();
  assertFormSize(formData);
  const menuLabel = String(formData.get("menuLabel") ?? "").trim();
  await db.update(services).set({ menuLabel }).where(eq(services.id, id));
  revalidatePath("/admin/menu");
  revalidatePath("/hizmetler");
  revalidateSite();
}
