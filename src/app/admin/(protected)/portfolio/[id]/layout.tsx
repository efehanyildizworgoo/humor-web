import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import {
  projects,
  projectServices,
  projectResults,
  projectGallery,
} from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import { PageHeader, Badge } from "../../_components/ui";
import { Tabs } from "../../_components/Tabs";
import ConfirmDelete from "../../_components/ConfirmDelete";
import { deleteProjectAction } from "../actions";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProjectEditLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const [p] = await db.select().from(projects).where(eq(projects.id, id));
  if (!p) notFound();

  const [[sv], [rs], [gl]] = await Promise.all([
    db.select({ c: count() }).from(projectServices).where(eq(projectServices.projectId, id)),
    db.select({ c: count() }).from(projectResults).where(eq(projectResults.projectId, id)),
    db.select({ c: count() }).from(projectGallery).where(eq(projectGallery.projectId, id)),
  ]);

  const base = `/admin/portfolio/${id}`;

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title={p.title}
        description={<span className="font-mono">/portfolio/{p.slug}</span>}
        back={{ href: "/admin/portfolio", label: "Portfolyo" }}
        action={
          <>
            <a
              href={`/portfolio/${p.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-[#2a3158] bg-[#111729] px-3 py-2 text-xs text-white hover:border-[#6a4696]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Sitede Gör
            </a>
            <ConfirmDelete
              action={deleteProjectAction.bind(null, id)}
              size="md"
              label="Sil"
              confirmText="Proje ve tüm içerikleri silinecek."
            />
            <Badge tone={p.published ? "success" : "warning"}>
              {p.published ? "Yayında" : "Taslak"}
            </Badge>
          </>
        }
      />

      <Tabs
        items={[
          { href: base, label: "Temel Bilgiler" },
          { href: `${base}/hizmetler`, label: "Hizmetler", count: sv.c },
          { href: `${base}/sonuclar`, label: "Sonuçlar", count: rs.c },
          { href: `${base}/galeri`, label: "Galeri", count: gl.c },
        ]}
      />

      {children}
    </div>
  );
}
