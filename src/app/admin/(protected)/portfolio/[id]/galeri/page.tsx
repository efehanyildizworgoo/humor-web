import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { projectGallery } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { Card } from "../../../_components/ui";
import CollectionEditor from "../../../_components/CollectionEditor";
import {
  addProjectGalleryAction,
  updateProjectGalleryAction,
  deleteProjectGalleryAction,
  moveProjectGalleryAction,
} from "../../actions";

export const dynamic = "force-dynamic";

export default async function ProjectGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const items = await db
    .select()
    .from(projectGallery)
    .where(eq(projectGallery.projectId, id))
    .orderBy(asc(projectGallery.orderIndex), asc(projectGallery.id));

  return (
    <Card>
      <CollectionEditor
        title="Galeri"
        emptyText="Proje görsellerini ekle."
        addButtonLabel="Görsel Ekle"
        fields={[
          { name: "imageUrl", label: "Görsel", type: "image", required: true, colSpan: 2 },
        ]}
        items={items.map((it) => ({ id: it.id, imageUrl: it.imageUrl }))}
        actions={{
          add: addProjectGalleryAction.bind(null, id),
          update: updateProjectGalleryAction.bind(null, id),
          remove: deleteProjectGalleryAction.bind(null, id),
          move: moveProjectGalleryAction.bind(null, id),
        }}
      />
    </Card>
  );
}
