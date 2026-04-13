"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: "", email: "", phone: "", service: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-44">
      <div className="absolute inset-0 bg-[#0d1220]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-2 space-y-10"
          >
            <p className="text-white/40 text-[15px] leading-relaxed">
              Yeni bir proje mi planlıyorsunuz? Sosyal medya yönetimi, kreatif içerik veya prodüksiyon için fiyat teklifi almak ister misiniz? Bizimle iletişime geçin.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-[var(--color-accent)] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/80 text-sm font-medium">Adres</p>
                  <p className="text-white/40 text-sm mt-1">Beştepe Mah. 31. Sok. 2/B İç Kapı: 104<br />Yenimahalle/ANKARA</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-[var(--color-accent)] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/80 text-sm font-medium">Telefon</p>
                  <a href="tel:+905400065544" className="text-white/40 text-sm mt-1 block hover:text-[var(--color-accent)] transition-colors">0540 006 55 44</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-[var(--color-accent)] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/80 text-sm font-medium">E-posta</p>
                  <a href="mailto:info@humorkreatif.com" className="text-white/40 text-sm mt-1 block hover:text-[var(--color-accent)] transition-colors">info@humorkreatif.com</a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-white/30 text-[11px] uppercase tracking-[0.3em] mb-4">
                Sosyal Medya
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/humorajans" target="_blank" rel="noopener noreferrer" className="w-11 h-11 border border-[var(--color-border)] flex items-center justify-center text-white/40 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[18px] h-[18px]"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
                </a>
                <a href="https://youtube.com/@humorajans" target="_blank" rel="noopener noreferrer" className="w-11 h-11 border border-[var(--color-border)] flex items-center justify-center text-white/40 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-2 block">Ad Soyad</label>
                  <input name="name" value={formState.name} onChange={handleChange} required
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-white/90 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-white/15"
                    placeholder="Adınız Soyadınız" />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-2 block">E-posta</label>
                  <input name="email" type="email" value={formState.email} onChange={handleChange} required
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-white/90 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-white/15"
                    placeholder="ornek@email.com" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-2 block">Telefon</label>
                  <input name="phone" value={formState.phone} onChange={handleChange}
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-white/90 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-white/15"
                    placeholder="+90" />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-2 block">Hizmet</label>
                  <select name="service" value={formState.service} onChange={handleChange}
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-white/90 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors appearance-none cursor-pointer">
                    <option value="" className="bg-black">Seçiniz</option>
                    <option value="sosyal" className="bg-black">Sosyal Medya Yönetimi</option>
                    <option value="strateji" className="bg-black">Dijital Strateji</option>
                    <option value="icerik" className="bg-black">İçerik Üretimi</option>
                    <option value="reklam" className="bg-black">Reklam Yönetimi</option>
                    <option value="produksiyon" className="bg-black">Prodüksiyon</option>
                    <option value="drone" className="bg-black">Drone Çekimi</option>
                    <option value="canli" className="bg-black">Canlı Yayın</option>
                    <option value="diger" className="bg-black">Diğer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-2 block">Mesaj</label>
                <textarea name="message" value={formState.message} onChange={handleChange} rows={4}
                  className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-white/90 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none placeholder:text-white/15"
                  placeholder="Projeniz hakkında kısaca bilgi verin..." />
              </div>

              <div className="pt-4">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[var(--color-accent)] text-sm"
                  >
                    ✓ Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağız.
                  </motion.div>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-10 py-3.5 bg-[var(--color-accent)] text-black text-[13px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-light)] transition-all duration-300"
                  >
                    <Send size={14} />
                    Gönder
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
