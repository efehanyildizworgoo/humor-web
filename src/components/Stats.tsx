"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "50+", label: "Tamamlanan Proje" },
  { value: "30+", label: "Mutlu Marka" },
  { value: "1M+", label: "Toplam Erişim" },
  { value: "∞", label: "Yaratıcı Fikir" },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-16">
      <div ref={ref} className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="text-4xl sm:text-5xl font-bold text-[var(--color-accent)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </div>
              <div className="mt-2 text-[13px] text-white/40">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
