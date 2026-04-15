"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Logo */}
          <div>
            <div className="mb-4">
              <img src="/logo-white.svg" alt="Humor" className="h-4 w-auto" />
            </div>
            <p className="text-white/30 text-[13px] leading-relaxed max-w-xs">
              Sınır yok. Kalıp yok. Sadece iyi fikir var.
              Strateji, içerik, prodüksiyon. Ankara merkezli kreatif ajans.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://instagram.com/humorajans" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/10 rounded flex items-center justify-center text-white/30 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://youtube.com/@humorajans" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/10 rounded flex items-center justify-center text-white/30 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/30 mb-5">
              Hızlı Bağlantılar
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Ana Sayfa", href: "/" },
                { label: "Hakkımızda", href: "/hakkimizda" },
                { label: "Hizmetler", href: "/hizmetler" },
                { label: "Portföy", href: "/portfolio" },
                { label: "İletişim", href: "/iletisim" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/40 text-[13px] hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Back to top */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <a
              href="#hero"
              className="w-12 h-12 border border-[var(--color-border)] flex items-center justify-center text-white/30 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300"
            >
              <ArrowUp size={18} />
            </a>
            <p className="text-white/20 text-[12px] text-right">
              Creative agency<br />Ankara, Türkiye
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[12px]">
            © {new Date().getFullYear()} Humor. Tüm hakları saklıdır.
          </p>
          <p className="text-white/15 text-[11px] tracking-wider">
            STRATEJI · İÇERİK · PRODÜKSIYON
          </p>
        </div>
      </div>
    </footer>
  );
}
