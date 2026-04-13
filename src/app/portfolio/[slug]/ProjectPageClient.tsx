"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";

interface ProjectClientData {
  slug: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  client: string;
  year: string;
  services: string[];
  challenge: string;
  solution: string;
  results: string[];
  gallery: string[];
}

export default function ProjectPageClient({ project }: { project: ProjectClientData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const galRef = useRef(null);
  const galInView = useInView(galRef, { once: true, margin: "-80px" });
  const resRef = useRef(null);
  const resInView = useInView(resRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* Challenge & Solution */}
      <section ref={ref} className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[var(--color-surface)] to-[#0d1220]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.3em] mb-4 font-semibold">Zorluk</p>
              <p className="text-white/50 text-[15px] leading-relaxed mb-8">
                {project.challenge}
              </p>
              <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.3em] mb-4 font-semibold">Çözüm</p>
              <p className="text-white/50 text-[15px] leading-relaxed">
                {project.solution}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Services Used */}
              <div className="p-6 border border-[var(--color-border)] rounded-lg bg-[#0d1220]/50">
                <p className="text-white/70 text-[13px] font-semibold mb-4">Kullanılan Hizmetler</p>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span key={s} className="text-[11px] px-4 py-1.5 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/15 rounded-full text-white/50">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 border border-[var(--color-border)] rounded-lg bg-[#0d1220]/50">
                  <p className="text-white/30 text-[11px] uppercase tracking-[0.3em] mb-2">Müşteri</p>
                  <p className="text-white/80 text-[15px] font-semibold">{project.client}</p>
                </div>
                <div className="p-6 border border-[var(--color-border)] rounded-lg bg-[#0d1220]/50">
                  <p className="text-white/30 text-[11px] uppercase tracking-[0.3em] mb-2">Yıl</p>
                  <p className="text-white/80 text-[15px] font-semibold">{project.year}</p>
                </div>
              </div>

              <a
                href="/iletisim"
                className="inline-flex items-center gap-2 text-white text-[13px] uppercase tracking-[0.2em] px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-colors rounded"
              >
                Benzer Proje İçin Teklif Al
                <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section ref={galRef} className="relative py-16 lg:py-24">
        <div className="absolute inset-0 bg-[#0d1220]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 gap-3 lg:gap-4">
            {project.gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={galInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative aspect-[4/3] overflow-hidden rounded-lg group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${img}')` }}
                />
                <div className="absolute inset-0 bg-[#0d1220]/20 group-hover:bg-[#0d1220]/5 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section ref={resRef} className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[var(--color-surface)] to-[#0d1220]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={resInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">Sonuçlar</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              Elde Edilen <span className="text-[var(--color-accent)]">Başarılar</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={resInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 border border-[var(--color-border)] rounded-lg bg-[#0d1220]/50 text-center group hover:border-[var(--color-accent)]/20 transition-all duration-500"
              >
                <TrendingUp size={20} className="text-[var(--color-accent)] mx-auto mb-3" />
                <p className="text-white/80 text-[14px] font-medium">{r}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
