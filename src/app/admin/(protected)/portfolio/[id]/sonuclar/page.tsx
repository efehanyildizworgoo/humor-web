import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { projectResults } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { Card } from "../../../_components/ui";
import CollectionEditor from "../../../_components/CollectionEditor";
import {
  addProjectResultAction,
  updateProjectResultAction,
  deleteProjectResultAction,
  moveProjectResultAction,
} from "../../actions";

export const dynamic = "force-dynamic";

export default async function ProjectResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const items = await db
    .select()
    .from(projectResults)
    .where(eq(projectResults.projectId, id))
    .orderBy(asc(projectResults.orderIndex), asc(projectResults.id));

  return (
    <Card>
      <CollectionEditor
        title="Elde Edilen Sonuçlar"
        emptyText="Bu projeden çıkan ölçülebilir sonuçları ekle."
        addButtonLabel="Sonuç Ekle"
        fields={[
          { name: "text", label: "Sonuç", required: true, colSpan: 2, placeholder: "50K+ organik takipçi (3 ay)" },
        ]}
        items={items.map((it) => ({ id: it.id, text: it.text }))}
        actions={{
          add: addProjectResultAction.bind(null, id),
          update: updateProjectResultAction.bind(null, id),
          remove: deleteProjectResultAction.bind(null, id),
          move: moveProjectResultAction.bind(null, id),
        }}
      />
    </Card>
  );
}
