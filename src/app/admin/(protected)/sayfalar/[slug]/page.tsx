import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getPageBySlug, getPageContent } from "@/lib/pageContent";
import { PageHeader, Card } from "../../_components/ui";
import PageContentForm from "./PageContentForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  return { title: page ? page.title : "Sayfa" };
}

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) notFound();

  const values = await getPageContent(slug);

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title={page.title}
        description={page.description}
        back={{ href: "/admin/sayfalar", label: "Sayfalar" }}
        action={
          <a
            href={page.publicHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-[#2a3158] bg-[#111729] px-3 py-2 text-xs text-white hover:border-[#6a4696]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Sitede Gör
          </a>
        }
      />

      <Card>
        <PageContentForm slug={slug} page={page} values={values} />
      </Card>
    </div>
  );
}
