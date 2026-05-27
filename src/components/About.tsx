"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About({
  leftHtml,
  rightHtml,
  tagline,
}: {
  leftHtml: string;
  rightHtml: string;
  tagline: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-44">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220] via-[var(--color-surface)] to-[#0d1220]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div
              className="prose-rich text-[15px] text-white/50"
              dangerouslySetInnerHTML={{ __html: leftHtml }}
            />

            {tagline ? (
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[var(--color-accent)]" />
                <span className="text-[var(--color-accent)] text-[12px] uppercase tracking-[0.3em]">
                  {tagline}
                </span>
              </div>
            ) : null}
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div
              className="prose-rich border border-[var(--color-border)] p-8 lg:p-12 text-[15px] text-white/50"
              dangerouslySetInnerHTML={{ __html: rightHtml }}
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[var(--color-accent)] opacity-40" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[var(--color-accent)] opacity-40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
