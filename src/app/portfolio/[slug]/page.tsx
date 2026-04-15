import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProjectBySlug } from "@/data/projects";
import ProjectPageClient from "./ProjectPageClient";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Portföy`,
    description: project.desc,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] max-h-[600px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${project.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1220] via-[#0d1220]/60 to-[#0d1220]/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full">
          <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-3">
            {project.category}
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-white/40 text-[13px]">
            <span>Müşteri: <span className="text-white/70">{project.client}</span></span>
            <span>Yıl: <span className="text-white/70">{project.year}</span></span>
          </div>
        </div>
      </section>

      <ProjectPageClient project={{
        slug: project.slug,
        title: project.title,
        category: project.category,
        image: project.image,
        desc: project.desc,
        client: project.client,
        year: project.year,
        services: project.services,
        challenge: project.challenge,
        solution: project.solution,
        results: project.results,
        gallery: project.gallery,
      }} />

      {/* Other Projects */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-[#0d1220]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4 text-center">
            Diğer Projeler
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Daha Fazlasını Keşfedin
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group relative overflow-hidden rounded-lg aspect-[4/3]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${p.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] block mb-1">
                    {p.category}
                  </span>
                  <h3
                    className="text-lg font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
