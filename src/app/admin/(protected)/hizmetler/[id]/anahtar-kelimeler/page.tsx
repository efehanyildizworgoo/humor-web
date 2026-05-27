import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { serviceKeywords } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { Card } from "../../../_components/ui";
import CollectionEditor from "../../../_components/CollectionEditor";
import {
  addKeywordAction,
  updateKeywordAction,
  deleteKeywordAction,
  moveKeywordAction,
} from "../../actions";

export const dynamic = "force-dynamic";

export default async function KeywordsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const items = await db
    .select()
    .from(serviceKeywords)
    .where(eq(serviceKeywords.serviceId, id))
    .orderBy(asc(serviceKeywords.orderIndex), asc(serviceKeywords.id));

  return (
    <Card>
      <CollectionEditor
        title="Anahtar Kelimeler"
        emptyText="Anahtar kelime ekleyerek bu servisin etiketlerini oluştur."
        addButtonLabel="Anahtar Kelime Ekle"
        fields={[
          { name: "keyword", label: "Anahtar Kelime", required: true, colSpan: 2 },
        ]}
        items={items.map((it) => ({ id: it.id, keyword: it.keyword }))}
        actions={{
          add: addKeywordAction.bind(null, id),
          update: updateKeywordAction.bind(null, id),
          remove: deleteKeywordAction.bind(null, id),
          move: moveKeywordAction.bind(null, id),
        }}
      />
    </Card>
  );
}
