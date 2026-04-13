import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getServiceBySlug, type ServiceData } from "@/data/services";
import ServicePageClient from "./ServicePageClient";

type SerializableService = Omit<ServiceData, "icon">;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[520px] sm:min-h-[480px] lg:h-[65vh] lg:max-h-[700px] flex items-center justify-center overflow-hidden pt-24 pb-12 sm:pt-20 sm:pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${service.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220]/80 via-[#0d1220]/70 to-[#0d1220]" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">
            Hizmetlerimiz
          </p>
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/50 text-[13px] sm:text-[15px] lg:text-[16px] leading-relaxed">
            {service.description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {service.keywords.map((kw) => (
              <span
                key={kw}
                className="text-[11px] px-4 py-1.5 border border-white/15 rounded-full text-white/50"
              >
                {kw}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/iletisim"
              className="px-8 py-3 bg-[var(--color-accent)] text-black text-[13px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-light)] transition-all duration-300 rounded"
            >
              Detaylı Bilgi
            </Link>
            <a
              href="https://wa.me/905400065544"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-white/20 text-white/80 text-[13px] uppercase tracking-[0.2em] hover:border-green-400 hover:text-green-400 transition-all duration-300 rounded flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.527 5.855L.06 23.94l6.248-1.436C8.015 23.48 9.96 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.82 0-3.543-.467-5.043-1.29l-.36-.214-3.733.858.894-3.626-.235-.374A9.94 9.94 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <ServicePageClient service={{
        slug: service.slug,
        title: service.title,
        shortDesc: service.shortDesc,
        heroImage: service.heroImage,
        aboutImage: service.aboutImage,
        keywords: service.keywords,
        description: service.description,
        longDescription: service.longDescription,
        whyUs: service.whyUs,
        idealFor: service.idealFor,
        features: service.features,
        process: service.process,
        faqs: service.faqs,
        gallery: service.gallery,
        testimonials: service.testimonials,
        seoText: service.seoText,
        bannerText: service.bannerText,
      }} />

      {/* Other Services */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-[#0d1220]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4 text-center">
            Diğer Hizmetlerimiz
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Daha Fazlasını Keşfedin
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/hizmetler/${s.slug}`}
                className="group relative overflow-hidden rounded-lg aspect-[4/3]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${s.heroImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] block mb-1">
                    {s.keywords[0]}
                  </span>
                  <h3
                    className="text-lg font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-28">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1c2545 0%, #6a4696 50%, #1c2545 100%)" }}
        />
        <div className="absolute inset-0 bg-[#0d1220]/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {service.title} için
            <br />
            <span className="text-[var(--color-accent)]">teklif alın.</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-md mx-auto">
            Projenizi anlatın, size özel bir teklif hazırlayalım.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/iletisim"
              className="px-10 py-3.5 bg-[var(--color-accent)] text-black text-[13px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-light)] transition-all duration-300"
            >
              İletişime Geç
            </Link>
            <a
              href="https://wa.me/905400065544"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-3.5 border border-white/20 text-white/80 text-[13px] uppercase tracking-[0.2em] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
            >
              WhatsApp&apos;tan Yaz
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
