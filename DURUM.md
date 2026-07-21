# humor-web (humorkreatif.com) — DURUM

## Yapılanlar
- **Teknik SEO denetimi** (25 alt-agent, 20 doğrulanmış bulgu) + canonical düzeltmesi (commit `52f2836`).
- **Kök sorun çözüldü:** `(site)/layout.tsx` sabit ana-sayfa canonical'ı veriyordu; Next.js metadata sığ-birleşme kuralı gereği tüm alt sayfalar (hizmet/portföy/blog/iletişim) canonical olarak ANA SAYFAYI gösteriyordu → alt sayfalar Google'da indekslenmiyordu.
- **Merkezi `src/lib/seo.ts` → `pageSeo()`**: her sayfaya self-referencing canonical + eksiksiz OpenGraph + Twitter. Tüm (site) statik + dinamik `[slug]` sayfaları buna geçirildi.
- Aynı düzeltme şunları da kapattı: og:url self-reference (detaylarda ana sayfayı gösteriyordu), tüm sayfalarda eksik og:image/og:url/og:type, jenerik Twitter card, ana sayfa `<title>` çift boşluğu (`.trim()`), sitemap↔canonical çelişkisi (26 URL).
- `blog/[slug]` BlogPosting JSON-LD: image + publisher.logo mutlaklaştırıldı, mainEntityOfPage eklendi.
- `robots.ts`: emekli olmuş (Yandex) `Host` direktifi kaldırıldı.
- **Redirect zinciri düzeltildi (CapRover nginx):** `humor-web` `customNginxConfig`'e özel EJS template kondu — apex/http/www **hepsi tek `301` → `https://www.humorkreatif.com`**, HTTPS→HTTP downgrade giderildi, **HSTS** (`max-age=31536000`) eklendi. ACME challenge path korundu (SSL yenileme sağlam), gerçek içerik+canonical 200. Yedek: `/tmp/humor-web-appdef-backup.json`; rollback = `customNginxConfig` boşalt. Template: `scratchpad/humor-web-nginx.ejs`.
- **OG paylaşım görseli üretildi:** marka logolu 1200×630 `public/og-image.jpg` (koyu tema + "humor." logosu + "Kreatif Ajans · Prodüksiyon" + mor accent). Higgsfield limiti dolu olduğu için ImageMagick ile SVG→JPG üretildi (kaynak `scratchpad/humor-og.svg`).

## Kalan işler (numaralı)
1. **İçerik (admin panel):** (a) `/hizmetler/seo` metaTitle'da **"Ankar SEO" → "Ankara SEO"** yazım hatası (title/og:title). (b) Ana sayfa meta başlığı sonundaki fazla boşluk (kod `.trim()` ile artık kırpıyor ama içerik de temizlenebilir). Not: OG görseli artık kod default'u (`/og-image.jpg`) ile geliyor; istenirse Marka panelinden özel görsel de yüklenebilir.
2. **Opsiyonel schema iyileştirmeleri:** LocalBusiness `address` düz metin → `PostalAddress` (ideali: panele ayrı adres alanları; hardcode etme, posta kodu doğrula). Ana sayfaya `WebSite` schema (SearchAction EKLEME — site içi arama yok). Detay/kategori sayfalarına `BreadcrumbList`.
4. **Opsiyonel:** `sitemap.ts` lastModified her istekte `new Date()` — gerçek `updatedAt`'ten türet (DB'de updatedAt mevcut). `layout.tsx` keywords meta tüm sayfalarda aynı (Google yok sayar; kaldırılabilir).

## Verilen kararlar ve kurallar
- **Canonical/OpenGraph/Twitter artık `pageSeo()` ile TEK YERDEN üretilir.** Yeni sayfa eklerken generateMetadata içinde `pageSeo({ path, title, description, image? })` kullan; layout'a canonical/OG EKLEME (sığ-birleşme yüzünden ya yanlış miras kalır ya sayfa OG'sini ezer).
- Deploy: humor-web **webhook YOK** → API-deploy (git archive + `appData?detached=1`, humor-cam reçetesi). Deploy canlı veriye/çalışan siteye dokunmaz (sıfır kesinti).
- Sayfa başlığı ayracı: `- Humor` (`| Humor` değil).
