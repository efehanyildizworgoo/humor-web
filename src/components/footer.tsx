"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";

type FooterLink = { label: string; href: string };
type FooterSection = { section: string; links: FooterLink[] };

export default function Footer({
  navLinks,
  sections,
  social,
  address,
  logoUrl = "/logo-white.svg",
  siteName = "Humor",
}: {
  navLinks: FooterLink[];
  sections: FooterSection[];
  social: { instagram?: string; youtube?: string; linkedin?: string; twitter?: string };
  address?: string;
  logoUrl?: string;
  siteName?: string;
}) {
  const hasSections = sections.length > 0;

  return (
    <footer className="relative border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className={`grid gap-12 items-start ${hasSections ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          {/* Logo */}
          <div>
            <div className="mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} alt={siteName} className="h-4 w-auto" />
            </div>
            <p className="text-white/30 text-[13px] leading-relaxed max-w-xs">
              Sınır yok. Kalıp yok. Sadece iyi fikir var.
              Strateji, içerik, prodüksiyon. Ankara merkezli kreatif ajans.
            </p>
            <div className="flex gap-3 mt-4">
              {social.instagram ? (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/10 rounded flex items-center justify-center text-white/30 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
                </a>
              ) : null}
              {social.youtube ? (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/10 rounded flex items-center justify-center text-white/30 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              ) : null}
              {social.linkedin ? (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/10 rounded flex items-center justify-center text-white/30 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
                </a>
              ) : null}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/30 mb-5">
              Hızlı Bağlantılar
            </p>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
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

          {/* Dynamic footer sections from DB */}
          {sections.map((sec) => (
            <div key={sec.section}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/30 mb-5">
                {sec.section}
              </p>
              <div className="flex flex-col gap-3">
                {sec.links.map((link) => (
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
          ))}

          {/* Back to top */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <a
              href="#hero"
              className="w-12 h-12 border border-[var(--color-border)] flex items-center justify-center text-white/30 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300"
            >
              <ArrowUp size={18} />
            </a>
            {address ? (
              <p className="text-white/20 text-[12px] text-right whitespace-pre-line">
                Creative agency{"\n"}{address}
              </p>
            ) : null}
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
