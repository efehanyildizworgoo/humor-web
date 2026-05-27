import "server-only";
import { readSettings } from "@/lib/settings";

export type FieldType = "text" | "textarea" | "rich" | "url" | "image";

export type ContentField = {
  key: string;
  label: string;
  type: FieldType;
  hint?: string;
  default: string;
  /** Where in the admin grid */
  colSpan?: 1 | 2;
};

export type ContentGroup = {
  title: string;
  description?: string;
  fields: ContentField[];
};

export type PageDefinition = {
  slug: string;        // /admin/sayfalar/<slug>
  title: string;       // admin label
  description: string; // admin hint
  publicHref: string;
  groups: ContentGroup[];
};

// =====================================================================
// PAGE DEFINITIONS
// =====================================================================
export const PAGES: PageDefinition[] = [
  // -------------------------- MARKA / GENEL --------------------------
  {
    slug: "marka",
    title: "Marka & Genel",
    description: "Logo, favicon, paylaşım görseli ve site geneli marka kimliği.",
    publicHref: "/",
    groups: [
      {
        title: "Logo & Favicon",
        fields: [
          { key: "brand.site_name", label: "Site adı", type: "text", default: "Humor", hint: "Tarayıcı sekmesi ve OG/Twitter cardlarda" },
          { key: "brand.logo_white", label: "Logo (beyaz / koyu zemin)", type: "image", default: "/logo-white.svg", hint: "Navbar ve footer'da kullanılır", colSpan: 2 },
          { key: "brand.favicon", label: "Favicon", type: "image", default: "/favicon.ico", hint: "Tarayıcı sekme ikonu (.ico / .png — kare, en az 32×32)", colSpan: 2 },
          { key: "brand.apple_icon", label: "Apple Touch Icon", type: "image", default: "", hint: "iOS ana ekran ikonu (180×180 önerilir)", colSpan: 2 },
        ],
      },
      {
        title: "Sosyal Paylaşım (Open Graph / Twitter)",
        fields: [
          { key: "brand.og_image", label: "Paylaşım görseli", type: "image", default: "/og-image.jpg", hint: "1200×630 — link paylaşıldığında WhatsApp/Twitter/LinkedIn'de görünür", colSpan: 2 },
          { key: "brand.og_title", label: "Paylaşım başlığı", type: "text", default: "Humor | Ankara Kreatif Ajans", colSpan: 2 },
          { key: "brand.og_description", label: "Paylaşım açıklaması", type: "textarea", default: "Strateji, içerik, prodüksiyon. Sınır yok, kalıp yok, sadece iyi fikir var.", colSpan: 2 },
        ],
      },
    ],
  },

  // -------------------------- ANASAYFA --------------------------
  {
    slug: "anasayfa",
    title: "Anasayfa",
    description: "Karşılama (Hero), Hakkımızda kısa bloğu, Çağrı bölümü, SEO metni.",
    publicHref: "/",
    groups: [
      {
        title: "Hero (Karşılama)",
        fields: [
          { key: "home.hero.eyebrow", label: "Üst etiket", type: "text", default: "CREATIVE AGENCY / ANKARA" },
          { key: "home.hero.title", label: "Büyük başlık", type: "text", default: "HUMOR", colSpan: 2 },
          { key: "home.hero.subtitle", label: "Alt metin", type: "textarea", default: "Sınır yok. Kalıp yok. Sadece iyi fikir var.\nBiz Humor'uz, ortalığı karıştırıyoruz.", colSpan: 2 },
          { key: "home.hero.cta_primary_label", label: "1. Buton metni", type: "text", default: "Projeni Anlat" },
          { key: "home.hero.cta_primary_href", label: "1. Buton linki", type: "text", default: "/iletisim" },
          { key: "home.hero.cta_secondary_label", label: "2. Buton metni", type: "text", default: "Neler Yaptık?" },
          { key: "home.hero.cta_secondary_href", label: "2. Buton linki", type: "text", default: "/portfolio" },
          { key: "home.hero.scroll_label", label: "Aşağı kaydırma etiketi", type: "text", default: "Keşfet" },
        ],
      },
      {
        title: "Hakkımızda (Kısa blok)",
        fields: [
          { key: "home.about.text", label: "Metin", type: "rich", default: "Uçuk kaçık fikirlerimizi zekâyla harmanlıyor, sınırları zorlayan işlere imza atıyoruz. <strong>\"Çok iyi iş çıkarmışlar!\"</strong> dedirten TV reklamlarına da <strong>\"Kesin viral olur!\"</strong> gözüyle bakılan reelslere de aynı tutkuyla dokunuyoruz.", colSpan: 2 },
          { key: "home.about.link_label", label: "Link metni", type: "text", default: "Bizi Daha Yakından Tanıyın" },
          { key: "home.about.link_href", label: "Link hedefi", type: "text", default: "/hakkimizda" },
        ],
      },
      {
        title: "Hizmetler Bölümü Başlığı",
        description: "Anasayfada gözüken hizmet karuselinin başlığı.",
        fields: [
          { key: "home.services_section.eyebrow", label: "Üst etiket", type: "text", default: "Hizmetlerimiz" },
          { key: "home.services_section.title", label: "Başlık (ilk kelime)", type: "text", default: "Neler" },
          { key: "home.services_section.title_highlight", label: "Vurgulu kelime", type: "text", default: "Yapıyoruz?" },
          { key: "home.services_section.cta_label", label: "Buton metni", type: "text", default: "Tüm Hizmetleri Gör" },
          { key: "home.services_section.cta_href", label: "Buton linki", type: "text", default: "/hizmetler" },
        ],
      },
      {
        title: "Referanslar Bölümü Başlığı",
        description: "Müşteri yorumları bölümünün başlığı (anasayfa + hakkımızda).",
        fields: [
          { key: "home.testimonials_section.eyebrow", label: "Üst etiket", type: "text", default: "Müşteri Yorumları" },
          { key: "home.testimonials_section.title", label: "Başlık (ilk kelime)", type: "text", default: "Neden" },
          { key: "home.testimonials_section.title_highlight", label: "Vurgulu kelime", type: "text", default: "Biz?" },
        ],
      },
      {
        title: "Çağrı Bölümü (CTA)",
        fields: [
          { key: "home.cta.title", label: "Başlık (1. satır)", type: "text", default: "Bir fikrin mi var?" },
          { key: "home.cta.title_highlight", label: "Başlık (2. satır — vurgulu)", type: "text", default: "Hadi ortalığı karıştıralım." },
          { key: "home.cta.subtitle", label: "Alt metin", type: "textarea", default: "Markanızı konuşulan, hissedilen ve iz bırakan bir yere taşıyalım.", colSpan: 2 },
          { key: "home.cta.primary_label", label: "Ana buton metni", type: "text", default: "İletişime Geç" },
          { key: "home.cta.primary_href", label: "Ana buton linki", type: "text", default: "/iletisim" },
          { key: "home.cta.whatsapp_label", label: "WhatsApp buton metni", type: "text", default: "WhatsApp'tan Yaz" },
        ],
      },
      {
        title: "SEO Metni (Sayfa altı)",
        fields: [
          { key: "home.seo_text", label: "SEO içeriği", type: "rich", default: "<strong>Ankara Kreatif Ajans</strong> arayışınızda Humor Creative olarak sosyal medya yönetimi, dijital strateji, içerik üretimi, reklam yönetimi ve prodüksiyon hizmetleri sunuyoruz.", colSpan: 2 },
        ],
      },
    ],
  },

  // -------------------------- HAKKIMIZDA --------------------------
  {
    slug: "hakkimizda",
    title: "Hakkımızda",
    description: "Hakkımızda sayfası hero ve içerik kolonları.",
    publicHref: "/hakkimizda",
    groups: [
      {
        title: "Hero",
        fields: [
          { key: "hakkimizda.hero.eyebrow", label: "Üst etiket", type: "text", default: "Hakkımızda" },
          { key: "hakkimizda.hero.title", label: "Başlık", type: "text", default: "Biz Humor'uz" },
          { key: "hakkimizda.hero.title_highlight", label: "Vurgulu kelime (renkli)", type: "text", default: "Humor", hint: "Başlık içinde bu kelime accent rengiyle gösterilir" },
          { key: "hakkimizda.hero.subtitle", label: "Alt metin", type: "textarea", default: "Sınır yok. Kalıp yok. Sadece iyi fikir var.", colSpan: 2 },
          { key: "hakkimizda.hero.image", label: "Hero arka plan görseli", type: "image", default: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80", colSpan: 2 },
        ],
      },
      {
        title: "Hakkımızda — Sol Kolon",
        fields: [
          { key: "hakkimizda.about.left", label: "Sol metin", type: "rich", default: "<p>Humor çatısı altında, yeni nesil bir kreatif ajansız. Uçuk kaçık fikirlerimizi zekâyla harmanlıyor, sınırları zorlayan işlere imza atıyoruz.</p><p>\"Çok iyi iş çıkarmışlar!\" dedirten TV reklamlarına da, \"Kesin viral olur!\" gözüyle bakılan reelslere de aynı tutkuyla dokunuyoruz. Stratejiden üretime, fikirden yayına kadar her aşamada yanınızdayız.</p><p>Sosyal medya yönetiminden dijital stratejiye, içerik üretiminden prodüksiyona kadar geniş bir yelpazede hizmet veriyoruz. Her projede markanızın DNA'sını anlıyor, onu konuşulan, hissedilen ve iz bırakan bir yere taşıyoruz.</p>", colSpan: 2 },
          { key: "hakkimizda.about.tagline", label: "Alt slogan", type: "text", default: "Sınır Yok. Kalıp Yok. Sadece İyi Fikir Var.", colSpan: 2 },
        ],
      },
      {
        title: "Hakkımızda — Sağ Kolon",
        fields: [
          { key: "hakkimizda.about.right", label: "Sağ metin (çerçeveli kutu)", type: "rich", default: "<p>Markaların hikayesini sadece anlatmakla yetinmiyoruz; onu hedef kitlenin gözlerini alamayacağı, yaşayan bir deneyime dönüştürüyoruz. Her platformda, her formatta, tutarlı, yaratıcı ve etkileyici.</p><p>Dijital dünyada var olmak yetmez; fark edilmek, hatırlanmak ve tercih edilmek gerekir. Biz tam da bunun için varız. Veriye dayalı stratejilerle yaratıcılığı birleştiriyor, ölçülebilir sonuçlar üretiyoruz.</p><p>Ankara merkezli, Türkiye genelinde hizmet veren ekibimizle her projede tek bir amaçla çalışıyoruz: Markanızı bir adım öteye taşımak.</p>", colSpan: 2 },
        ],
      },
    ],
  },

  // -------------------------- HİZMETLER --------------------------
  {
    slug: "hizmetler",
    title: "Hizmetler",
    description: "Hizmetler liste sayfası hero bölümü.",
    publicHref: "/hizmetler",
    groups: [
      {
        title: "Hero",
        fields: [
          { key: "hizmetler.hero.eyebrow", label: "Üst etiket", type: "text", default: "Hizmetlerimiz" },
          { key: "hizmetler.hero.title", label: "Başlık", type: "text", default: "Neler Yapıyoruz?" },
          { key: "hizmetler.hero.title_highlight", label: "Vurgulu kelime", type: "text", default: "Yapıyoruz?" },
          { key: "hizmetler.hero.subtitle", label: "Alt metin", type: "textarea", default: "Stratejiden üretime, fikirden yayına. Markanızı bir adım öteye taşıyoruz.", colSpan: 2 },
          { key: "hizmetler.hero.image", label: "Hero arka plan görseli", type: "image", default: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80", colSpan: 2 },
        ],
      },
      {
        title: "S.S.S. Bölümü Başlığı",
        description: "Hizmetler sayfasının altındaki SSS bloğu başlığı.",
        fields: [
          { key: "hizmetler.faq_section.eyebrow", label: "Üst etiket", type: "text", default: "SSS" },
          { key: "hizmetler.faq_section.title", label: "Başlık (ilk kelime)", type: "text", default: "Sıkça Sorulan" },
          { key: "hizmetler.faq_section.title_highlight", label: "Vurgulu kelime", type: "text", default: "Sorular" },
        ],
      },
      {
        title: "Hizmet Detayı — Hero & CTA Butonları",
        description: "Her hizmetin kendi detay sayfasındaki sabit etiketler.",
        fields: [
          { key: "service_detail.hero.eyebrow", label: "Hero üst etiket", type: "text", default: "Hizmetlerimiz" },
          { key: "service_detail.hero.cta_primary", label: "Birincil buton", type: "text", default: "Detaylı Bilgi" },
          { key: "service_detail.hero.cta_whatsapp", label: "WhatsApp buton", type: "text", default: "WhatsApp" },
        ],
      },
      {
        title: "Hizmet Detayı — Hakkında Bloğu",
        fields: [
          { key: "service_detail.logos.label", label: "Logo şeridi etiketi", type: "text", default: "Güvenilir Markalarla Çalışıyoruz", colSpan: 2 },
          { key: "service_detail.about.title", label: "Başlık (ilk kısım)", type: "text", default: "Markanızı bir adım" },
          { key: "service_detail.about.title_highlight", label: "Vurgulu kelime", type: "text", default: "öne taşıyoruz." },
          { key: "service_detail.about.why_us_label", label: "\"Neden Humor?\" etiketi", type: "text", default: "Neden Humor?" },
          { key: "service_detail.about.cta", label: "Buton metni", type: "text", default: "Detaylı Bilgi" },
          { key: "service_detail.about.stat_value", label: "İstatistik değeri", type: "text", default: "200+" },
          { key: "service_detail.about.stat_label", label: "İstatistik etiketi", type: "text", default: "Mutlu Müşteri" },
        ],
      },
      {
        title: "Hizmet Detayı — Özellikler Bölümü",
        fields: [
          { key: "service_detail.features.eyebrow", label: "Üst etiket", type: "text", default: "Hizmet Kapsamı" },
          { key: "service_detail.features.title", label: "Başlık", type: "text", default: "Bu hizmette neler" },
          { key: "service_detail.features.title_highlight", label: "Vurgulu kelime", type: "text", default: "sunuyoruz?" },
          { key: "service_detail.features.cta", label: "Buton metni", type: "text", default: "Hemen Başlayın" },
        ],
      },
      {
        title: "Hizmet Detayı — Süreç Bölümü",
        fields: [
          { key: "service_detail.process.eyebrow", label: "Üst etiket", type: "text", default: "Süreç" },
          { key: "service_detail.process.title", label: "Başlık", type: "text", default: "Nasıl" },
          { key: "service_detail.process.title_highlight", label: "Vurgulu kelime", type: "text", default: "Çalışıyoruz?" },
        ],
      },
      {
        title: "Hizmet Detayı — Referanslar Bölümü",
        fields: [
          { key: "service_detail.testimonials.eyebrow", label: "Üst etiket", type: "text", default: "Müşteri Yorumları" },
          { key: "service_detail.testimonials.title", label: "Başlık", type: "text", default: "Müşterilerimiz Ne" },
          { key: "service_detail.testimonials.title_highlight", label: "Vurgulu kelime", type: "text", default: "Diyor?" },
        ],
      },
      {
        title: "Hizmet Detayı — SSS Bölümü",
        fields: [
          { key: "service_detail.faq.eyebrow", label: "Üst etiket", type: "text", default: "SSS" },
          { key: "service_detail.faq.title", label: "Başlık", type: "text", default: "Sıkça Sorulan" },
          { key: "service_detail.faq.title_highlight", label: "Vurgulu kelime", type: "text", default: "Sorular" },
          { key: "service_detail.faq.cta", label: "Buton metni", type: "text", default: "Hemen İletişime Geçin" },
        ],
      },
      {
        title: "Hizmet Detayı — Diğer Hizmetler",
        fields: [
          { key: "service_detail.other.eyebrow", label: "Üst etiket", type: "text", default: "Diğer Hizmetlerimiz" },
          { key: "service_detail.other.title", label: "Başlık", type: "text", default: "Daha Fazlasını Keşfedin" },
        ],
      },
      {
        title: "Hizmet Detayı — Alt CTA",
        fields: [
          { key: "service_detail.cta.title_after_service", label: "Servis adından sonraki kısım", type: "text", default: "için", hint: "Örn: \"Sosyal Medya Yönetimi için teklif alın.\"" },
          { key: "service_detail.cta.title_highlight", label: "Vurgulu kelime", type: "text", default: "teklif alın." },
          { key: "service_detail.cta.subtitle", label: "Alt metin", type: "textarea", default: "Projenizi anlatın, size özel bir teklif hazırlayalım.", colSpan: 2 },
          { key: "service_detail.cta.primary", label: "Birincil buton", type: "text", default: "İletişime Geç" },
          { key: "service_detail.cta.whatsapp", label: "WhatsApp buton", type: "text", default: "WhatsApp'tan Yaz" },
        ],
      },
    ],
  },

  // -------------------------- PORTFOLYO --------------------------
  {
    slug: "portfolio",
    title: "Portfolyo",
    description: "Portfolyo liste sayfası hero bölümü.",
    publicHref: "/portfolio",
    groups: [
      {
        title: "Hero",
        fields: [
          { key: "portfolio.hero.eyebrow", label: "Üst etiket", type: "text", default: "Portföy" },
          { key: "portfolio.hero.title", label: "Başlık", type: "text", default: "İşlerimiz" },
          { key: "portfolio.hero.subtitle", label: "Alt metin", type: "textarea", default: "Her projede iz bırakan, konuşulan ve hatırlanan işler.", colSpan: 2 },
          { key: "portfolio.hero.image", label: "Hero arka plan görseli", type: "image", default: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80", colSpan: 2 },
        ],
      },
      {
        title: "Proje Detayı — Etiketler",
        description: "Her proje detay sayfasındaki sabit etiketler.",
        fields: [
          { key: "project_detail.client_label", label: "Müşteri etiketi (hero)", type: "text", default: "Müşteri:" },
          { key: "project_detail.year_label", label: "Yıl etiketi (hero)", type: "text", default: "Yıl:" },
          { key: "project_detail.challenge_label", label: "\"Zorluk\" etiketi", type: "text", default: "Zorluk" },
          { key: "project_detail.solution_label", label: "\"Çözüm\" etiketi", type: "text", default: "Çözüm" },
          { key: "project_detail.services_used_label", label: "\"Kullanılan Hizmetler\" etiketi", type: "text", default: "Kullanılan Hizmetler", colSpan: 2 },
          { key: "project_detail.client_box_label", label: "Yan kutu müşteri etiketi", type: "text", default: "Müşteri" },
          { key: "project_detail.cta_label", label: "Yan kutu buton metni", type: "text", default: "Benzer Proje İçin Teklif Al", colSpan: 2 },
        ],
      },
      {
        title: "Proje Detayı — Sonuçlar Bölümü",
        fields: [
          { key: "project_detail.results.eyebrow", label: "Üst etiket", type: "text", default: "Sonuçlar" },
          { key: "project_detail.results.title", label: "Başlık", type: "text", default: "Elde Edilen" },
          { key: "project_detail.results.title_highlight", label: "Vurgulu kelime", type: "text", default: "Başarılar" },
        ],
      },
      {
        title: "Proje Detayı — Diğer Projeler",
        fields: [
          { key: "project_detail.other.eyebrow", label: "Üst etiket", type: "text", default: "Diğer Projeler" },
          { key: "project_detail.other.title", label: "Başlık", type: "text", default: "Daha Fazlasını Keşfedin" },
        ],
      },
    ],
  },

  // -------------------------- İLETİŞİM --------------------------
  {
    slug: "iletisim",
    title: "İletişim",
    description: "İletişim sayfası hero bölümü.",
    publicHref: "/iletisim",
    groups: [
      {
        title: "Hero",
        fields: [
          { key: "iletisim.hero.eyebrow", label: "Üst etiket", type: "text", default: "İletişim" },
          { key: "iletisim.hero.title", label: "Başlık", type: "text", default: "Projenizi Konuşalım!" },
          { key: "iletisim.hero.title_highlight", label: "Vurgulu kelime", type: "text", default: "Konuşalım!" },
          { key: "iletisim.hero.subtitle", label: "Alt metin", type: "textarea", default: "Yeni bir proje mi planlıyorsunuz? Fiyat teklifi almak için bizimle iletişime geçin.", colSpan: 2 },
          { key: "iletisim.hero.image", label: "Hero arka plan görseli", type: "image", default: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80", colSpan: 2 },
        ],
      },
    ],
  },

  // -------------------------- BLOG --------------------------
  {
    slug: "blog",
    title: "Blog",
    description: "Blog liste sayfası hero bölümü.",
    publicHref: "/blog",
    groups: [
      {
        title: "Hero",
        fields: [
          { key: "blog.hero.eyebrow", label: "Üst etiket", type: "text", default: "Blog" },
          { key: "blog.hero.title", label: "Başlık", type: "text", default: "Düşünceler & Hikayeler" },
          { key: "blog.hero.title_highlight", label: "Vurgulu kelime", type: "text", default: "Hikayeler" },
          { key: "blog.hero.subtitle", label: "Alt metin", type: "textarea", default: "Dijital strateji, içerik üretimi ve prodüksiyon üzerine yazılar.", colSpan: 2 },
          { key: "blog.hero.image", label: "Hero arka plan görseli", type: "image", default: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&q=80", colSpan: 2 },
        ],
      },
    ],
  },
];

// =====================================================================
// HELPERS
// =====================================================================
export function getPageBySlug(slug: string): PageDefinition | null {
  return PAGES.find((p) => p.slug === slug) ?? null;
}

export function allContentKeys(): string[] {
  return PAGES.flatMap((p) => p.groups.flatMap((g) => g.fields.map((f) => f.key)));
}

export function fieldsForPage(slug: string): ContentField[] {
  const page = getPageBySlug(slug);
  if (!page) return [];
  return page.groups.flatMap((g) => g.fields);
}

export function defaultsFor(slug: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of fieldsForPage(slug)) out[f.key] = f.default;
  return out;
}

/** Read page content with fallback to defaults for missing keys. */
export async function getPageContent(slug: string): Promise<Record<string, string>> {
  const fields = fieldsForPage(slug);
  if (fields.length === 0) return {};
  const keys = fields.map((f) => f.key);
  const stored = await readSettings(keys);
  const out: Record<string, string> = {};
  for (const f of fields) {
    const v = stored[f.key];
    out[f.key] = v == null || v === "" ? f.default : String(v);
  }
  return out;
}
