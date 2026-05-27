import { db } from "@/lib/db";
import { stats } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { PageHeader, Card } from "../_components/ui";
import CollectionEditor from "../_components/CollectionEditor";
import {
  addStatAction,
  updateStatAction,
  deleteStatAction,
  moveStatAction,
} from "../_lib/simpleActions";

export const metadata = { title: "İstatistikler" };
export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const items = await db
    .select()
    .from(stats)
    .orderBy(asc(stats.orderIndex), asc(stats.id));

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="İstatistikler"
        description="Ana sayfada gösterilen rakamlar."
      />
      <Card>
        <CollectionEditor
          emptyText="Henüz istatistik eklenmemiş."
          addButtonLabel="İstatistik Ekle"
          fields={[
            { name: "value", label: "Değer", required: true, placeholder: "200+" },
            { name: "label", label: "Etiket", required: true, placeholder: "Mutlu Müşteri" },
          ]}
          items={items.map((it) => ({ id: it.id, value: it.value, label: it.label }))}
          actions={{
            add: addStatAction,
            update: updateStatAction,
            remove: deleteStatAction,
            move: moveStatAction,
          }}
        />
      </Card>
    </div>
  );
}
