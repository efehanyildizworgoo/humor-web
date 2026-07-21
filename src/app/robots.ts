import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const siteUrl = "https://www.humorkreatif.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
