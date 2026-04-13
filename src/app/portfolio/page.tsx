import type { Metadata } from "next";
import Work from "@/components/Work";
import HomeCTA from "@/components/HomeCTA";

export const metadata: Metadata = {
  title: "Portföy",
  description: "Humor Creative projelerini keşfedin. Dijital strateji, sosyal medya, prodüksiyon ve içerik üretimi çalışmalarımız.",
};

export default function PortfolioPage() {
  return (
    <>
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] min-h-[420px] max-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220]/80 via-[#0d1220]/70 to-[#0d1220]" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">
            Portföy
          </p>
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            İşlerimiz
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-white/60 text-base sm:text-lg leading-relaxed">
            Her projede iz bırakan, konuşulan ve hatırlanan işler.
          </p>
        </div>
      </section>

      <Work />
      <HomeCTA />
    </>
  );
}
