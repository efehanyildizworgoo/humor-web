import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, listPublishedPosts, listCategories } from "@/lib/queries/blog";
import BlogList from "@/components/BlogList";
import { pageSeo } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return {};
  return pageSeo({
    path: `/blog/kategori/${slug}`,
    title: `${cat.name} | Blog`,
    description: cat.description || `${cat.name} kategorisindeki yazılar`,
  });
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();

  const [posts, allCats] = await Promise.all([
    listPublishedPosts({ categorySlug: slug }),
    listCategories(),
  ]);

  return (
    <>
      <section className="relative pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c2545] via-[#0d1220] to-[#0d1220]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Link href="/blog" className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] hover:underline">
            ← Tüm yazılar
          </Link>
          <h1
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {cat.name}
          </h1>
          {cat.description ? (
            <p className="mt-4 max-w-2xl mx-auto text-white/50 text-base">{cat.description}</p>
          ) : null}
        </div>
      </section>

      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-[#0d1220]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {allCats.length > 1 ? (
            <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/blog"
                className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] text-white/50 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Tümü
              </Link>
              {allCats.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/kategori/${c.slug}`}
                  className={`rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] transition ${
                    c.slug === slug
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                      : "border-[var(--color-border)] text-white/50 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  }`}
                >
                  {c.name} ({c.postCount})
                </Link>
              ))}
            </div>
          ) : null}

          <BlogList posts={posts} />
        </div>
      </section>
    </>
  );
}
