"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type TabItem = {
  href: string;
  label: string;
  count?: number;
};

export function Tabs({ items }: { items: TabItem[] }) {
  const pathname = usePathname();
  return (
    <div className="mb-6 flex flex-wrap items-center gap-1 border-b border-[#2a3158]">
      {items.map((t) => {
        const active = pathname === t.href || pathname.startsWith(t.href + "/");
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition ${
              active
                ? "border-[#a86dab] text-white"
                : "border-transparent text-[#8b8fa8] hover:text-white"
            }`}
          >
            <span>{t.label}</span>
            {typeof t.count === "number" ? (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  active ? "bg-[#6a4696]/30 text-[#a86dab]" : "bg-[#1a2240] text-[#8b8fa8]"
                }`}
              >
                {t.count}
              </span>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
