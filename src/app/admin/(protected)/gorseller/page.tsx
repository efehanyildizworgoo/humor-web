import { db } from "@/lib/db";
import { uploads } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { PageHeader, Card, EmptyState } from "../_components/ui";
import UploadZone from "./UploadZone";
import UploadCard from "./UploadCard";

export const metadata = { title: "Görseller" };
export const dynamic = "force-dynamic";

export default async function UploadsPage() {
  const list = await db.select().from(uploads).orderBy(desc(uploads.createdAt));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Görseller"
        description={`Toplam ${list.length} görsel. Yüklediğin görseller hizmet ve proje sayfalarında kullanılabilir.`}
      />

      <Card>
        <UploadZone />
      </Card>

      {list.length === 0 ? (
        <EmptyState
          title="Henüz görsel yüklenmedi"
          description="Yukarıdaki alana sürükleyerek veya tıklayarak görsellerini ekleyebilirsin."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((u) => (
            <UploadCard
              key={u.id}
              id={u.id}
              url={u.url}
              filename={u.filename}
              size={u.size}
              createdAt={u.createdAt.toISOString()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
