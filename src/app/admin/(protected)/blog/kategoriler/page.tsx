import { db } from "@/lib/db";
import { blogCategories } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { PageHeader, Card } from "../../_components/ui";
import CollectionEditor from "../../_components/CollectionEditor";
import {
  addCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
  moveCategoryAction,
} from "../actions";

export const metadata = { title: "Blog Kategorileri" };
export const dynamic = "force-dynamic";

export default async function BlogCategoriesPage() {
  const items = await db
    .select()
    .from(blogCategories)
    .orderBy(asc(blogCategories.orderIndex), asc(blogCategories.id));

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Blog Kategorileri"
        description="Yazıları gruplamak için kategoriler."
        back={{ href: "/admin/blog", label: "Blog" }}
      />
      <Card>
        <CollectionEditor
          emptyText="Henüz kategori eklenmemiş."
          addButtonLabel="Kategori Ekle"
          fields={[
            { name: "name", label: "İsim", required: true },
            { name: "slug", label: "Slug" },
            { name: "description", label: "Açıklama", type: "textarea", rows: 2, colSpan: 2 },
          ]}
          items={items.map((it) => ({
            id: it.id,
            name: it.name,
            slug: it.slug,
            description: it.description,
          }))}
          actions={{
            add: addCategoryAction,
            update: updateCategoryAction,
            remove: deleteCategoryAction,
            move: moveCategoryAction,
          }}
        />
      </Card>
    </div>
  );
}
