import Link from "next/link";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { ArrowUp, ArrowDown, Pencil, Plus } from "lucide-react";
import { PageHeader, Card, EmptyState, Badge, LinkButton } from "../_components/ui";
import ConfirmDelete from "../_components/ConfirmDelete";
import { deleteServiceAction, moveServiceAction } from "./actions";

export const metadata = { title: "Hizmetler" };
export const dynamic = "force-dynamic";

export default async function ServicesListPage() {
  const list = await db
    .select()
    .from(services)
    .orderBy(asc(services.orderIndex), asc(services.id));

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Hizmetler"
        description={`Toplam ${list.length} hizmet. Sıralama, yayın durumu ve içerikleri buradan yönetebilirsin.`}
        action={
          <LinkButton href="/admin/hizmetler/yeni">
            <Plus className="h-4 w-4" />
            Yeni Hizmet
          </LinkButton>
        }
      />

      {list.length === 0 ? (
        <EmptyState
          title="Henüz hizmet eklenmemiş"
          description="İlk hizmetini ekleyerek başla."
          action={
            <LinkButton href="/admin/hizmetler/yeni">
              <Plus className="h-4 w-4" />
              Yeni Hizmet
            </LinkButton>
          }
        />
      ) : (
        <Card padded={false}>
          <ul className="divide-y divide-[#2a3158]">
            {list.map((s, idx) => (
              <li key={s.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex flex-col gap-1">
                  <form action={moveServiceAction.bind(null, s.id, "up")}>
                    <button
                      type="submit"
                      disabled={idx === 0}
                      className="rounded p-1 text-[#8b8fa8] transition hover:text-white disabled:opacity-30"
                      title="Yukarı"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                  </form>
                  <form action={moveServiceAction.bind(null, s.id, "down")}>
                    <button
                      type="submit"
                      disabled={idx === list.length - 1}
                      className="rounded p-1 text-[#8b8fa8] transition hover:text-white disabled:opacity-30"
                      title="Aşağı"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/hizmetler/${s.id}`}
                      className="font-semibold text-white hover:text-[#a86dab]"
                    >
                      {s.title}
                    </Link>
                    {s.published ? (
                      <Badge tone="success">Yayında</Badge>
                    ) : (
                      <Badge tone="warning">Taslak</Badge>
                    )}
                  </div>
                  <div className="mt-0.5 truncate font-mono text-xs text-[#8b8fa8]">
                    /hizmetler/{s.slug}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/hizmetler/${s.id}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#2a3158] bg-[#111729] px-3 py-1.5 text-xs font-medium text-white transition hover:border-[#6a4696]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Düzenle
                  </Link>
                  <ConfirmDelete
                    action={deleteServiceAction.bind(null, s.id)}
                    confirmText="Hizmet ve tüm içerikleri silinecek."
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
