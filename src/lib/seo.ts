import type { Metadata } from "next";

/**
 * Merkezi SEO metadata yardımcısı.
 *
 * Next.js metadata alanları segmentler arasında SIĞ (shallow) birleşir:
 * bir alt sayfa `openGraph`/`alternates` gibi iç içe bir alanı tanımlarsa
 * üst layout'un aynı alanı TAMAMEN ezilir; hiç tanımlamazsa üsttekini miras alır.
 * Bu yüzden canonical ve OpenGraph her sayfada BÜTÜN olarak üretilmeli —
 * aksi halde ya canonical layout'tan (yanlış, ana sayfa) miras alınır ya da
 * OpenGraph.url/image sessizce kaybolur. `pageSeo` bunu tek yerden garantiler.
 */

export const SITE_URL = "https://www.humorkreatif.com";
export const SITE_NAME = "Humor";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

/** Göreli yolu (`/hakkimizda`) sitenin mutlak kanonik URL'sine çevirir. */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") return SITE_URL;
  // Zaten mutlak (ör. Unsplash cover görseli) ise olduğu gibi bırak.
  if (/^https?:\/\//i.test(path)) return path;
  return SITE_URL + (path.startsWith("/") ? path : `/${path}`);
}

type PageSeoInput = {
  /** Bu sayfanın kanonik yolu, kökten göreli: "/", "/hizmetler", "/blog/foo" */
  path: string;
  title?: string;
  description?: string;
  /** OG/twitter görseli (mutlak veya göreli). Verilmezse site geneli görsel. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
};

/**
 * Bir sayfaya self-referencing canonical + eksiksiz OpenGraph/Twitter üretir.
 * Dönen objeyi generateMetadata içinden döndür (gerekirse başka alanlarla yay).
 */
export function pageSeo(input: PageSeoInput): Metadata {
  const { path, image, type = "website", publishedTime, authors } = input;
  const url = absoluteUrl(path);
  const ogImage = image || DEFAULT_OG_IMAGE;
  // Boş/undefined başlık ya da açıklama root layout'un varsayılanına düşsün
  // (aksi halde title:"" → "%s - Humor" template'i " - Humor" üretirdi).
  const title = input.title?.trim() || undefined;
  const description = input.description?.trim() || undefined;

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: url },
    openGraph: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      url,
      siteName: SITE_NAME,
      locale: "tr_TR",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors && authors.length ? { authors } : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title || SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [ogImage],
    },
  };
}
