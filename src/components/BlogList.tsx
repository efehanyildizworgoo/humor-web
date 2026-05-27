"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, User } from "lucide-react";
import type { PublicPostListItem } from "@/lib/queries/blog";

export default function BlogList({ posts }: { posts: PublicPostListItem[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--color-border)] py-24 text-center text-white/40">
        Henüz yazı eklenmemiş.
      </div>
    );
  }

  return (
    <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <motion.article
          key={p.slug}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: i * 0.07 }}
        >
          <Link
            href={`/blog/${p.slug}`}
            className="group block overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 transition hover:border-[var(--color-accent)]/40"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#1a2240]">
              {p.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.coverImage}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {p.category ? (
                <span className="absolute left-4 top-4 rounded-full bg-[var(--color-accent)]/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-black font-semibold">
                  {p.category.name}
                </span>
              ) : null}
            </div>
            <div className="p-6">
              <h2
                className="text-xl font-semibold leading-tight text-white transition group-hover:text-[var(--color-accent)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.title}
              </h2>
              {p.excerpt ? (
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/50">
                  {p.excerpt}
                </p>
              ) : null}
              <div className="mt-4 flex items-center gap-3 text-[11px] text-white/30">
                {p.author ? (
                  <span className="inline-flex items-center gap-1">
                    <User size={12} /> {p.author}
                  </span>
                ) : null}
                {p.publishedAt ? (
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(p.publishedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                ) : null}
                <ArrowUpRight
                  size={14}
                  className="ml-auto text-white/40 transition group-hover:translate-x-1 group-hover:text-[var(--color-accent)]"
                />
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
