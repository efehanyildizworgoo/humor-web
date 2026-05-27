import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { serviceFaqs } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { Card } from "../../../_components/ui";
import CollectionEditor from "../../../_components/CollectionEditor";
import {
  addFaqAction,
  updateFaqAction,
  deleteFaqAction,
  moveFaqAction,
} from "../../actions";

export const dynamic = "force-dynamic";

export default async function ServiceFaqsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const items = await db
    .select()
    .from(serviceFaqs)
    .where(eq(serviceFaqs.serviceId, id))
    .orderBy(asc(serviceFaqs.orderIndex), asc(serviceFaqs.id));

  return (
    <Card>
      <CollectionEditor
        title="Sıkça Sorulan Sorular"
        emptyText="Bu hizmete özel sık sorulan soruları ekle."
        addButtonLabel="Soru Ekle"
        fields={[
          { name: "q", label: "Soru", required: true, colSpan: 2 },
          { name: "a", label: "Cevap", type: "textarea", required: true, rows: 4, colSpan: 2 },
        ]}
        items={items.map((it) => ({ id: it.id, q: it.q, a: it.a }))}
        actions={{
          add: addFaqAction.bind(null, id),
          update: updateFaqAction.bind(null, id),
          remove: deleteFaqAction.bind(null, id),
          move: moveFaqAction.bind(null, id),
        }}
      />
    </Card>
  );
}
