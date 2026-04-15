"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Megaphone,
  Lightbulb,
  PenTool,
  BarChart3,
  Clapperboard,
  Video,
  Plane,
  Radio,
  FileText,
} from "lucide-react";

const services = [
  {
    slug: "sosyal-medya-yonetimi",
    icon: Megaphone,
    title: "Sosyal Medya Yönetimi",
    keywords: ["Instagram & TikTok", "LinkedIn & X", "Topluluk Yönetimi"],
    desc: "Markanızı sosyal medyada aktif ve etkileyici tutuyoruz. Planlama, içerik takvimi ve topluluk yönetimi.",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80",
  },
  {
    slug: "dijital-strateji",
    icon: Lightbulb,
    title: "Dijital Strateji",
    keywords: ["Marka Konumlandırma", "Hedef Kitle Analizi", "Büyüme Stratejisi"],
    desc: "Veriye dayalı, sonuç odaklı dijital stratejiler kuruyoruz. Markanızı doğru kitleye, doğru mesajla ulaştırıyoruz.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    slug: "icerik-uretimi",
    icon: PenTool,
    title: "İçerik Üretimi",
    keywords: ["Görsel Tasarım", "Copywriting", "Reels & Shorts"],
    desc: "Yaratıcı ve özgün içeriklerle fark yaratıyoruz. Her platforma özel, dikkat çeken içerikler üretiyoruz.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
  },
  {
    slug: "reklam-yonetimi",
    icon: BarChart3,
    title: "Reklam Yönetimi",
    keywords: ["Meta Ads", "Google Ads", "Performans Pazarlama"],
    desc: "Dijital reklamlarınızı en verimli şekilde yönetiyoruz. ROI odaklı kampanyalarla bütçenizi değere dönüştürüyoruz.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    slug: "produksiyon",
    icon: Clapperboard,
    title: "Prodüksiyon",
    keywords: ["Reklam Filmi", "Tanıtım Filmi", "Kurumsal Video"],
    desc: "Profesyonel video ve fotoğraf prodüksiyonu. Sinematik kalitede içeriklerle markanızın hikayesini anlatıyoruz.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
  },
  {
    slug: "video-kurgulama",
    icon: Video,
    title: "Video Kurgulama",
    keywords: ["Montaj", "Color Grading", "Motion Graphics"],
    desc: "Etkileyici kurguyla hikayenizi anlatıyoruz. Post-prodüksiyonda her kareyi mükemmelleştiriyoruz.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
  },
  {
    slug: "drone-cekimi",
    icon: Plane,
    title: "Drone Çekimi",
    keywords: ["8K Aerial", "Havadan Görüntüleme", "Emlak & İnşaat"],
    desc: "Havadan çekimlerle farklı bir perspektif sunuyoruz. Profesyonel pilot ekibimizle her açıdan görüntüleme.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
  },
  {
    slug: "canli-yayin",
    icon: Radio,
    title: "Canlı Yayın",
    keywords: ["Multi-Kamera", "Streaming", "Etkinlik Yayını"],
    desc: "Profesyonel canlı yayın hizmeti. Etkinliklerinizi geniş kitlelere ulaştırıyoruz.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
  },
  {
    slug: "senaryo-yazimi",
    icon: FileText,
    title: "Senaryo Yazımı",
    keywords: ["Kreatif Brief", "Storyboard", "Script"],
    desc: "Markanız için özgün senaryo ve hikaye geliştirme. Fikirden üretime kadar yaratıcı sürecin tamamı.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-16 sm:py-24 lg:py-44">
      <div className="absolute inset-0 bg-[#0d1220]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Grid — 3 col for 9 services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[var(--color-border)]">
          {services.map((service, i) => (
            <Link
              key={i}
              href={`/hizmetler/${service.slug}`}
            >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.07 }}
              className="relative overflow-hidden group cursor-pointer"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${service.image}')` }}
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-[#0d1220]/85 group-hover:bg-[#0d1220]/75 transition-all duration-700" />

              {/* Content */}
              <div className="relative z-10 p-10 lg:p-12">
                <service.icon
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
                  {service.desc}
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
