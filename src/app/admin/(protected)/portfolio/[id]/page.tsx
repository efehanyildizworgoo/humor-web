import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card } from "../../_components/ui";
import EditProjectForm from "./EditProjectForm";

export const dynamic = "force-dynamic";

export default async function ProjectMainEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();
  const [p] = await db.select().from(projects).where(eq(projects.id, id));
  if (!p) notFound();

  return (
    <Card>
      <EditProjectForm
        id={id}
        initial={{
          title: p.title,
          slug: p.slug,
          category: p.category,
          image: p.image,
          desc: p.desc,
          client: p.client,
          year: p.year,
          challenge: p.challenge,
          solution: p.solution,
          published: p.published,
        }}
      />
    </Card>
  );
}
