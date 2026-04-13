import type { Metadata } from "next";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Humor Creative — Ankara merkezli kreatif ajans. Stratejiden üretime, fikirden yayına kadar her aşamada yanınızdayız.",
};

export default function HakkimizdaPage() {
  return (
    <>
      {/* Cinematic Hero with Background Image */}
      <section className="relative h-[60vh] min-h-[420px] max-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220]/80 via-[#0d1220]/70 to-[#0d1220]" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">
            Hakkımızda
          </p>
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Biz <span className="text-[var(--color-accent)]">Humor</span>&apos;uz
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-white/60 text-base sm:text-lg leading-relaxed">
            Sınır yok. Kalıp yok. Sadece iyi fikir var.
          </p>
        </div>
      </section>

      <About />
      <Stats />
      <Testimonials />
    </>
  );
}
