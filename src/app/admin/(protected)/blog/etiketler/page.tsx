import { db } from "@/lib/db";
import { blogTags } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { PageHeader, Card } from "../../_components/ui";
import CollectionEditor from "../../_components/CollectionEditor";
import {
  addTagAction,
  updateTagAction,
  deleteTagAction,
  moveTagAction,
} from "../actions";

export const metadata = { title: "Blog Etiketleri" };
export const dynamic = "force-dynamic";

export default async function BlogTagsPage() {
  const items = await db.select().from(blogTags).orderBy(asc(blogTags.orderIndex), asc(blogTags.id));

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Blog Etiketleri"
        description="Yazılara birden fazla etiket atanabilir."
        back={{ href: "/admin/blog", label: "Blog" }}
      />
      <Card>
        <CollectionEditor
          emptyText="Henüz etiket eklenmemiş."
          addButtonLabel="Etiket Ekle"
          fields={[
            { name: "name", label: "İsim", required: true },
            { name: "slug", label: "Slug" },
          ]}
          items={items.map((it) => ({ id: it.id, name: it.name, slug: it.slug }))}
          actions={{
            add: addTagAction,
            update: updateTagAction,
            remove: deleteTagAction,
            move: moveTagAction,
          }}
        />
      </Card>
    </div>
  );
}
