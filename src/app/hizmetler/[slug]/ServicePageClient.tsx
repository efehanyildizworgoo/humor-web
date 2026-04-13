"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle, ChevronDown, Quote } from "lucide-react";
import Image from "next/image";

interface ServiceClientData {
  slug: string;
  title: string;
  shortDesc: string;
  heroImage: string;
  aboutImage: string;
  keywords: string[];
  description: string;
  longDescription: string;
  whyUs: string;
  idealFor: string[];
  features: { title: string; text: string }[];
  process: { step: string; desc: string }[];
  faqs: { q: string; a: string }[];
  gallery: string[];
  testimonials: { name: string; title: string; text: string }[];
  seoText: string;
  bannerText: string;
}

const referenceLogos = [
  { src: "/logos/trt.png", alt: "TRT" },
  { src: "/logos/sahibinden.png", alt: "Sahibinden" },
  { src: "/logos/panora.png", alt: "Panora" },
  { src: "/logos/mac.png", alt: "MAC" },
  { src: "/logos/asus.png", alt: "ASUS" },
  { src: "/logos/turkiye-sigorta.png", alt: "Türkiye Sigorta" },
  { src: "/logos/lassa.png", alt: "Lassa" },
  { src: "/logos/soler.png", alt: "Şölen" },
  { src: "/logos/velux.png", alt: "Velux" },
  { src: "/logos/relax.png", alt: "Relax" },
  { src: "/logos/natura-dunyasi.png", alt: "Natura Dünyası" },
  { src: "/logos/oila.png", alt: "Oila" },
  { src: "/logos/avion.png", alt: "Avion" },
  { src: "/logos/fabregas.png", alt: "Fabregas" },
  { src: "/logos/pusat.png", alt: "Pusat" },
  { src: "/logos/luppo.png", alt: "Luppo" },
  { src: "/logos/ozmo.png", alt: "Ozmo" },
  { src: "/logos/tat.png", alt: "Tat" },
  { src: "/logos/ak-parti.png", alt: "AK Parti" },
  { src: "/logos/ankara-bbsk.png", alt: "Ankara Büyükşehir Belediyesi" },
];

