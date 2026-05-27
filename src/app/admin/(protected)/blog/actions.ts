"use server";

import { db } from "@/lib/db";
import {
  blogPosts,
  blogCategories,
  blogTags,
  blogPostTags,
} from "@/lib/db/schema";
import { eq, sql, and, ne } from "drizzle-orm";
import { asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { sanitizeRichHtml, htmlToPlainText } from "@/lib/sanitize";

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

function revalidatePublic(slug?: string, categorySlug?: string) {
  revalidatePath("/blog");
  revalidatePath("/", "layout");
  if (slug) revalidatePath(`/blog/${slug}`);
  if (categorySlug) revalidatePath(`/blog/kategori/${categorySlug}`);
}
function revalidateAdmin(id?: number) {
  revalidatePath("/admin/blog");
  if (id) revalidatePath(`/admin/blog/${id}`);
  revalidatePath("/admin");
}

// ============ POSTS ============
export async function createPostAction(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  await requireSession();
  const title = String(formData.get("title") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  if (!title) return { error: "Başlık gerekli." };
  if (!slug) slug = slugify(title);
  if (!slug) return { error: "Geçerli bir slug üretilemedi." };

  const existing = await db.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, slug));
  if (existing.length > 0) return { error: "Bu slug zaten kullanılıyor." };

  const [created] = await db
    .insert(blogPosts)
    .values({
      slug,
      title,
      author: String(formData.get("author") ?? ""),
      excerpt: String(formData.get("excerpt") ?? ""),
      published: false,
    })
    .returning({ id: blogPosts.id });

  revalidateAdmin();
  revalidatePublic();
  redirect(`/admin/blog/${created.id}`);
}

export async function updatePostAction(
  id: number,
  _prev: { error?: string; ok?: boolean } | undefined,
  formData: FormData,
): Promise<{ error?: string; ok?: boolean }> {
  await requireSession();
  const title = String(formData.get("title") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  if (!title) return { error: "Başlık gerekli." };
  if (!slug) slug = slugify(title);

  const dup = await db
    .select({ id: blogPosts.id })
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), ne(blogPosts.id, id)));
  if (dup.length > 0) return { error: "Bu slug zaten kullanılıyor." };

  const content = sanitizeRichHtml(String(formData.get("content") ?? ""));
  const excerptInput = String(formData.get("excerpt") ?? "").trim();
  const excerpt = excerptInput || htmlToPlainText(content, 200);

  const categoryIdRaw = String(formData.get("categoryId") ?? "");
  const categoryId = categoryIdRaw ? Number(categoryIdRaw) : null;
  const published = formData.get("published") === "on";

  // publishedAt: set on first publish, keep otherwise
  const [current] = await db
    .select({ publishedAt: blogPosts.publishedAt, published: blogPosts.published })
    .from(blogPosts)
    .where(eq(blogPosts.id, id));
  const publishedAt =
    published && !current?.published ? new Date() : current?.publishedAt ?? null;

  await db
    .update(blogPosts)
    .set({
      title,
      slug,
      author: String(formData.get("author") ?? ""),
      excerpt,
      coverImage: String(formData.get("coverImage") ?? ""),
      content,
      categoryId: Number.isFinite(categoryId) ? categoryId : null,
      seoTitle: String(formData.get("seoTitle") ?? ""),
      seoDescription: String(formData.get("seoDescription") ?? ""),
      published,
      publishedAt,
      updatedAt: new Date(),
    })
    .where(eq(blogPosts.id, id));

  // Tags: form sends "tagIds" repeated entries
  const tagIds = formData.getAll("tagIds").map((v) => Number(v)).filter(Number.isFinite);
  await db.delete(blogPostTags).where(eq(blogPostTags.postId, id));
  if (tagIds.length > 0) {
    await db.insert(blogPostTags).values(tagIds.map((tagId) => ({ postId: id, tagId })));
  }

  revalidateAdmin(id);
  revalidatePublic(slug);
  return { ok: true };
}

export async function deletePostAction(id: number): Promise<void> {
  await requireSession();
  const [row] = await db.select({ slug: blogPosts.slug }).from(blogPosts).where(eq(blogPosts.id, id));
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  revalidateAdmin();
  revalidatePublic(row?.slug);
  redirect("/admin/blog");
}

export async function togglePostPublishedAction(id: number): Promise<void> {
  await requireSession();
  const [row] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
  if (!row) return;
  const newPublished = !row.published;
  await db
    .update(blogPosts)
    .set({
      published: newPublished,
      publishedAt: newPublished && !row.publishedAt ? new Date() : row.publishedAt,
      updatedAt: new Date(),
    })
    .where(eq(blogPosts.id, id));
  revalidateAdmin(id);
  revalidatePublic(row.slug);
}

