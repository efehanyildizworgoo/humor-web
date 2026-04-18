"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import LogoMarquee from "./LogoMarquee";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background — Purple Gradient */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1c2545 0%, #6a4696 40%, #7463a9 65%, #a86dab 85%, #1c2545 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(250,234,146,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d1220]" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="text-[var(--color-gold)] text-[11px] sm:text-[13px] tracking-[0.5em] mb-6">
            CREATIVE AGENCY / ANKARA
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9]"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          <span className="text-white">HUMOR</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mt-8 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed"
        >
          Sınır yok. Kalıp yok. Sadece iyi fikir var.<br />
          Biz Humor&apos;uz, ortalığı karıştırıyoruz.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="/iletisim"
            className="px-10 py-3.5 bg-white text-[#1c2545] text-[13px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-gold)] transition-all duration-300"
          >
            Projeni Anlat
          </a>
          <a
            href="/portfolio"
            className="px-10 py-3.5 border border-white/30 text-white text-[13px] uppercase tracking-[0.2em] font-medium hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            Neler Yaptık?
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-[var(--color-gold)] transition-colors cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Keşfet</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      {/* Logo Marquee */}
      <LogoMarquee />
    </section>
  );
}
