import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, sql } from "drizzle-orm";
import * as bcrypt from "bcryptjs";
import * as schema from "../src/lib/db/schema";
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
  type LucideIcon,
} from "lucide-react";
import { services as seedServices } from "./_fixtures/services";
import { projects as seedProjects } from "./_fixtures/projects";

const iconNameMap = new Map<LucideIcon, string>([
  [Megaphone, "Megaphone"],
  [Lightbulb, "Lightbulb"],
  [PenTool, "PenTool"],
  [BarChart3, "BarChart3"],
  [Clapperboard, "Clapperboard"],
  [Video, "Video"],
  [Plane, "Plane"],
  [Radio, "Radio"],
  [FileText, "FileText"],
]);

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  console.log("Seeding…");

  // -------- Admin user --------
  const email = process.env.ADMIN_EMAIL || "admin@worgoo.com";
  const password = process.env.ADMIN_PASSWORD || "changeme";
  const existing = await db
    .select()
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.email, email));
  if (existing.length === 0) {
    const passwordHash = await bcrypt.hash(password, 10);
    await db.insert(schema.adminUsers).values({ email, passwordHash });
    console.log(`  + admin user: ${email}`);
  } else {
    console.log(`  = admin user exists: ${email}`);
  }

  // -------- Services --------
  for (let i = 0; i < seedServices.length; i++) {
    const s = seedServices[i];
    const iconName = iconNameMap.get(s.icon) ?? "FileText";

    const exists = await db
      .select({ id: schema.services.id })
      .from(schema.services)
      .where(eq(schema.services.slug, s.slug));

    let serviceId: number;
    if (exists.length > 0) {
      serviceId = exists[0].id;
      console.log(`  = service: ${s.slug}`);
      continue; // idempotent: skip if exists
    } else {
      const [inserted] = await db
        .insert(schema.services)
        .values({
          slug: s.slug,
          icon: iconName,
          title: s.title,
          shortDesc: s.shortDesc,
          heroImage: s.heroImage,
          aboutImage: s.aboutImage,
          description: s.description,
          longDescription: s.longDescription,
          whyUs: s.whyUs,
          seoText: s.seoText,
          bannerText: s.bannerText,
          orderIndex: i,
          published: true,
        })
        .returning({ id: schema.services.id });
      serviceId = inserted.id;
      console.log(`  + service: ${s.slug}`);
    }

    if (s.keywords?.length) {
      await db.insert(schema.serviceKeywords).values(
        s.keywords.map((k, idx) => ({ serviceId, keyword: k, orderIndex: idx })),
      );
    }
    if (s.idealFor?.length) {
      await db.insert(schema.serviceIdealFor).values(
        s.idealFor.map((it, idx) => ({ serviceId, item: it, orderIndex: idx })),
      );
    }
    if (s.features?.length) {
      await db.insert(schema.serviceFeatures).values(
        s.features.map((f, idx) => ({
          serviceId,
          title: f.title,
          text: f.text,
          orderIndex: idx,
        })),
      );
    }
    if (s.process?.length) {
      await db.insert(schema.serviceProcess).values(
        s.process.map((p, idx) => ({
          serviceId,
          step: p.step,
          desc: p.desc,
          orderIndex: idx,
        })),
      );
    }
    if (s.faqs?.length) {
      await db.insert(schema.serviceFaqs).values(
        s.faqs.map((f, idx) => ({
          serviceId,
          q: f.q,
          a: f.a,
          orderIndex: idx,
        })),
      );
    }
    if (s.gallery?.length) {
      await db.insert(schema.serviceGallery).values(
        s.gallery.map((url, idx) => ({ serviceId, imageUrl: url, orderIndex: idx })),
      );
    }
    if (s.testimonials?.length) {
      await db.insert(schema.serviceTestimonials).values(
        s.testimonials.map((t, idx) => ({
          serviceId,
          name: t.name,
          title: t.title,
          text: t.text,
          orderIndex: idx,
        })),
      );
    }
  }

  // -------- Projects --------
  for (let i = 0; i < seedProjects.length; i++) {
    const p = seedProjects[i];
    const exists = await db
      .select({ id: schema.projects.id })
      .from(schema.projects)
      .where(eq(schema.projects.slug, p.slug));

    let projectId: number;
    if (exists.length > 0) {
      console.log(`  = project: ${p.slug}`);
      continue;
    } else {
      const [inserted] = await db
        .insert(schema.projects)
        .values({
          slug: p.slug,
          title: p.title,
          category: p.category,
          image: p.image,
          desc: p.desc,
          client: p.client,
          year: p.year,
          challenge: p.challenge,
          solution: p.solution,
          orderIndex: i,
          published: true,
        })
        .returning({ id: schema.projects.id });
      projectId = inserted.id;
      console.log(`  + project: ${p.slug}`);
    }

    if (p.services?.length) {
      await db.insert(schema.projectServices).values(
        p.services.map((name, idx) => ({ projectId, name, orderIndex: idx })),
      );
    }
    if (p.results?.length) {
      await db.insert(schema.projectResults).values(
        p.results.map((text, idx) => ({ projectId, text, orderIndex: idx })),
      );
    }
    if (p.gallery?.length) {
      await db.insert(schema.projectGallery).values(
        p.gallery.map((url, idx) => ({ projectId, imageUrl: url, orderIndex: idx })),
      );
    }
  }

  // -------- Default nav --------
  const navCount = await db.select({ c: sql<number>`count(*)::int` }).from(schema.navItems);
  if (navCount[0].c === 0) {
    await db.insert(schema.navItems).values([
      { label: "Anasayfa", href: "/", orderIndex: 0 },
      { label: "Hakkımızda", href: "/hakkimizda", orderIndex: 1 },
      { label: "Hizmetler", href: "/hizmetler", orderIndex: 2 },
      { label: "Portfolyo", href: "/portfolio", orderIndex: 3 },
      { label: "Blog", href: "/blog", orderIndex: 4 },
      { label: "İletişim", href: "/iletisim", orderIndex: 5 },
    ]);
    console.log("  + nav items");
  } else {
    // Ensure Blog link exists for existing installs.
    const blogExists = await db
      .select()
      .from(schema.navItems)
      .where(eq(schema.navItems.href, "/blog"));
    if (blogExists.length === 0) {
      const [maxRow] = await db
        .select({ m: sql<number>`coalesce(max(${schema.navItems.orderIndex}), -1) + 1` })
        .from(schema.navItems);
      await db.insert(schema.navItems).values({
        label: "Blog",
        href: "/blog",
        orderIndex: maxRow.m,
      });
      console.log("  + nav: blog");
    }
  }

  // -------- Default blog categories --------
  const catCount = await db.select({ c: sql<number>`count(*)::int` }).from(schema.blogCategories);
  if (catCount[0].c === 0) {
    await db.insert(schema.blogCategories).values([
      { name: "Strateji", slug: "strateji", description: "Dijital pazarlama ve marka stratejisi yazıları.", orderIndex: 0 },
      { name: "Sosyal Medya", slug: "sosyal-medya", description: "Sosyal medya yönetimi ve içerik üretimi.", orderIndex: 1 },
      { name: "Prodüksiyon", slug: "produksiyon", description: "Video, fotoğraf, drone ve prodüksiyon notları.", orderIndex: 2 },
      { name: "Ajans Günlüğü", slug: "ajans-gunlugu", description: "Humor'dan haberler ve kulis.", orderIndex: 3 },
    ]);
    console.log("  + blog categories");
  }

  // -------- Default blog tags --------
  const tagCount = await db.select({ c: sql<number>`count(*)::int` }).from(schema.blogTags);
  if (tagCount[0].c === 0) {
    await db.insert(schema.blogTags).values([
      { name: "Instagram", slug: "instagram", orderIndex: 0 },
      { name: "TikTok", slug: "tiktok", orderIndex: 1 },
      { name: "Reels", slug: "reels", orderIndex: 2 },
      { name: "Meta Ads", slug: "meta-ads", orderIndex: 3 },
      { name: "Google Ads", slug: "google-ads", orderIndex: 4 },
      { name: "Marka Kimliği", slug: "marka-kimligi", orderIndex: 5 },
      { name: "Video", slug: "video", orderIndex: 6 },
      { name: "Drone", slug: "drone", orderIndex: 7 },
    ]);
    console.log("  + blog tags");
  }

  // -------- Default testimonials --------
  const testimonialsCount = await db.select({ c: sql<number>`count(*)::int` }).from(schema.testimonials);
  if (testimonialsCount[0].c === 0) {
    await db.insert(schema.testimonials).values([
      { name: "Mehmet Yılmaz", title: "Pazarlama Direktörü, TechVista", text: "Humor Creative ekibiyle çalışmak inanılmaz bir deneyimdi. Sosyal medya stratejimiz tamamen değişti ve etkileşim oranlarımız üç katına çıktı.", orderIndex: 0 },
      { name: "Ayşe Kara", title: "Kurucu, Bloom Cosmetics", text: "İçerik üretiminde gerçekten fark yarattılar. Her paylaşım markanın ruhunu yansıtıyor. Kesinlikle doğru ajansı seçtik.", orderIndex: 1 },
      { name: "Can Demir", title: "Etkinlik Müdürü, SoundWave", text: "Festival canlı yayınımızı ve aftermovie'mizi Humor Creative yaptı. Hem teknik hem kreatif olarak beklentilerimizin çok üzerindeydi.", orderIndex: 2 },
      { name: "Elif Başaran", title: "Marka Müdürü, GreenPeak", text: "Lansman kampanyamızı sıfırdan tasarladılar. Strateji, içerik, reklam yönetimi, her şey tek elden ve kusursuzdu.", orderIndex: 3 },
      { name: "Burak Özkan", title: "CEO, Arkitekt Studio", text: "Drone çekimleri ve kurumsal tanıtım filmimiz muhteşem oldu. Projelerimizi müşterilere sunarken büyük avantaj sağlıyor.", orderIndex: 4 },
      { name: "Selin Aydın", title: "İletişim Uzmanı, NovaTech", text: "Reels serimiz viral oldu, 2 milyonun üzerinde organik görüntülenme aldık. Humor Creative gerçekten işini biliyor.", orderIndex: 5 },
    ]);
    console.log("  + testimonials");
  }

  // -------- Default FAQs --------
  const faqsCount = await db.select({ c: sql<number>`count(*)::int` }).from(schema.faqs);
  if (faqsCount[0].c === 0) {
    await db.insert(schema.faqs).values([
      { q: "Hangi hizmetleri sunuyorsunuz?", a: "Sosyal medya yönetimi, dijital strateji, içerik üretimi, reklam yönetimi (Meta & Google Ads), prodüksiyon, video kurgulama, drone çekimi, canlı yayın ve senaryo yazımı hizmetleri sunuyoruz.", orderIndex: 0 },
      { q: "Süreç nasıl işliyor?", a: "İlk olarak markanızı ve hedeflerinizi anlatan bir keşif toplantısı yapıyoruz. Ardından stratejik brief hazırlıyor, kreatif konseptleri sunuyor ve onay sonrası üretime geçiyoruz. Her aşamada şeffaf iletişim ve revizyon imkânı sağlıyoruz.", orderIndex: 1 },
      { q: "Fiyatlandırma nasıl yapılıyor?", a: "Her proje kendine özgü olduğu için paket bazlı ve proje bazlı fiyatlandırma seçeneklerimiz var. Aylık sosyal medya yönetimi, tek seferlik prodüksiyon projeleri veya entegre kampanyalar için size özel teklif hazırlıyoruz.", orderIndex: 2 },
      { q: "Sadece Ankara'da mı hizmet veriyorsunuz?", a: "Merkezimiz Ankara'da olmakla birlikte Türkiye genelinde ve yurt dışında hizmet veriyoruz. Dijital hizmetlerimiz lokasyon bağımsız, prodüksiyon hizmetlerimiz için ekibimizle projenizin olduğu yere geliyoruz.", orderIndex: 3 },
      { q: "Minimum proje süresi var mı?", a: "Sosyal medya yönetimi için minimum 3 aylık anlaşma öneriyoruz çünkü dijital stratejilerin sonuç vermesi zaman alır. Prodüksiyon ve tek seferlik projeler için süre sınırı yoktur.", orderIndex: 4 },
      { q: "Raporlama yapıyor musunuz?", a: "Evet, aylık detaylı performans raporları sunuyoruz. Etkileşim oranları, erişim, büyüme metrikleri ve reklam performansı gibi tüm KPI'ları şeffaf şekilde paylaşıyoruz.", orderIndex: 5 },
    ]);
    console.log("  + faqs");
  }

  // -------- Default stats --------
  const statsCount = await db.select({ c: sql<number>`count(*)::int` }).from(schema.stats);
  if (statsCount[0].c === 0) {
    await db.insert(schema.stats).values([
      { value: "80+", label: "Mutlu Marka", orderIndex: 0 },
      { value: "100M+", label: "Toplam Görüntüleme", orderIndex: 1 },
      { value: "300+", label: "Tamamlanan Proje", orderIndex: 2 },
    ]);
    console.log("  + stats");
  }

  // -------- Default site settings --------
  const settings: Array<{ key: string; value: unknown }> = [
    { key: "contact.email", value: "info@humorkreatif.com" },
    { key: "contact.phone", value: "+90 540 006 55 44" },
    { key: "contact.whatsapp", value: "+905400065544" },
    { key: "contact.address", value: "Beştepe Mah. 31. Sok. 2/B İç Kapı: 104\nYenimahalle/ANKARA" },
    { key: "social.instagram", value: "https://instagram.com/humorajans" },
    { key: "social.linkedin", value: "" },
    { key: "social.twitter", value: "" },
    { key: "social.youtube", value: "https://youtube.com/@humorajans" },
    { key: "seo.default_title", value: "Humor | Ankara Kreatif Ajans" },
    { key: "seo.default_description", value: "Sosyal medya yönetimi, dijital strateji, içerik üretimi, prodüksiyon ve daha fazlası." },
  ];
  for (const s of settings) {
    await db
      .insert(schema.siteSettings)
      .values({ key: s.key, value: s.value as object })
      .onConflictDoNothing();
  }
  console.log("  + site settings (idempotent)");

  await pool.end();
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