// ============ CATEGORIES ============
export async function addCategoryAction(formData: FormData) {
  await requireSession();
  const name = String(formData.get("name") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  if (!name) return { error: "İsim gerekli." };
  if (!slug) slug = slugify(name);
  const dup = await db.select().from(blogCategories).where(eq(blogCategories.slug, slug));
  if (dup.length > 0) return { error: "Bu slug zaten kullanılıyor." };
  const [maxRow] = await db
    .select({ m: sql<number>`coalesce(max(${blogCategories.orderIndex}), -1) + 1` })
    .from(blogCategories);
  await db.insert(blogCategories).values({
    name,
    slug,
    description: String(formData.get("description") ?? ""),
    orderIndex: maxRow.m,
  });
  revalidatePath("/admin/blog/kategoriler");
  revalidatePublic();
}
export async function updateCategoryAction(id: number, formData: FormData) {
  await requireSession();
  const name = String(formData.get("name") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  if (!name) return { error: "İsim gerekli." };
  if (!slug) slug = slugify(name);
  const dup = await db
    .select()
    .from(blogCategories)
    .where(and(eq(blogCategories.slug, slug), ne(blogCategories.id, id)));
  if (dup.length > 0) return { error: "Bu slug zaten kullanılıyor." };
  await db
    .update(blogCategories)
    .set({ name, slug, description: String(formData.get("description") ?? "") })
    .where(eq(blogCategories.id, id));
  revalidatePath("/admin/blog/kategoriler");
  revalidatePublic();
}
export async function deleteCategoryAction(id: number) {
  await requireSession();
  await db.delete(blogCategories).where(eq(blogCategories.id, id));
  revalidatePath("/admin/blog/kategoriler");
  revalidatePublic();
}
export async function moveCategoryAction(id: number, dir: "up" | "down") {
  await requireSession();
  const all = await db.select().from(blogCategories).orderBy(asc(blogCategories.orderIndex), asc(blogCategories.id));
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return;
  const swap = dir === "up" ? idx - 1 : idx + 1;
  if (swap < 0 || swap >= all.length) return;
  const a = all[idx], b = all[swap];
  await db.transaction(async (tx) => {
    await tx.update(blogCategories).set({ orderIndex: b.orderIndex }).where(eq(blogCategories.id, a.id));
    await tx.update(blogCategories).set({ orderIndex: a.orderIndex }).where(eq(blogCategories.id, b.id));
  });
  revalidatePath("/admin/blog/kategoriler");
  revalidatePublic();
}

// ============ TAGS ============
export async function addTagAction(formData: FormData) {
  await requireSession();
  const name = String(formData.get("name") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  if (!name) return { error: "İsim gerekli." };
  if (!slug) slug = slugify(name);
  const dup = await db.select().from(blogTags).where(eq(blogTags.slug, slug));
  if (dup.length > 0) return { error: "Bu etiket zaten var." };
  const [maxRow] = await db
    .select({ m: sql<number>`coalesce(max(${blogTags.orderIndex}), -1) + 1` })
    .from(blogTags);
  await db.insert(blogTags).values({ name, slug, orderIndex: maxRow.m });
  revalidatePath("/admin/blog/etiketler");
  revalidatePublic();
}
export async function updateTagAction(id: number, formData: FormData) {
  await requireSession();
  const name = String(formData.get("name") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  if (!name) return { error: "İsim gerekli." };
  if (!slug) slug = slugify(name);
  const dup = await db.select().from(blogTags).where(and(eq(blogTags.slug, slug), ne(blogTags.id, id)));
  if (dup.length > 0) return { error: "Bu slug zaten kullanılıyor." };
  await db.update(blogTags).set({ name, slug }).where(eq(blogTags.id, id));
  revalidatePath("/admin/blog/etiketler");
  revalidatePublic();
}
export async function deleteTagAction(id: number) {
  await requireSession();
  await db.delete(blogTags).where(eq(blogTags.id, id));
  revalidatePath("/admin/blog/etiketler");
  revalidatePublic();
}
export async function moveTagAction(id: number, dir: "up" | "down") {
  await requireSession();
  const all = await db.select().from(blogTags).orderBy(asc(blogTags.orderIndex), asc(blogTags.id));
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return;
  const swap = dir === "up" ? idx - 1 : idx + 1;
  if (swap < 0 || swap >= all.length) return;
  const a = all[idx], b = all[swap];
  await db.transaction(async (tx) => {
    await tx.update(blogTags).set({ orderIndex: b.orderIndex }).where(eq(blogTags.id, a.id));
    await tx.update(blogTags).set({ orderIndex: a.orderIndex }).where(eq(blogTags.id, b.id));
  });
  revalidatePath("/admin/blog/etiketler");
  revalidatePublic();
}
