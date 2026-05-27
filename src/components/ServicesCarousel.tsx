"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@/lib/icons";
import type { PublicServiceListItem } from "@/lib/queries/services";

export default function ServicesCarousel({ items }: { items: PublicServiceListItem[] }) {
  const services = items;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % services.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + services.length) % services.length), []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [paused, next]);

  if (services.length === 0) return null;
  const s = services[current];

  return (
    <section className="relative py-16 sm:py-24 lg:py-44">
      <div className="absolute inset-0 bg-[#0d1220]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 lg:mb-20"
        >
          <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">
            Hizmetlerimiz
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Neler <span className="text-[var(--color-accent)]">Yapıyoruz?</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid lg:grid-cols-2 gap-0 min-h-[420px]">
            {/* Image Side */}
            <div className="relative overflow-hidden">
              <motion.div
                key={`img-${current}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${s.heroImage}')` }}
              />
              <div className="absolute inset-0 bg-black/40" />

              {/* Counter */}
              <div className="absolute top-6 left-6 z-10">
                <span className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em]">
                  {String(current + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="bg-[var(--color-surface)] p-10 lg:p-16 flex flex-col justify-center relative">
              <motion.div
                key={`content-${current}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Icon
                  name={s.icon}
                  size={36}
                  strokeWidth={1.2}
                  className="text-[var(--color-accent)] mb-6 opacity-70"
                />
                <h3
                  className="text-3xl lg:text-4xl font-bold mb-5 text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.title}
                </h3>
                <p className="text-white/50 text-[15px] leading-relaxed mb-8 max-w-md">
                  {s.shortDesc || s.description}
                </p>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="inline-flex items-center gap-2 text-[var(--color-accent)] text-[13px] uppercase tracking-[0.2em] hover:text-[var(--color-accent-light)] transition-colors duration-300 group"
                >
                  Detaylar
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute bottom-6 right-6 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-6 flex lg:flex-col gap-2 z-10">
            <button
              onClick={prev}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 bg-[#0d1220]/60 backdrop-blur-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 bg-[#0d1220]/60 backdrop-blur-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-[var(--color-accent)]" : "w-3 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* See All */}
        <div className="text-center mt-10">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[var(--color-accent)]/40 text-[var(--color-accent)] text-[12px] uppercase tracking-[0.2em] hover:bg-[var(--color-accent)]/5 hover:border-[var(--color-accent)] transition-all duration-300"
          >
            Tüm Hizmetleri Gör
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
