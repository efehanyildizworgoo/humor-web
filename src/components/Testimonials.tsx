"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mehmet Yılmaz",
    title: "Pazarlama Direktörü, TechVista",
    text: "Humor Creative ekibiyle çalışmak inanılmaz bir deneyimdi. Sosyal medya stratejimiz tamamen değişti ve etkileşim oranlarımız üç katına çıktı.",
  },
  {
    name: "Ayşe Kara",
    title: "Kurucu, Bloom Cosmetics",
    text: "İçerik üretiminde gerçekten fark yarattılar. Her paylaşım markanın ruhunu yansıtıyor. Kesinlikle doğru ajansı seçtik.",
  },
  {
    name: "Can Demir",
    title: "Etkinlik Müdürü, SoundWave",
    text: "Festival canlı yayınımızı ve aftermovie&apos;mizi Humor Creative yaptı. Hem teknik hem kreatif olarak beklentilerimizin çok üzerindeydi.",
  },
  {
    name: "Elif Başaran",
    title: "Marka Müdürü, GreenPeak",
    text: "Lansman kampanyamızı sıfırdan tasarladılar. Strateji, içerik, reklam yönetimi — her şey tek elden ve kusursuzdu.",
  },
  {
    name: "Burak Özkan",
    title: "CEO, Arkitekt Studio",
    text: "Drone çekimleri ve kurumsal tanıtım filmimiz muhteşem oldu. Projelerimizi müşterilere sunarken büyük avantaj sağlıyor.",
  },
  {
    name: "Selin Aydın",
    title: "İletişim Uzmanı, NovaTech",
    text: "Reels serimiz viral oldu — 2 milyonun üzerinde organik görüntülenme aldık. Humor Creative gerçekten işini biliyor.",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="relative py-16 sm:py-24 lg:py-44 overflow-x-hidden overflow-y-visible">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[var(--color-surface)] to-[#0d1220]" />

      <div ref={ref} className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-10 lg:mb-16 px-6"
        >
          <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">
            Müşteri Yorumları
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Neden <span className="text-[var(--color-accent)]">Biz?</span>
          </h2>
        </motion.div>

        {/* Marquee Row 1 — left to right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4 overflow-hidden"
        >
          <div className="testimonial-track-ltr flex w-max gap-4">
            {doubled.map((t, i) => (
              <TestimonialCard key={`ltr-${i}`} {...t} />
            ))}
          </div>
        </motion.div>

        {/* Marquee Row 2 — right to left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="overflow-hidden"
        >
          <div className="testimonial-track-rtl flex w-max gap-4">
            {[...doubled].reverse().map((t, i) => (
              <TestimonialCard key={`rtl-${i}`} {...t} />
            ))}
          </div>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 px-6"
        >
          <a
            href="https://wa.me/905400065544"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-3.5 border border-white/20 text-white/80 text-[13px] uppercase tracking-[0.2em] font-medium hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Sorunuz mu Var? Bize Yazın!
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  title,
  text,
}: {
  name: string;
  title: string;
  text: string;
}) {
  return (
    <div className="w-[380px] sm:w-[420px] flex-shrink-0 border border-[var(--color-border)] bg-[#0d1220]/80 backdrop-blur-sm p-8 group hover:border-white/10 transition-all duration-500">
      <Quote
        size={24}
        className="text-[var(--color-accent)] opacity-30 mb-5"
      />
      <p className="text-white/40 text-[14px] leading-relaxed mb-6 group-hover:text-white/55 transition-colors duration-500">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--color-surface-light)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] text-[13px] font-semibold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-white/70 text-[13px] font-medium">{name}</p>
          <p className="text-white/25 text-[11px]">{title}</p>
        </div>
      </div>
    </div>
  );
}
