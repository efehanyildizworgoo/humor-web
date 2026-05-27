import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import {
  services,
  serviceKeywords,
  serviceIdealFor,
  serviceFeatures,
  serviceProcess,
  serviceFaqs,
  serviceGallery,
  serviceTestimonials,
} from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import { PageHeader, Badge } from "../../_components/ui";
import { Tabs } from "../../_components/Tabs";
import ConfirmDelete from "../../_components/ConfirmDelete";
import { deleteServiceAction } from "../actions";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ServiceEditLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const [svc] = await db.select().from(services).where(eq(services.id, id));
  if (!svc) notFound();

  const [[kw], [idf], [ft], [pr], [fq], [gl], [ts]] = await Promise.all([
    db.select({ c: count() }).from(serviceKeywords).where(eq(serviceKeywords.serviceId, id)),
    db.select({ c: count() }).from(serviceIdealFor).where(eq(serviceIdealFor.serviceId, id)),
    db.select({ c: count() }).from(serviceFeatures).where(eq(serviceFeatures.serviceId, id)),
    db.select({ c: count() }).from(serviceProcess).where(eq(serviceProcess.serviceId, id)),
    db.select({ c: count() }).from(serviceFaqs).where(eq(serviceFaqs.serviceId, id)),
    db.select({ c: count() }).from(serviceGallery).where(eq(serviceGallery.serviceId, id)),
    db.select({ c: count() }).from(serviceTestimonials).where(eq(serviceTestimonials.serviceId, id)),
  ]);

  const base = `/admin/hizmetler/${id}`;

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title={svc.title}
        description={<span className="font-mono">/hizmetler/{svc.slug}</span>}
        back={{ href: "/admin/hizmetler", label: "Hizmetler" }}
        action={
          <>
            <a
              href={`/hizmetler/${svc.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-[#2a3158] bg-[#111729] px-3 py-2 text-xs text-white hover:border-[#6a4696]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Sitede Gör
            </a>
            <ConfirmDelete
              action={deleteServiceAction.bind(null, id)}
              size="md"
              label="Sil"
              confirmText="Hizmet ve tüm içerikleri silinecek."
            />
            <Badge tone={svc.published ? "success" : "warning"}>
              {svc.published ? "Yayında" : "Taslak"}
            </Badge>
          </>
        }
      />

      <Tabs
        items={[
          { href: base, label: "Temel Bilgiler" },
          { href: `${base}/anahtar-kelimeler`, label: "Anahtar Kelimeler", count: kw.c },
          { href: `${base}/ideal-icin`, label: "İdeal Müşteri", count: idf.c },
          { href: `${base}/ozellikler`, label: "Özellikler", count: ft.c },
          { href: `${base}/surec`, label: "Süreç", count: pr.c },
          { href: `${base}/sss`, label: "S.S.S.", count: fq.c },
          { href: `${base}/galeri`, label: "Galeri", count: gl.c },
          { href: `${base}/referanslar`, label: "Referanslar", count: ts.c },
        ]}
      />

      {children}
    </div>
  );
}
