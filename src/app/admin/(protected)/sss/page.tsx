import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { PageHeader, Card } from "../_components/ui";
import CollectionEditor from "../_components/CollectionEditor";
import {
  addFaqAction,
  updateFaqAction,
  deleteFaqAction,
  moveFaqAction,
} from "../_lib/simpleActions";

export const metadata = { title: "S.S.S." };
export const dynamic = "force-dynamic";

export default async function FaqsPage() {
  const items = await db
    .select()
    .from(faqs)
    .orderBy(asc(faqs.orderIndex), asc(faqs.id));

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Sıkça Sorulan Sorular"
        description="Site geneli S.S.S. listesi."
      />
      <Card>
        <CollectionEditor
          emptyText="Henüz soru eklenmemiş."
          addButtonLabel="Soru Ekle"
          fields={[
            { name: "q", label: "Soru", required: true, colSpan: 2 },
            { name: "a", label: "Cevap", type: "textarea", required: true, rows: 4, colSpan: 2 },
          ]}
          items={items.map((it) => ({ id: it.id, q: it.q, a: it.a }))}
          actions={{
            add: addFaqAction,
            update: updateFaqAction,
            remove: deleteFaqAction,
            move: moveFaqAction,
          }}
        />
      </Card>
    </div>
  );
}
