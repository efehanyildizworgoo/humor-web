import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { projectServices } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { Card } from "../../../_components/ui";
import CollectionEditor from "../../../_components/CollectionEditor";
import {
  addProjectServiceAction,
  updateProjectServiceAction,
  deleteProjectServiceAction,
  moveProjectServiceAction,
} from "../../actions";

export const dynamic = "force-dynamic";

export default async function ProjectServicesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const items = await db
    .select()
    .from(projectServices)
    .where(eq(projectServices.projectId, id))
    .orderBy(asc(projectServices.orderIndex), asc(projectServices.id));

  return (
    <Card>
      <CollectionEditor
        title="Bu Projede Sunulan Hizmetler"
        emptyText="Bu projede hangi hizmetleri verdiğinizi listele."
        addButtonLabel="Hizmet Ekle"
        fields={[
          { name: "name", label: "Hizmet", required: true, colSpan: 2, placeholder: "Sosyal Medya Yönetimi" },
        ]}
        items={items.map((it) => ({ id: it.id, name: it.name }))}
        actions={{
          add: addProjectServiceAction.bind(null, id),
          update: updateProjectServiceAction.bind(null, id),
          remove: deleteProjectServiceAction.bind(null, id),
          move: moveProjectServiceAction.bind(null, id),
        }}
      />
    </Card>
  );
}
