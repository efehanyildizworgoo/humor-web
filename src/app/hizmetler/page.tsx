import type { Metadata } from "next";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import HomeCTA from "@/components/HomeCTA";

export const metadata: Metadata = {
  title: "Hizmetler",
  description: "Sosyal medya yönetimi, dijital strateji, içerik üretimi, reklam yönetimi, prodüksiyon, drone çekimi, canlı yayın ve senaryo yazımı hizmetlerimiz.",
};

export default function HizmetlerPage() {
  return (
    <>
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] min-h-[420px] max-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80')" }}
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
            Neler <span className="text-[var(--color-accent)]">Yapıyoruz?</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-white/60 text-base sm:text-lg leading-relaxed">
            Stratejiden üretime, fikirden yayına. Markanızı bir adım öteye taşıyoruz.
          </p>
        </div>
      </section>

      <Services />
      <FAQ />
      <HomeCTA />
    </>
  );
}
