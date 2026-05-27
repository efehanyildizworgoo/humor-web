import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts, blogCategories, blogTags, blogPostTags } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { PageHeader, Card, Badge } from "../../_components/ui";
import ConfirmDelete from "../../_components/ConfirmDelete";
import { deletePostAction } from "../actions";
import EditPostForm from "./EditPostForm";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
  if (!post) notFound();

  const [categories, tags, currentTags] = await Promise.all([
    db.select().from(blogCategories).orderBy(asc(blogCategories.orderIndex), asc(blogCategories.id)),
    db.select().from(blogTags).orderBy(asc(blogTags.name)),
    db.select({ tagId: blogPostTags.tagId }).from(blogPostTags).where(eq(blogPostTags.postId, id)),
  ]);
  const selectedTagIds = currentTags.map((t) => t.tagId);

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title={post.title}
        description={<span className="font-mono">/blog/{post.slug}</span>}
        back={{ href: "/admin/blog", label: "Blog" }}
        action={
          <>
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-[#2a3158] bg-[#111729] px-3 py-2 text-xs text-white hover:border-[#6a4696]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Sitede Gör
            </a>
            <ConfirmDelete
              action={deletePostAction.bind(null, id)}
              size="md"
              label="Sil"
              confirmText="Yazı kalıcı olarak silinecek."
            />
            <Badge tone={post.published ? "success" : "warning"}>
              {post.published ? "Yayında" : "Taslak"}
            </Badge>
          </>
        }
      />
      <Card>
        <EditPostForm
          id={id}
          initial={{
            title: post.title,
            slug: post.slug,
            author: post.author,
            excerpt: post.excerpt,
            coverImage: post.coverImage,
            content: post.content,
            seoTitle: post.seoTitle,
            seoDescription: post.seoDescription,
            categoryId: post.categoryId,
            published: post.published,
            selectedTagIds,
          }}
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          tags={tags.map((t) => ({ id: t.id, name: t.name }))}
        />
      </Card>
    </div>
  );
}
