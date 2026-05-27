"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Icon } from "@/lib/icons";
import type { PublicServiceListItem } from "@/lib/queries/services";

export default function Services({ items }: { items: PublicServiceListItem[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-16 sm:py-24 lg:py-44">
      <div className="absolute inset-0 bg-[#0d1220]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[var(--color-border)]">
          {items.map((service, i) => (
            <Link key={service.slug} href={`/hizmetler/${service.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.07 }}
                className="relative overflow-hidden group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${service.heroImage}')` }}
                />
                <div className="absolute inset-0 bg-[#0d1220]/85 group-hover:bg-[#0d1220]/75 transition-all duration-700" />

                <div className="relative z-10 p-10 lg:p-12">
                  <Icon
                    name={service.icon}
                    size={32}
                    strokeWidth={1.2}
                    className="text-[var(--color-accent)] mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <h3
                    className="text-xl font-semibold mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-500"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-[14px] leading-relaxed group-hover:text-white/60 transition-colors duration-500 mb-6">
                    {service.shortDesc || service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[11px] px-3 py-1 border border-white/8 rounded-full text-white/30 group-hover:border-[var(--color-accent)]/20 group-hover:text-white/50 transition-all duration-500"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 w-8 h-[1px] bg-[var(--color-accent)] opacity-0 group-hover:opacity-60 group-hover:w-16 transition-all duration-700" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
