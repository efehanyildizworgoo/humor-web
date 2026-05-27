import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card } from "../../_components/ui";
import EditServiceForm from "./EditServiceForm";

export const dynamic = "force-dynamic";

export default async function ServiceMainEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();
  const [svc] = await db.select().from(services).where(eq(services.id, id));
  if (!svc) notFound();

  return (
    <Card>
      <EditServiceForm
        id={id}
        initial={{
          title: svc.title,
          slug: svc.slug,
          icon: svc.icon,
          shortDesc: svc.shortDesc,
          heroImage: svc.heroImage,
          aboutImage: svc.aboutImage,
          description: svc.description,
          longDescription: svc.longDescription,
          whyUs: svc.whyUs,
          seoText: svc.seoText,
          bannerText: svc.bannerText,
          published: svc.published,
        }}
      />
    </Card>
  );
}
