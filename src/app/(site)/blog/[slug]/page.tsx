import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedPostBySlug, listPublishedPosts, listPublishedPostSlugs } from "@/lib/queries/blog";
import { htmlToPlainText } from "@/lib/sanitize";
import { pageSeo, absoluteUrl } from "@/lib/seo";
import SafeHtml from "@/components/SafeHtml";
import { Calendar, User } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    return await listPublishedPostSlugs();
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};
  return pageSeo({
    path: `/blog/${slug}`,
    title: post.seoTitle || post.title,
    description: post.seoDescription || htmlToPlainText(post.excerpt || post.content, 160),
    type: "article",
    image: post.coverImage || undefined,
    publishedTime: post.publishedAt ?? undefined,
    authors: post.author ? [post.author] : undefined,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const others = (await listPublishedPosts({ limit: 3 })).filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || htmlToPlainText(post.excerpt || post.content, 200),
    // schema.org mutlak URL ister; coverImage/logo DB'de göreli tutuluyor.
    image: post.coverImage ? [absoluteUrl(post.coverImage)] : undefined,
    datePublished: post.publishedAt ?? undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${slug}`) },
    author: post.author ? { "@type": "Person", name: post.author } : { "@type": "Organization", name: "Humor" },
    publisher: {
      "@type": "Organization",
      name: "Humor",
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo-white.svg") },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c2545] via-[#0d1220] to-[#0d1220]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          {post.category ? (
            <Link
              href={`/blog/kategori/${post.category.slug}`}
              className="inline-block text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4 hover:underline"
            >
              {post.category.name}
            </Link>
          ) : null}
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/40">
            {post.author ? (
              <span className="inline-flex items-center gap-1.5"><User size={13} /> {post.author}</span>
            ) : null}
            {post.publishedAt ? (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} />
                {new Date(post.publishedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            ) : null}
          </div>
        </div>
      </section>

      {post.coverImage ? (
        <div className="max-w-5xl mx-auto px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt={post.title} className="w-full rounded-xl border border-[var(--color-border)] object-cover" />
        </div>
      ) : null}

      {/* Content */}
      <article className="relative py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <SafeHtml html={post.content} />

          {post.tags.length > 0 ? (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-6">
              <span className="text-xs uppercase tracking-[0.2em] text-white/30">Etiketler:</span>
              {post.tags.map((t) => (
                <span
                  key={t.slug}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] text-white/50"
                >
                  {t.name}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>

      {/* Other posts */}
      {others.length > 0 ? (
        <section className="relative py-16 lg:py-24">
          <div className="absolute inset-0 bg-[var(--color-surface)]/40" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4 text-center">
              Devamı
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-center mb-12"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Diğer Yazılar
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block overflow-hidden rounded-lg border border-[var(--color-border)] bg-[#0d1220]/50 transition hover:border-[var(--color-accent)]/40"
                >
                  {p.coverImage ? (
                    <div className="aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.coverImage} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-110" />
                    </div>
                  ) : null}
                  <div className="p-5">
                    {p.category ? (
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] block mb-1">{p.category.name}</span>
                    ) : null}
                    <h3
                      className="text-lg font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
