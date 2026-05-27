import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { serviceFeatures } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { Card } from "../../../_components/ui";
import CollectionEditor from "../../../_components/CollectionEditor";
import {
  addFeatureAction,
  updateFeatureAction,
  deleteFeatureAction,
  moveFeatureAction,
} from "../../actions";

export const dynamic = "force-dynamic";

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const items = await db
    .select()
    .from(serviceFeatures)
    .where(eq(serviceFeatures.serviceId, id))
    .orderBy(asc(serviceFeatures.orderIndex), asc(serviceFeatures.id));

  return (
    <Card>
      <CollectionEditor
        title="Özellikler"
        emptyText="Bu hizmetin öne çıkan özelliklerini ekle."
        addButtonLabel="Özellik Ekle"
        fields={[
          { name: "title", label: "Başlık", required: true },
          { name: "text", label: "Açıklama", type: "textarea", required: true, rows: 3, colSpan: 2 },
        ]}
        items={items.map((it) => ({ id: it.id, title: it.title, text: it.text }))}
        actions={{
          add: addFeatureAction.bind(null, id),
          update: updateFeatureAction.bind(null, id),
          remove: deleteFeatureAction.bind(null, id),
          move: moveFeatureAction.bind(null, id),
        }}
      />
    </Card>
  );
}
