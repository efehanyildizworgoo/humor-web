import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Humor Creative ile iletişime geçin. Yeni projeniz için teklif alın veya detaylı bilgi edinin.",
};

export default function IletisimPage() {
  return (
    <>
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] min-h-[420px] max-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220]/80 via-[#0d1220]/70 to-[#0d1220]" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">
            İletişim
          </p>
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Projenizi <span className="text-[var(--color-accent)]">Konuşalım!</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-white/60 text-base sm:text-lg leading-relaxed">
            Yeni bir proje mi planlıyorsunuz? Fiyat teklifi almak için bizimle iletişime geçin.
          </p>
        </div>
      </section>

      <Contact />

      {/* Full-width Google Map */}
      <section className="relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0d1220] to-transparent z-10 pointer-events-none" />
        <div className="relative w-full h-[450px] lg:h-[500px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.0!2d32.8!3d39.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU1JzU0LjAiTiAzMsKwNDcnNDUuNiJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Humor Creative Konum"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d1220] to-transparent z-10 pointer-events-none" />
      </section>
    </>
  );
}
