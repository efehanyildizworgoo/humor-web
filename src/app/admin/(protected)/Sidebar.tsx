"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  MessageSquareQuote,
  HelpCircle,
  BarChart3,
  Inbox,
  Menu as MenuIcon,
  Settings,
  Image as ImageIcon,
  LogOut,
  Newspaper,
  FileEdit,
  UserCog,
} from "lucide-react";
import { logoutAction } from "./actions";

const nav: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard },
  { href: "/admin/sayfalar", label: "Sayfalar", icon: FileEdit },
  { href: "/admin/hizmetler", label: "Hizmetler", icon: Briefcase },
  { href: "/admin/portfolio", label: "Portfolyo", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/referanslar", label: "Referanslar", icon: MessageSquareQuote },
  { href: "/admin/sss", label: "S.S.S.", icon: HelpCircle },
  { href: "/admin/istatistikler", label: "İstatistikler", icon: BarChart3 },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: Inbox },
  { href: "/admin/menu", label: "Menü", icon: MenuIcon },
  { href: "/admin/gorseller", label: "Görseller", icon: ImageIcon },
  { href: "/admin/ayarlar", label: "Ayarlar", icon: Settings },
  { href: "/admin/hesap", label: "Hesap", icon: UserCog },
];

export default function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-60 flex-col border-r border-[#2a3158] bg-[#0d1220]">
      <div className="flex h-16 items-center gap-2 border-b border-[#2a3158] px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6a4696] to-[#a86dab] text-sm font-black text-white">
          H
        </div>
        <div>
          <div className="text-sm font-bold text-white">Humor</div>
          <div className="text-[10px] uppercase tracking-wider text-[#8b8fa8]">Yönetim</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {nav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-[#6a4696]/20 text-white"
                  : "text-[#8b8fa8] hover:bg-[#111729] hover:text-white"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-[#a86dab]" : ""}`} />
              <span>{item.label}</span>
              {active ? (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#a86dab]" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      <form action={logoutAction} className="border-t border-[#2a3158] p-3">
        <div className="mb-2 truncate px-2 text-xs text-[#8b8fa8]" title={email}>
          {email}
        </div>
        <button
          type="submit"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#8b8fa8] transition hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
          Çıkış Yap
        </button>
      </form>
    </aside>
  );
}
