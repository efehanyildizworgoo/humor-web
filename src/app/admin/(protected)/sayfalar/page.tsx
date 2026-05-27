import Link from "next/link";
import { ArrowRight, FileEdit } from "lucide-react";
import { PAGES } from "@/lib/pageContent";
import { PageHeader, Card } from "../_components/ui";

export const metadata = { title: "Sayfalar" };

export default function PagesListPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Sayfalar"
        description="Sitedeki sabit metinleri, hero başlıklarını ve görselleri buradan düzenle."
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PAGES.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/sayfalar/${p.slug}`}
            className="group rounded-2xl border border-[#2a3158] bg-[#111729]/60 p-5 transition hover:border-[#6a4696] hover:bg-[#111729]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a2240] text-[#a86dab]">
                <FileEdit className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-[#8b8fa8] transition group-hover:translate-x-1 group-hover:text-white" />
            </div>
            <div className="mt-4 text-lg font-semibold text-white">{p.title}</div>
            <div className="mt-1 text-xs text-[#8b8fa8]">{p.description}</div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[#5a6285]">
              {p.publicHref}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
