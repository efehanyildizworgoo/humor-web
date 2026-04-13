"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects, categories } from "@/data/projects";

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState("Tümü");

  const filtered = filter === "Tümü" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="relative py-16 sm:py-24 lg:py-44">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[var(--color-surface)] to-[#0d1220]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[11px] px-4 py-2 uppercase tracking-[0.15em] border transition-all duration-300 ${
                filter === cat
                  ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/5"
                  : "border-[var(--color-border)] text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <Link key={project.slug} href={`/portfolio/${project.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-[13px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {project.desc}
                    </p>
                  </div>
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/40 group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)] transition-all duration-300 flex-shrink-0">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-block px-10 py-3.5 border border-[var(--color-accent)]/40 text-[var(--color-accent)] text-[12px] uppercase tracking-[0.2em] hover:bg-[var(--color-accent)]/5 hover:border-[var(--color-accent)] transition-all duration-300"
          >
            Projenizi Konuşalım
          </a>
        </motion.div>
      </div>
    </section>
  );
}
