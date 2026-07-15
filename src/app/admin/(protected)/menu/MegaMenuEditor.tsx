"use client";

import { useState, useTransition } from "react";
import { Save } from "lucide-react";
import { Icon } from "@/lib/icons";
import { updateMegaLabelAction } from "./actions";

export type MegaItem = {
  id: number;
  title: string;
  menuLabel: string;
  icon: string;
  slug: string;
  published: boolean;
};

/**
 * MegaMenuEditor — "Hizmetler" dropdown'unda görünen menü isimlerini (menu_label)
 * tek yerden düzenler. Hizmetlerin kendisini eklemez/silmez; sadece görünen adı
 * değiştirir. Boş bırakılırsa sitede hizmet başlığı kullanılır.
 */
export default function MegaMenuEditor({ items }: { items: MegaItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#2a3158] py-8 text-center text-sm text-[#8b8fa8]">
        Henüz hizmet eklenmemiş. Mega menü isimleri hizmetlerden gelir.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((it) => (
        <MegaRow key={it.id} item={it} />
      ))}
    </div>
  );
}

function MegaRow({ item }: { item: MegaItem }) {
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  return (
    <form
      action={(formData) => {
        setSaved(false);
        start(async () => {
          await updateMegaLabelAction(item.id, formData);
          setSaved(true);
        });
      }}
      className="rounded-xl border border-[#2a3158] bg-[#0d1220]/60 p-3"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6a4696]/15">
            <Icon name={item.icon} size={15} className="text-[#a86dab]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-xs font-medium text-[#e8e9f0]">{item.title}</span>
              {!item.published ? (
                <span className="shrink-0 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-amber-300">
                  Yayında değil
                </span>
              ) : null}
            </div>
            <span className="text-[10px] text-[#5a6285]">/hizmetler/{item.slug}</span>
          </div>
        </div>

        <div className="w-full sm:max-w-xs">
          <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[#8b8fa8]">
            Menü İsmi
          </label>
          <input
            name="menuLabel"
            defaultValue={item.menuLabel}
            placeholder={item.title}
            onChange={() => setSaved(false)}
            className="w-full rounded-lg border border-[#2a3158] bg-[#0d1220] px-3 py-2 text-sm text-[#e8e9f0] outline-none transition placeholder:text-[#5a6285] focus:border-[#6a4696] focus:ring-2 focus:ring-[#6a4696]/30"
          />
        </div>

        <div className="flex items-center gap-2 sm:pb-0.5">
          {saved && !pending ? (
            <span className="text-xs text-emerald-300">Kaydedildi ✓</span>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#6a4696] to-[#a86dab] px-3 py-1.5 text-xs font-semibold text-white hover:from-[#7463a9] disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            {pending ? "Kaydediliyor…" : "Kaydet"}
          </button>
        </div>
      </div>
    </form>
  );
}
