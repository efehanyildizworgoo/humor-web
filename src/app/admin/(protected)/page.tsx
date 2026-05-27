import Link from "next/link";
import { db } from "@/lib/db";
import {
  services,
  projects,
  contactMessages,
  testimonials,
  faqs,
} from "@/lib/db/schema";
import { count, eq, desc } from "drizzle-orm";
import { Briefcase, FolderKanban, Inbox, MessageSquareQuote, ArrowRight } from "lucide-react";

export const metadata = { title: "Panel" };

async function getStats() {
  const [
    [svc],
    [proj],
    [msgs],
    [unread],
    [tests],
    [f],
  ] = await Promise.all([
    db.select({ c: count() }).from(services),
    db.select({ c: count() }).from(projects),
    db.select({ c: count() }).from(contactMessages),
    db.select({ c: count() }).from(contactMessages).where(eq(contactMessages.read, false)),
    db.select({ c: count() }).from(testimonials),
    db.select({ c: count() }).from(faqs),
  ]);
  return {
    services: svc.c,
    projects: proj.c,
    messages: msgs.c,
    unread: unread.c,
    testimonials: tests.c,
    faqs: f.c,
  };
}

async function getRecentMessages() {
  return db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt))
    .limit(5);
}

export default async function AdminDashboard() {
  const [stats, recent] = await Promise.all([getStats(), getRecentMessages()]);

  const cards = [
    { label: "Hizmetler", value: stats.services, href: "/admin/hizmetler", icon: Briefcase },
    { label: "Projeler", value: stats.projects, href: "/admin/portfolio", icon: FolderKanban },
    {
      label: "Mesajlar",
      value: stats.messages,
      sub: stats.unread > 0 ? `${stats.unread} okunmamış` : "tamamı okundu",
      href: "/admin/mesajlar",
      icon: Inbox,
      highlight: stats.unread > 0,
    },
    { label: "Referanslar", value: stats.testimonials, href: "/admin/referanslar", icon: MessageSquareQuote },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <div className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-[#a86dab]">
          Yönetim
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Panel</h1>
        <p className="mt-1 text-sm text-[#8b8fa8]">
          Sitenin tüm içeriğini buradan yönetebilirsin.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="group rounded-2xl border border-[#2a3158] bg-[#111729]/60 p-5 transition hover:border-[#6a4696] hover:bg-[#111729]"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    c.highlight
                      ? "bg-gradient-to-br from-[#6a4696] to-[#a86dab] text-white"
                      : "bg-[#1a2240] text-[#a86dab]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-[#8b8fa8] transition group-hover:translate-x-1 group-hover:text-white" />
              </div>
              <div className="mt-4 text-3xl font-bold text-white">{c.value}</div>
              <div className="mt-1 text-sm text-[#8b8fa8]">{c.label}</div>
              {c.sub ? (
                <div className={`mt-2 text-xs ${c.highlight ? "text-[#faea92]" : "text-[#8b8fa8]"}`}>
                  {c.sub}
                </div>
              ) : null}
            </Link>
          );
        })}
      </div>

      <div className="rounded-2xl border border-[#2a3158] bg-[#111729]/60 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Son Mesajlar</h2>
          <Link
            href="/admin/mesajlar"
            className="text-xs text-[#a86dab] hover:text-white"
          >
            Tümü →
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#2a3158] py-10 text-center text-sm text-[#8b8fa8]">
            Henüz mesaj yok.
          </div>
        ) : (
          <ul className="divide-y divide-[#2a3158]">
            {recent.map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{m.name}</span>
                    {!m.read ? (
                      <span className="rounded-full bg-[#6a4696]/20 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#a86dab]">
                        Yeni
                      </span>
                    ) : null}
                  </div>
                  <div className="truncate text-sm text-[#8b8fa8]">{m.message}</div>
                </div>
                <div className="text-xs text-[#8b8fa8]">
                  {new Date(m.createdAt).toLocaleDateString("tr-TR")}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
