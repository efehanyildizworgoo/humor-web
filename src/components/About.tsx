"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-44">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[var(--color-surface)] to-[#0d1220]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="space-y-5 text-white/50 text-[15px] leading-relaxed">
              <p>
                Humor Creative, Humor kuruluşunun kreatif ajans markasıdır. Uçuk kaçık fikirlerimizi zekâyla harmanlıyor, sınırları zorlayan işlere imza atıyoruz.
              </p>
              <p>
                &ldquo;Çok iyi iş çıkarmışlar!&rdquo; dedirten TV reklamlarına da, &ldquo;Kesin viral olur!&rdquo; gözüyle bakılan reelslere de aynı tutkuyla dokunuyoruz. Stratejiden üretime, fikirden yayına kadar her aşamada yanınızdayız.
              </p>
              <p>
                Sosyal medya yönetiminden dijital stratejiye, içerik üretiminden prodüksiyona kadar geniş bir yelpazede hizmet veriyoruz. Her projede markanızın DNA&apos;sını anlıyor, onu konuşulan, hissedilen ve iz bırakan bir yere taşıyoruz.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[var(--color-accent)]" />
              <span className="text-[var(--color-accent)] text-[12px] uppercase tracking-[0.3em]">
                Sınır Yok. Kalıp Yok. Sadece İyi Fikir Var.
              </span>
            </div>
          </motion.div>

          {/* Right — Extended Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="border border-[var(--color-border)] p-8 lg:p-12 space-y-6">
              <p className="text-white/50 text-[15px] leading-relaxed">
                Markaların hikâyesini sadece anlatmakla yetinmiyoruz; onu hedef kitlenin gözlerini alamayacağı, yaşayan bir deneyime dönüştürüyoruz. Her platformda, her formatta — tutarlı, yaratıcı ve etkileyici.
              </p>
              <p className="text-white/50 text-[15px] leading-relaxed">
                Dijital dünyada var olmak yetmez; fark edilmek, hatırlanmak ve tercih edilmek gerekir. Biz tam da bunun için varız. Veriye dayalı stratejilerle yaratıcılığı birleştiriyor, ölçülebilir sonuçlar üretiyoruz.
              </p>
              <p className="text-white/50 text-[15px] leading-relaxed">
                Ankara merkezli, Türkiye genelinde hizmet veren ekibimizle her projede tek bir amaçla çalışıyoruz: Markanızı bir adım öteye taşımak.
              </p>
            </div>

            {/* Floating accent corner */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[var(--color-accent)] opacity-40" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[var(--color-accent)] opacity-40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
