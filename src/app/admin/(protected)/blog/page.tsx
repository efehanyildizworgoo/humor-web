import Link from "next/link";
import { db } from "@/lib/db";
import { blogPosts, blogCategories } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Pencil, Plus, Tag, FolderTree } from "lucide-react";
import { PageHeader, Card, EmptyState, Badge, LinkButton } from "../_components/ui";
import ConfirmDelete from "../_components/ConfirmDelete";
import { deletePostAction, togglePostPublishedAction } from "./actions";

export const metadata = { title: "Blog" };
export const dynamic = "force-dynamic";

export default async function BlogListPage() {
  const rows = await db
    .select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      coverImage: blogPosts.coverImage,
      published: blogPosts.published,
      publishedAt: blogPosts.publishedAt,
      updatedAt: blogPosts.updatedAt,
      categoryName: blogCategories.name,
    })
    .from(blogPosts)
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .orderBy(desc(blogPosts.updatedAt));

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Blog"
        description={`Toplam ${rows.length} yazı.`}
        action={
          <>
            <Link
              href="/admin/blog/kategoriler"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#2a3158] bg-[#111729] px-3 py-2 text-xs font-medium text-white hover:border-[#6a4696]"
            >
              <FolderTree className="h-3.5 w-3.5" />
              Kategoriler
            </Link>
            <Link
              href="/admin/blog/etiketler"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#2a3158] bg-[#111729] px-3 py-2 text-xs font-medium text-white hover:border-[#6a4696]"
            >
              <Tag className="h-3.5 w-3.5" />
              Etiketler
            </Link>
            <LinkButton href="/admin/blog/yeni">
              <Plus className="h-4 w-4" />
              Yeni Yazı
            </LinkButton>
          </>
        }
      />

      {rows.length === 0 ? (
        <EmptyState
          title="Henüz blog yazısı yok"
          description="İlk yazını ekleyerek başla."
          action={
            <LinkButton href="/admin/blog/yeni">
              <Plus className="h-4 w-4" />
              Yeni Yazı
            </LinkButton>
          }
        />
      ) : (
        <Card padded={false}>
          <ul className="divide-y divide-[#2a3158]">
            {rows.map((p) => (
              <li key={p.id} className="flex items-center gap-4 px-5 py-4">
                {p.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.coverImage} alt="" className="h-14 w-20 shrink-0 rounded-md border border-[#2a3158] object-cover" />
                ) : (
                  <div className="h-14 w-20 shrink-0 rounded-md border border-dashed border-[#2a3158]" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/blog/${p.id}`}
                      className="font-semibold text-white hover:text-[#a86dab]"
                    >
                      {p.title}
                    </Link>
                    {p.published ? <Badge tone="success">Yayında</Badge> : <Badge tone="warning">Taslak</Badge>}
                    {p.categoryName ? <Badge tone="accent">{p.categoryName}</Badge> : null}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-[#8b8fa8]">
                    <span className="font-mono">/blog/{p.slug}</span>
                    {p.publishedAt ? (
                      <span>· {new Date(p.publishedAt).toLocaleDateString("tr-TR")}</span>
                    ) : null}
                  </div>
                  {p.excerpt ? (
                    <div className="mt-1 truncate text-xs text-[#8b8fa8]">{p.excerpt}</div>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  <form action={togglePostPublishedAction.bind(null, p.id)}>
                    <button
                      type="submit"
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                        p.published
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                          : "border-[#2a3158] bg-[#111729] text-[#8b8fa8] hover:text-white"
                      }`}
                    >
                      {p.published ? "Yayında" : "Yayınla"}
                    </button>
                  </form>
                  <Link
                    href={`/admin/blog/${p.id}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#2a3158] bg-[#111729] px-3 py-1.5 text-xs font-medium text-white transition hover:border-[#6a4696]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Düzenle
                  </Link>
                  <ConfirmDelete
                    action={deletePostAction.bind(null, p.id)}
                    confirmText="Yazı kalıcı olarak silinecek."
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
