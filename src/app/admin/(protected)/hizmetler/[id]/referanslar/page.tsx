import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { serviceTestimonials } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { Card } from "../../../_components/ui";
import CollectionEditor from "../../../_components/CollectionEditor";
import {
  addServiceTestimonialAction,
  updateServiceTestimonialAction,
  deleteServiceTestimonialAction,
  moveServiceTestimonialAction,
} from "../../actions";

export const dynamic = "force-dynamic";

export default async function ServiceTestimonialsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const items = await db
    .select()
    .from(serviceTestimonials)
    .where(eq(serviceTestimonials.serviceId, id))
    .orderBy(asc(serviceTestimonials.orderIndex), asc(serviceTestimonials.id));

  return (
    <Card>
      <CollectionEditor
        title="Servise Özel Referanslar"
        emptyText="Bu hizmete özel müşteri yorumları ekleyebilirsin."
        addButtonLabel="Referans Ekle"
        fields={[
          { name: "name", label: "İsim", required: true },
          { name: "title", label: "Ünvan / Firma" },
          { name: "text", label: "Yorum", type: "textarea", required: true, rows: 4, colSpan: 2 },
        ]}
        items={items.map((it) => ({
          id: it.id,
          name: it.name,
          title: it.title,
          text: it.text,
        }))}
        actions={{
          add: addServiceTestimonialAction.bind(null, id),
          update: updateServiceTestimonialAction.bind(null, id),
          remove: deleteServiceTestimonialAction.bind(null, id),
          move: moveServiceTestimonialAction.bind(null, id),
        }}
      />
    </Card>
  );
}
