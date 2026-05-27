import "server-only";
import { db } from "@/lib/db";
import { testimonials, faqs, stats, navItems, footerLinks } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

export type PublicTestimonial = { name: string; title: string; text: string; avatar: string };
export type PublicFaq = { q: string; a: string };
export type PublicStat = { value: string; label: string };
export type PublicNavItem = { label: string; href: string };
export type PublicFooterSection = { section: string; links: PublicNavItem[] };

export async function listTestimonials(): Promise<PublicTestimonial[]> {
  const rows = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.published, true))
    .orderBy(asc(testimonials.orderIndex), asc(testimonials.id));
  return rows.map((t) => ({ name: t.name, title: t.title, text: t.text, avatar: t.avatar }));
}

export async function listFaqs(): Promise<PublicFaq[]> {
  const rows = await db
    .select()
    .from(faqs)
    .where(eq(faqs.published, true))
    .orderBy(asc(faqs.orderIndex), asc(faqs.id));
  return rows.map((f) => ({ q: f.q, a: f.a }));
}

export async function listStats(): Promise<PublicStat[]> {
  const rows = await db
    .select()
    .from(stats)
    .orderBy(asc(stats.orderIndex), asc(stats.id));
  return rows.map((s) => ({ value: s.value, label: s.label }));
}

export async function listNavItems(): Promise<PublicNavItem[]> {
  const rows = await db
    .select()
    .from(navItems)
    .where(eq(navItems.published, true))
    .orderBy(asc(navItems.orderIndex), asc(navItems.id));
  return rows.map((n) => ({ label: n.label, href: n.href }));
}

export async function listFooterSections(): Promise<PublicFooterSection[]> {
  const rows = await db
    .select()
    .from(footerLinks)
    .orderBy(asc(footerLinks.section), asc(footerLinks.orderIndex), asc(footerLinks.id));
  const map = new Map<string, PublicNavItem[]>();
  for (const r of rows) {
    const arr = map.get(r.section) ?? [];
    arr.push({ label: r.label, href: r.href });
    map.set(r.section, arr);
  }
  return Array.from(map.entries()).map(([section, links]) => ({ section, links }));
}