export default function ServicePageClient({ service }: { service: ServiceClientData }) {
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-80px" });
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: "-80px" });
  const procRef = useRef(null);
  const procInView = useInView(procRef, { once: true, margin: "-80px" });
  const testRef = useRef(null);
  const testInView = useInView(testRef, { once: true, margin: "-80px" });
  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ───── 1. REFERANS LOGOLARI ───── */}
      <section className="relative py-10 lg:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[#0d1220]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-center text-white/20 text-[11px] uppercase tracking-[0.4em] mb-8">
            Güvenilir Markalarla Çalışıyoruz
          </p>
          <div className="overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-14 sm:gap-20">
              {[...referenceLogos, ...referenceLogos].map((logo, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[120px] sm:w-[150px] h-[38px] sm:h-[48px] flex items-center justify-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={150}
                    height={48}
                    className="max-h-full max-w-full object-contain select-none grayscale opacity-40 hover:grayscale-0 hover:opacity-80 transition-all duration-500"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── 2. HİZMET TANIMI — Sol Metin / Sağ Görsel ───── */}
      <section ref={aboutRef} className="relative py-16 sm:py-24 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[var(--color-surface)] to-[#0d1220]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Sol — Metin */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9 }}
            >
              <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">
                {service.title} Nedir?
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Markanızı bir adım <span className="text-[var(--color-accent)]">öne taşıyoruz.</span>
              </h2>
              <p className="text-white/50 text-[15px] leading-[1.8] mb-6">
                {service.longDescription}
              </p>
              <div className="p-5 border-l-2 border-[var(--color-accent)] bg-white/[0.02] rounded-r-lg mb-8">
                <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.3em] mb-2 font-semibold">Neden Humor?</p>
                <p className="text-white/55 text-[14px] leading-relaxed">{service.whyUs}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {service.idealFor.map((item) => (
                  <span key={item} className="text-[11px] px-3.5 py-1.5 bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/12 rounded-full text-white/40">
                    {item}
                  </span>
                ))}
              </div>
              <a
                href="/iletisim"
                className="inline-flex items-center gap-2 text-white text-[13px] uppercase tracking-[0.2em] px-7 py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-all duration-300 rounded group"
              >
                Detaylı Bilgi
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Sağ — Görsel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${service.aboutImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1220]/60 via-transparent to-[#0d1220]/20" />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-4 left-4 sm:-bottom-6 sm:-left-6 bg-[var(--color-accent)] text-black px-5 py-3 sm:px-6 sm:py-4 rounded-xl shadow-2xl">
                <p className="text-[28px] font-bold" style={{ fontFamily: "var(--font-display)" }}>200+</p>
                <p className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-70">Mutlu Müşteri</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── 3. BU HİZMETTE NELER SUNUYORUZ ───── */}
      <section ref={featRef} className="relative py-16 sm:py-24 lg:py-36">
        <div className="absolute inset-0 bg-[#0d1220]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">Hizmet Kapsamı</p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Bu hizmette neler <span className="text-[var(--color-accent)]">sunuyoruz?</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {service.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={featInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-5 p-7 border border-[var(--color-border)] rounded-xl bg-white/[0.02] hover:border-[var(--color-accent)]/25 hover:bg-white/[0.04] transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)]/20 transition-colors duration-500">
                  <CheckCircle size={18} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="text-white/90 text-[16px] font-semibold mb-2">{f.title}</h3>
                  <p className="text-white/40 text-[14px] leading-relaxed">{f.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 4. ARA BANNER ───── */}
      <section className="relative py-14 sm:py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1c2545 0%, #6a4696 50%, #1c2545 100%)" }}
        />
        <div className="absolute inset-0 bg-[#0d1220]/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-3xl lg:text-4xl font-bold leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {service.bannerText}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8"
          >
            <a
              href="https://wa.me/905400065544"
              className="inline-flex items-center gap-2 text-black text-[13px] uppercase tracking-[0.2em] px-8 py-3.5 bg-white hover:bg-white/90 transition-all duration-300 rounded font-semibold"
            >
              Hemen Başlayın
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ───── 5. NASIL ÇALIŞIYORUZ ───── */}
      <section ref={procRef} className="relative py-16 sm:py-24 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[var(--color-surface)] to-[#0d1220]" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={procInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">Süreç</p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Nasıl <span className="text-[var(--color-accent)]">Çalışıyoruz?</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.process.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={procInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative p-7 border border-[var(--color-border)] rounded-xl bg-white/[0.02] group hover:border-[var(--color-accent)]/25 transition-all duration-500"
              >
                <div className="text-[var(--color-accent)] text-[32px] font-bold opacity-20 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  className="text-[17px] font-semibold mb-2 text-white/90 group-hover:text-[var(--color-accent)] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.step}
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 6. MÜŞTERİ YORUMLARI ───── */}
      <section ref={testRef} className="relative py-16 sm:py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1220] via-[#1a1840] to-[#0d1220]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">Müşteri Yorumları</p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Müşterilerimiz Ne <span className="text-[var(--color-accent)]">Diyor?</span>
            </h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2">
            {service.testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={testInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 border border-[var(--color-border)] rounded-xl bg-white/[0.02] hover:border-white/10 transition-all duration-500"
              >
                <Quote size={24} className="text-[var(--color-accent)] opacity-30 mb-5" />
                <p className="text-white/50 text-[14px] leading-[1.8] mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-surface-light)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] text-[13px] font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white/70 text-[13px] font-medium">{t.name}</p>
                    <p className="text-white/25 text-[11px]">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 7. SIKÇA SORULAN SORULAR ───── */}
      <section ref={faqRef} className="relative py-16 sm:py-24 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[var(--color-surface)] to-[#0d1220]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">SSS</p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sıkça Sorulan <span className="text-[var(--color-accent)]">Sorular</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {service.faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-[var(--color-border)] rounded-xl overflow-hidden hover:border-white/10 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-white/80 text-[15px] font-medium pr-4">{faq.q}</span>
                  <ChevronDown size={18} className={`text-white/30 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-white/40 text-[14px] leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* FAQ altı CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-14"
          >
            <a
              href="/iletisim"
              className="inline-flex items-center gap-2 text-white text-[13px] uppercase tracking-[0.2em] px-8 py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-all duration-300 rounded group"
            >
              Hemen İletişime Geçin
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ───── 8. SEO METİN ───── */}
      <section className="relative border-t border-[var(--color-border)]">
        <div className="absolute inset-0 bg-[#0d1220]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="h-[100px] overflow-y-auto pr-4 scrollbar-thin">
            <p className="text-white/15 text-[13px] leading-relaxed">
              {service.seoText}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
