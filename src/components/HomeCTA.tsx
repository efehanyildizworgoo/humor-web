"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 lg:py-32">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #1c2545 0%, #6a4696 50%, #1c2545 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[#0d1220]/70" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Bir fikrin mi var?
            <br />
            <span className="text-[var(--color-accent)]">Hadi ortalığı karıştıralım.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-white/40 text-base leading-relaxed">
            Markanızı konuşulan, hissedilen ve iz bırakan bir yere taşıyalım.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/iletisim"
              className="group flex items-center gap-2 px-10 py-3.5 bg-[var(--color-accent)] text-black text-[13px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-light)] transition-all duration-300"
            >
              İletişime Geç
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://wa.me/905400065544"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-10 py-3.5 border border-white/20 text-white/80 text-[13px] uppercase tracking-[0.2em] font-medium hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp&apos;tan Yaz
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
