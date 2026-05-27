import Link from "next/link";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { ArrowUp, ArrowDown, Pencil, Plus } from "lucide-react";
import { PageHeader, Card, EmptyState, Badge, LinkButton } from "../_components/ui";
import ConfirmDelete from "../_components/ConfirmDelete";
import { deleteProjectAction, moveProjectAction } from "./actions";

export const metadata = { title: "Portfolyo" };
export const dynamic = "force-dynamic";

export default async function ProjectsListPage() {
  const list = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.orderIndex), asc(projects.id));

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Portfolyo"
        description={`Toplam ${list.length} proje.`}
        action={
          <LinkButton href="/admin/portfolio/yeni">
            <Plus className="h-4 w-4" />
            Yeni Proje
          </LinkButton>
        }
      />

      {list.length === 0 ? (
        <EmptyState
          title="Henüz proje eklenmemiş"
          action={
            <LinkButton href="/admin/portfolio/yeni">
              <Plus className="h-4 w-4" />
              Yeni Proje
            </LinkButton>
          }
        />
      ) : (
        <Card padded={false}>
          <ul className="divide-y divide-[#2a3158]">
            {list.map((p, idx) => (
              <li key={p.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex flex-col gap-1">
                  <form action={moveProjectAction.bind(null, p.id, "up")}>
                    <button
                      type="submit"
                      disabled={idx === 0}
                      className="rounded p-1 text-[#8b8fa8] transition hover:text-white disabled:opacity-30"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                  </form>
                  <form action={moveProjectAction.bind(null, p.id, "down")}>
                    <button
                      type="submit"
                      disabled={idx === list.length - 1}
                      className="rounded p-1 text-[#8b8fa8] transition hover:text-white disabled:opacity-30"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>

                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt=""
                    className="h-12 w-16 shrink-0 rounded-md border border-[#2a3158] object-cover"
                  />
                ) : (
                  <div className="h-12 w-16 shrink-0 rounded-md border border-dashed border-[#2a3158]" />
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/portfolio/${p.id}`}
                      className="font-semibold text-white hover:text-[#a86dab]"
                    >
                      {p.title}
                    </Link>
                    {p.published ? (
                      <Badge tone="success">Yayında</Badge>
                    ) : (
                      <Badge tone="warning">Taslak</Badge>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-[#8b8fa8]">
                    <span className="font-mono">/portfolio/{p.slug}</span>
                    {p.client ? <span>· {p.client}</span> : null}
                    {p.year ? <span>· {p.year}</span> : null}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/portfolio/${p.id}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#2a3158] bg-[#111729] px-3 py-1.5 text-xs font-medium text-white transition hover:border-[#6a4696]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Düzenle
                  </Link>
                  <ConfirmDelete
                    action={deleteProjectAction.bind(null, p.id)}
                    confirmText="Proje ve tüm içerikleri silinecek."
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
