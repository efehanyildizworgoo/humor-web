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

- **Görsel yükleme çökmesi giderildi (2026-08-06, canlıda doğrulandı, img `:19`):** Panelde 1 MB'ı aşan her görselde sayfa "This page couldn't load" ile çöküyordu. Kök neden: yükleme bir **Server Action** üzerinden gidiyor ve Next.js'in varsayılan `serverActions.bodySizeLimit` değeri **1 MB** — UI'ın vaat ettiği 10 MB'ın çok altında. Action 413 fırlatıyor, hata Server Components render'ına düşüp tüm admin sayfasını düşürüyordu (sunucu logu: `uncaughtException: Body exceeded 1 MB limit`). Düzeltme: `next.config.ts`'e `bodySizeLimit: "12mb"`; boyut/format kuralları client-safe `src/lib/upload-limits.ts`'e alındı; `UploadZone` + `ImagePicker` gönderimden ÖNCE doğruluyor ve action çağrısı `try/catch` içinde. Canlı ölçüm: 1.36 MB → yükleniyor; 11 MB → sayfa ayakta, Türkçe hata; 375px'te taşma yok.

- **Kırık görsel kaydı temizlendi (2026-08-06):** `mppl5qgm-f8a0adb1-favicon.png` kaydı DB'de vardı ama dosya diskte yoktu (volume eklenmeden önce yüklenmiş, bir deploy'da silinmiş). Silmeden önce içerik tablolarının tamamı (`projects/services/blog_posts/*_gallery/testimonials/site_settings/nav/footer`) tarandı — hiçbir yerde kullanılmıyordu; `uploads` tablosunun yedeği sunucuda `/root/humor-uploads-yedek-2026-08-06.sql`. Sonuç: DB 6 kayıt = diskte 6 dosya, panelde kırık önizleme kalmadı.

## Kalan işler (numaralı)
1. **İçerik (admin panel):** (a) `/hizmetler/seo` metaTitle'da **"Ankar SEO" → "Ankara SEO"** yazım hatası (title/og:title). (b) Ana sayfa meta başlığı sonundaki fazla boşluk (kod `.trim()` ile artık kırpıyor ama içerik de temizlenebilir). Not: OG görseli artık kod default'u (`/og-image.jpg`) ile geliyor; istenirse Marka panelinden özel görsel de yüklenebilir.
2. **Opsiyonel schema iyileştirmeleri:** LocalBusiness `address` düz metin → `PostalAddress` (ideali: panele ayrı adres alanları; hardcode etme, posta kodu doğrula). Ana sayfaya `WebSite` schema (SearchAction EKLEME — site içi arama yok). Detay/kategori sayfalarına `BreadcrumbList`.
4. **Opsiyonel:** `sitemap.ts` lastModified her istekte `new Date()` — gerçek `updatedAt`'ten türet (DB'de updatedAt mevcut). `layout.tsx` keywords meta tüm sayfalarda aynı (Google yok sayar; kaldırılabilir).

## Verilen kararlar ve kurallar
- **Canonical/OpenGraph/Twitter artık `pageSeo()` ile TEK YERDEN üretilir.** Yeni sayfa eklerken generateMetadata içinde `pageSeo({ path, title, description, image? })` kullan; layout'a canonical/OG EKLEME (sığ-birleşme yüzünden ya yanlış miras kalır ya sayfa OG'sini ezer).
- Deploy: humor-web **webhook YOK** → API-deploy (git archive + `appData?detached=1`, humor-cam reçetesi). Deploy canlı veriye/çalışan siteye dokunmaz (sıfır kesinti).
- Sayfa başlığı ayracı: `- Humor` (`| Humor` değil).
- **Server Action ile dosya yükleyen her yerde `serverActions.bodySizeLimit` UI'ın vaat ettiği sınırın ÜSTÜNDE olmalı.** Varsayılan 1 MB'tır ve aşıldığında hata action içinde yakalanamaz — sayfayı komple düşürür. İstemcide de gönderimden önce boyut/format doğrula (`validateUploadFile`), action çağrısını `try/catch`'e al.


## WhatsApp formları — 4 Ekim 2026
- Kullanıcı kararı: iletişim ve Teklif Al formları Samsun Parkeci örneğindeki gibi form bilgilerini WhatsApp mesajına aktarır. Son gönderim WhatsApp içinde kullanıcı tarafından yapılır.
- Form gönderiminde senkron wa.me açılışı, tüm alanları içeren Türkçe mesaj, URL kodlama, alan doğrulaması ve açılış engellenirse görünür yeniden açma bağlantısı eklendi. Mevcut iletişim panel kaydı korunur; form alanları silinmez.
- WhatsApp numarası panel ayarından gelir; mevcut canlı varsayılan 905400065544.
- TypeScript ve DB’siz production build geçti; WhatsApp helper gerçek Chromium DOM üzerinde Türkçe/özel karakter, numara normalizasyonu ve boşluk doğrulamasından geçti.
- Genel tasarım kapısında mevcut tasarımdan gelen bulgular var; öncesiyle karşılaştırılıyor. Bu paket yeniden tasarım içermez.
- Orca çalışma alanı: /Users/efehanyildiz/orca/workspaces/humor-web/humor-whatsapp
- Yayın: hazırlanıyor. Canlı form testleri tamamlanınca bu satır güncellenecek.
