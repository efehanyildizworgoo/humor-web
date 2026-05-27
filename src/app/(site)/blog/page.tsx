import type { Metadata } from "next";
import Link from "next/link";
import { listPublishedPosts, listCategories } from "@/lib/queries/blog";
import BlogList from "@/components/BlogList";
import PageHero from "@/components/PageHero";
import { getPageContent } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: "Blog",
  description: "Humor Creative blog — dijital strateji, sosyal medya, prodüksiyon üzerine yazılar.",
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const [posts, categories, c] = await Promise.all([
    listPublishedPosts(),
    listCategories(),
    getPageContent("blog"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={c["blog.hero.eyebrow"]}
        title={c["blog.hero.title"]}
        titleHighlight={c["blog.hero.title_highlight"]}
        subtitle={c["blog.hero.subtitle"]}
        image={c["blog.hero.image"]}
      />

      <section className="relative py-16 sm:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[#0d1220]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {categories.length > 0 ? (
            <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs uppercase tracking-[0.2em] text-white/30">Kategoriler:</span>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/kategori/${c.slug}`}
                  className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] text-white/50 transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
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
