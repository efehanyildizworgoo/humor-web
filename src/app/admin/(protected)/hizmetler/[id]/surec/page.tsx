import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { serviceProcess } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { Card } from "../../../_components/ui";
import CollectionEditor from "../../../_components/CollectionEditor";
import {
  addProcessAction,
  updateProcessAction,
  deleteProcessAction,
  moveProcessAction,
} from "../../actions";

export const dynamic = "force-dynamic";

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const items = await db
    .select()
    .from(serviceProcess)
    .where(eq(serviceProcess.serviceId, id))
    .orderBy(asc(serviceProcess.orderIndex), asc(serviceProcess.id));

  return (
    <Card>
      <CollectionEditor
        title="Süreç Adımları"
        emptyText="Müşteriyle iş akışını adım adım anlat."
        addButtonLabel="Adım Ekle"
        fields={[
          { name: "step", label: "Adım", required: true, placeholder: "Keşif" },
          { name: "desc", label: "Açıklama", type: "textarea", required: true, rows: 2, colSpan: 2 },
        ]}
        items={items.map((it) => ({ id: it.id, step: it.step, desc: it.desc }))}
        actions={{
          add: addProcessAction.bind(null, id),
          update: updateProcessAction.bind(null, id),
          remove: deleteProcessAction.bind(null, id),
          move: moveProcessAction.bind(null, id),
        }}
      />
    </Card>
  );
}
