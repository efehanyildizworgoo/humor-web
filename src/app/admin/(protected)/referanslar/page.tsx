import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { PageHeader, Card } from "../_components/ui";
import CollectionEditor from "../_components/CollectionEditor";
import {
  addTestimonialAction,
  updateTestimonialAction,
  deleteTestimonialAction,
  moveTestimonialAction,
} from "../_lib/simpleActions";

export const metadata = { title: "Referanslar" };
export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const items = await db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.orderIndex), asc(testimonials.id));

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Referanslar"
        description="Site genelinde kullanılan müşteri yorumları."
      />

      <Card>
        <CollectionEditor
          emptyText="Henüz referans eklenmemiş."
          addButtonLabel="Referans Ekle"
          fields={[
            { name: "name", label: "İsim", required: true },
            { name: "title", label: "Ünvan / Firma" },
            { name: "avatar", label: "Avatar", type: "image", colSpan: 2 },
            { name: "text", label: "Yorum", type: "textarea", required: true, rows: 4, colSpan: 2 },
          ]}
          items={items.map((it) => ({
            id: it.id,
            name: it.name,
            title: it.title,
            avatar: it.avatar,
            text: it.text,
          }))}
          actions={{
            add: addTestimonialAction,
            update: updateTestimonialAction,
            remove: deleteTestimonialAction,
            move: moveTestimonialAction,
          }}
        />
      </Card>
    </div>
  );
}
