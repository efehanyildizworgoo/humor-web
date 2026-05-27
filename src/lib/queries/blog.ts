import "server-only";
import { db } from "@/lib/db";
import {
  blogPosts,
  blogCategories,
  blogTags,
  blogPostTags,
} from "@/lib/db/schema";
import { and, eq, desc, asc, isNotNull, inArray } from "drizzle-orm";
import { htmlToPlainText } from "@/lib/sanitize";

export type PublicPostListItem = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string | null;
  category: { slug: string; name: string } | null;
};

export type PublicPost = PublicPostListItem & {
  id: number;
  content: string; // sanitized HTML
  seoTitle: string;
  seoDescription: string;
  tags: { slug: string; name: string }[];
};

export type PublicCategory = { slug: string; name: string; description: string; postCount: number };
export type PublicTag = { slug: string; name: string };

function isPublished() {
  return and(eq(blogPosts.published, true), isNotNull(blogPosts.publishedAt));
}

export async function listPublishedPosts(opts?: {
  categorySlug?: string;
  tagSlug?: string;
  limit?: number;
}): Promise<PublicPostListItem[]> {
  let postIds: number[] | null = null;
  if (opts?.tagSlug) {
    const tagRow = await db.select().from(blogTags).where(eq(blogTags.slug, opts.tagSlug));
    if (tagRow.length === 0) return [];
    const ptRows = await db
      .select({ postId: blogPostTags.postId })
      .from(blogPostTags)
      .where(eq(blogPostTags.tagId, tagRow[0].id));
    postIds = ptRows.map((r) => r.postId);
    if (postIds.length === 0) return [];
  }

  const conds = [isPublished()];
  if (opts?.categorySlug) {
    const cat = await db.select().from(blogCategories).where(eq(blogCategories.slug, opts.categorySlug));
    if (cat.length === 0) return [];
    conds.push(eq(blogPosts.categoryId, cat[0].id));
  }
  if (postIds) conds.push(inArray(blogPosts.id, postIds));

  const q = db
    .select({
      slug: blogPosts.slug,
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      coverImage: blogPosts.coverImage,
      author: blogPosts.author,
      publishedAt: blogPosts.publishedAt,
      categorySlug: blogCategories.slug,
      categoryName: blogCategories.name,
    })
    .from(blogPosts)
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(and(...conds))
    .orderBy(desc(blogPosts.publishedAt));

  const rows = opts?.limit ? await q.limit(opts.limit) : await q;

  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    coverImage: r.coverImage,
    author: r.author,
    publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
    category: r.categorySlug ? { slug: r.categorySlug, name: r.categoryName! } : null,
  }));
}

export async function getPublishedPostBySlug(slug: string): Promise<PublicPost | null> {
  const [row] = await db
    .select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      coverImage: blogPosts.coverImage,
      content: blogPosts.content,
      author: blogPosts.author,
      publishedAt: blogPosts.publishedAt,
      seoTitle: blogPosts.seoTitle,
      seoDescription: blogPosts.seoDescription,
      categorySlug: blogCategories.slug,
      categoryName: blogCategories.name,
    })
    .from(blogPosts)
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(and(eq(blogPosts.slug, slug), isPublished()));

  if (!row) return null;

  const tagRows = await db
    .select({ slug: blogTags.slug, name: blogTags.name })
    .from(blogPostTags)
    .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
    .where(eq(blogPostTags.postId, row.id))
    .orderBy(asc(blogTags.orderIndex), asc(blogTags.name));

  const excerpt = row.excerpt || htmlToPlainText(row.content, 200);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt,
    coverImage: row.coverImage,
    content: row.content,
    author: row.author,
    publishedAt: row.publishedAt ? row.publishedAt.toISOString() : null,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    category: row.categorySlug ? { slug: row.categorySlug, name: row.categoryName! } : null,
    tags: tagRows,
  };
}

export async function listPublishedPostSlugs(): Promise<{ slug: string }[]> {
  const rows = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(isPublished());
  return rows;
}

export async function listCategories(): Promise<PublicCategory[]> {
  const cats = await db
    .select()
    .from(blogCategories)
    .orderBy(asc(blogCategories.orderIndex), asc(blogCategories.id));
  // Count published posts per category.
  const result: PublicCategory[] = [];
  for (const c of cats) {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.categoryId, c.id), isPublished()));
    result.push({ slug: c.slug, name: c.name, description: c.description, postCount: posts.length });
  }
  return result;
}

export async function getCategoryBySlug(slug: string) {
  const [c] = await db.select().from(blogCategories).where(eq(blogCategories.slug, slug));
  if (!c) return null;
  return { slug: c.slug, name: c.name, description: c.description };
}

export async function listTags(): Promise<PublicTag[]> {
  const rows = await db
    .select({ slug: blogTags.slug, name: blogTags.name })
    .from(blogTags)
    .orderBy(asc(blogTags.orderIndex), asc(blogTags.name));
  return rows;
}
