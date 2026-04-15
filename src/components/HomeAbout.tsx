"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeAbout() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[var(--color-surface)] to-[#0d1220]" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-lg sm:text-xl leading-relaxed text-white/50"
        >
          Uçuk kaçık fikirlerimizi zekâyla harmanlıyor, sınırları zorlayan işlere imza atıyoruz.{" "}
          <span className="text-white/80 font-medium">&ldquo;Çok iyi iş çıkarmışlar!&rdquo;</span>{" "}
          dedirten TV reklamlarına da{" "}
          <span className="text-white/80 font-medium">&ldquo;Kesin viral olur!&rdquo;</span>{" "}
          gözüyle bakılan reelslere de aynı tutkuyla dokunuyoruz.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10"
        >
          <Link
            href="/hakkimizda"
            className="inline-flex items-center gap-2 text-[var(--color-accent)] text-[13px] uppercase tracking-[0.2em] hover:text-[var(--color-accent-light)] transition-colors duration-300 group"
          >
            Bizi Daha Yakından Tanıyın
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
