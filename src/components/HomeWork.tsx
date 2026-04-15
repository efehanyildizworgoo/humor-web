"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "GreenPeak Marka Lansmanı",
    category: "Dijital Strateji",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "TechVista Reklam Filmi",
    category: "Prodüksiyon",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
  },
  {
    title: "Bloom Cosmetics Sosyal Medya",
    category: "Sosyal Medya",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80",
  },
  {
    title: "NovaTech Reels Serisi",
    category: "İçerik Üretimi",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
  },
  {
    title: "SoundWave Festival",
    category: "Canlı Yayın",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
  },
  {
    title: "Arkitekt Studio Drone",
    category: "Drone Çekimi",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
  },
];

export default function HomeWork() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -380 : 380, behavior: "smooth" });
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[var(--color-surface)] to-[#0d1220]" />

      <div ref={ref} className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 lg:mb-14 gap-6"
        >
          <div>
            <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">
              Portföy
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Son İşlerimiz
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 border border-[var(--color-border)] flex items-center justify-center text-white/40 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 border border-[var(--color-border)] flex items-center justify-center text-white/40 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-[var(--color-accent)] text-[13px] uppercase tracking-[0.2em] hover:text-[var(--color-accent-light)] transition-colors duration-300 group"
            >
              Tümü
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Full-width Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pl-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+3rem))] pr-6 pb-4 scrollbar-thin snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="flex-shrink-0 w-[300px] sm:w-[340px] snap-start group cursor-pointer"
              >
                {/* Tall vertical card */}
                <div className="relative overflow-hidden aspect-[3/4] rounded-lg">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1220] via-[#0d1220]/20 to-transparent" />

                  {/* Text at bottom center */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] block mb-2">
                      {project.category}
                    </span>
                    <h3
                      className="text-lg font-semibold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
