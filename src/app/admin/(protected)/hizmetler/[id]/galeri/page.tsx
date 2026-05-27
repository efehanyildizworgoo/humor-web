import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { serviceGallery } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { Card } from "../../../_components/ui";
import CollectionEditor from "../../../_components/CollectionEditor";
import {
  addGalleryAction,
  updateGalleryAction,
  deleteGalleryAction,
  moveGalleryAction,
} from "../../actions";

export const dynamic = "force-dynamic";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const items = await db
    .select()
    .from(serviceGallery)
    .where(eq(serviceGallery.serviceId, id))
    .orderBy(asc(serviceGallery.orderIndex), asc(serviceGallery.id));

  return (
    <Card>
      <CollectionEditor
        title="Galeri"
        emptyText="Bu hizmete ait görselleri ekle. (Görsel yükleme: ayrı sekmede)"
        addButtonLabel="Görsel Ekle"
        fields={[
          {
            name: "imageUrl",
            label: "Görsel",
            type: "image",
            required: true,
            colSpan: 2,
            placeholder: "https://… veya /uploads/…",
          },
        ]}
        items={items.map((it) => ({ id: it.id, imageUrl: it.imageUrl }))}
        actions={{
          add: addGalleryAction.bind(null, id),
          update: updateGalleryAction.bind(null, id),
          remove: deleteGalleryAction.bind(null, id),
          move: moveGalleryAction.bind(null, id),
        }}
      />
    </Card>
  );
}
