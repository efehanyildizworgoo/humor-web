import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { serviceIdealFor } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { Card } from "../../../_components/ui";
import CollectionEditor from "../../../_components/CollectionEditor";
import {
  addIdealForAction,
  updateIdealForAction,
  deleteIdealForAction,
  moveIdealForAction,
} from "../../actions";

export const dynamic = "force-dynamic";

export default async function IdealForPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const items = await db
    .select()
    .from(serviceIdealFor)
    .where(eq(serviceIdealFor.serviceId, id))
    .orderBy(asc(serviceIdealFor.orderIndex), asc(serviceIdealFor.id));

  return (
    <Card>
      <CollectionEditor
        title="İdeal Müşteri Profili"
        emptyText="Bu hizmetin kimler için uygun olduğunu listele."
        addButtonLabel="Yeni Ekle"
        fields={[
          { name: "item", label: "Madde", required: true, colSpan: 2, placeholder: "E-ticaret markaları" },
        ]}
        items={items.map((it) => ({ id: it.id, item: it.item }))}
        actions={{
          add: addIdealForAction.bind(null, id),
          update: updateIdealForAction.bind(null, id),
          remove: deleteIdealForAction.bind(null, id),
          move: moveIdealForAction.bind(null, id),
        }}
      />
    </Card>
  );
}
