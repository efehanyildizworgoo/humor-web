"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Hangi hizmetleri sunuyorsunuz?",
    a: "Sosyal medya yönetimi, dijital strateji, içerik üretimi, reklam yönetimi (Meta & Google Ads), prodüksiyon, video kurgulama, drone çekimi, canlı yayın ve senaryo yazımı hizmetleri sunuyoruz.",
  },
  {
    q: "Süreç nasıl işliyor?",
    a: "İlk olarak markanızı ve hedeflerinizi anlatan bir keşif toplantısı yapıyoruz. Ardından stratejik brief hazırlıyor, kreatif konseptleri sunuyor ve onay sonrası üretime geçiyoruz. Her aşamada şeffaf iletişim ve revizyon imkânı sağlıyoruz.",
  },
  {
    q: "Fiyatlandırma nasıl yapılıyor?",
    a: "Her proje kendine özgü olduğu için paket bazlı ve proje bazlı fiyatlandırma seçeneklerimiz var. Aylık sosyal medya yönetimi, tek seferlik prodüksiyon projeleri veya entegre kampanyalar için size özel teklif hazırlıyoruz.",
  },
  {
    q: "Sadece Ankara'da mı hizmet veriyorsunuz?",
    a: "Merkezimiz Ankara'da olmakla birlikte Türkiye genelinde ve yurt dışında hizmet veriyoruz. Dijital hizmetlerimiz lokasyon bağımsız, prodüksiyon hizmetlerimiz için ekibimizle projenizin olduğu yere geliyoruz.",
  },
  {
    q: "Minimum proje süresi var mı?",
    a: "Sosyal medya yönetimi için minimum 3 aylık anlaşma öneriyoruz çünkü dijital stratejilerin sonuç vermesi zaman alır. Prodüksiyon ve tek seferlik projeler için süre sınırı yoktur.",
  },
  {
    q: "Raporlama yapıyor musunuz?",
    a: "Evet, aylık detaylı performans raporları sunuyoruz. Etkileşim oranları, erişim, büyüme metrikleri ve reklam performansı gibi tüm KPI'ları şeffaf şekilde paylaşıyoruz.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-16 sm:py-24 lg:py-44">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[var(--color-surface)] to-[#0d1220]" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 lg:mb-20"
        >
          <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">
            SSS
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sıkça Sorulan <span className="text-[var(--color-accent)]">Sorular</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-[1px] bg-[var(--color-border)]">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-[#0d1220]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 p-6 lg:p-8 text-left group transition-colors duration-500 hover:bg-[var(--color-surface-light)]"
                >
                  <span className="text-[15px] lg:text-[17px] font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0 w-10 h-10 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] group-hover:border-[var(--color-accent)]/30 transition-all duration-300">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 lg:px-8 pb-6 lg:pb-8 text-white/40 text-[14px] lg:text-[15px] leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
