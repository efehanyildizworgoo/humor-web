"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Send, Megaphone, Lightbulb, PenTool, BarChart3, Clapperboard, Video, Plane, Radio, FileText, ChevronDown } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetler", href: "/hizmetler", hasMega: true },
  { label: "Portföy", href: "/portfolio" },
  { label: "İletişim", href: "/iletisim" },
];

const megaServices = [
  { icon: Megaphone, title: "Sosyal Medya Yönetimi", desc: "Instagram, TikTok, LinkedIn yönetimi", href: "/hizmetler/sosyal-medya-yonetimi" },
  { icon: Lightbulb, title: "Dijital Strateji", desc: "Marka konumlandırma & büyüme", href: "/hizmetler/dijital-strateji" },
  { icon: PenTool, title: "İçerik Üretimi", desc: "Görsel tasarım, copywriting, reels", href: "/hizmetler/icerik-uretimi" },
  { icon: BarChart3, title: "Reklam Yönetimi", desc: "Meta Ads, Google Ads, performans", href: "/hizmetler/reklam-yonetimi" },
  { icon: Clapperboard, title: "Prodüksiyon", desc: "Reklam filmi, tanıtım, kurumsal", href: "/hizmetler/produksiyon" },
  { icon: Video, title: "Video Kurgulama", desc: "Montaj, color grading, motion", href: "/hizmetler/video-kurgulama" },
  { icon: Plane, title: "Drone Çekimi", desc: "8K aerial, havadan görüntüleme", href: "/hizmetler/drone-cekimi" },
  { icon: Radio, title: "Canlı Yayın", desc: "Multi-kamera, streaming, etkinlik", href: "/hizmetler/canli-yayin" },
  { icon: FileText, title: "Senaryo Yazımı", desc: "Kreatif brief, storyboard, script", href: "/hizmetler/senaryo-yazimi" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0d1220]/90 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/logo-white.svg" alt="Humor" className="h-5 w-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) =>
              link.hasMega ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <Link
                    href={link.href}
                    className="text-[13px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-1"
                  >
                    {link.label}
                    <ChevronDown size={12} className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <button
            onClick={() => setShowQuote(true)}
            className="hidden md:inline-flex text-[13px] uppercase tracking-[0.15em] px-6 py-2.5 border border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Teklif Al!
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/80 p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mega Menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-20 left-0 right-0 z-[49] flex justify-center pointer-events-none"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <div className="pointer-events-auto max-w-5xl w-full mx-6 bg-[#111729]/98 backdrop-blur-2xl border border-white/[0.06] rounded-xl shadow-2xl shadow-black/40 overflow-hidden">
              <div className="p-6">
                <div className="grid grid-cols-3 gap-1">
                  {megaServices.map((s) => (
                    <Link
                      key={s.title}
                      href={s.href}
                      onClick={() => setMegaOpen(false)}
                      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.04] transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)]/20 transition-colors duration-300">
                        <s.icon size={16} className="text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <p className="text-white/80 text-[13px] font-medium group-hover:text-[var(--color-accent)] transition-colors duration-300">
                          {s.title}
                        </p>
                        <p className="text-white/30 text-[11px] mt-0.5">{s.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <p className="text-white/20 text-[11px]">9 farklı alanda profesyonel hizmet</p>
                  <Link
                    href="/hizmetler"
                    onClick={() => setMegaOpen(false)}
                    className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.15em] hover:text-[var(--color-accent-light)] transition-colors"
                  >
                    Tüm Hizmetleri Gör →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0d1220]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl uppercase tracking-[0.3em] text-white/70 hover:text-[var(--color-accent)] transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.button
              onClick={() => { setMobileOpen(false); setShowQuote(true); }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 px-8 py-3 border border-[var(--color-accent)] text-[var(--color-accent)] uppercase tracking-[0.2em] text-sm"
            >
              Teklif Al!
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teklif Al Popup */}
      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowQuote(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-[#111729] border border-[var(--color-border)] p-8 lg:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQuote(false)}
                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-3">
                Teklif Al
              </p>
              <h3
                className="text-2xl lg:text-3xl font-bold mb-6 text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Projenizi Anlatın
              </h3>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Adınız" className="w-full bg-[#0d1220] border border-[var(--color-border)] px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:border-[var(--color-accent)]/40 focus:outline-none transition-colors" />
                  <input type="email" placeholder="E-posta" className="w-full bg-[#0d1220] border border-[var(--color-border)] px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:border-[var(--color-accent)]/40 focus:outline-none transition-colors" />
                </div>
                <input type="tel" placeholder="Telefon" className="w-full bg-[#0d1220] border border-[var(--color-border)] px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:border-[var(--color-accent)]/40 focus:outline-none transition-colors" />
                <select className="w-full bg-[#0d1220] border border-[var(--color-border)] px-4 py-3 text-[14px] text-white/40 focus:border-[var(--color-accent)]/40 focus:outline-none transition-colors appearance-none" defaultValue="">
                  <option value="" disabled>Hizmet Seçin</option>
                  <option value="sosyal">Sosyal Medya Yönetimi</option>
                  <option value="strateji">Dijital Strateji</option>
                  <option value="icerik">İçerik Üretimi</option>
                  <option value="reklam">Reklam Yönetimi</option>
                  <option value="produksiyon">Prodüksiyon</option>
                  <option value="drone">Drone Çekimi</option>
                  <option value="canli">Canlı Yayın</option>
                  <option value="diger">Diğer</option>
                </select>
                <textarea rows={3} placeholder="Projeniz hakkında kısa bilgi..." className="w-full bg-[#0d1220] border border-[var(--color-border)] px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:border-[var(--color-accent)]/40 focus:outline-none transition-colors resize-none" />
                <button type="submit" className="w-full py-3.5 bg-[var(--color-accent)] text-black text-[13px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-light)] transition-all duration-300 flex items-center justify-center gap-2">
                  <Send size={14} />
                  Gönder
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
