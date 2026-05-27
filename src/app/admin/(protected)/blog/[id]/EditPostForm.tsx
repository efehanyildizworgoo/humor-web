"use client";

import { useActionState, useState } from "react";
import { updatePostAction } from "../actions";
import { Field, Input, Textarea, Select, Button, Checkbox } from "../../_components/ui";
import ImagePicker from "../../_components/ImagePicker";
import RichEditor from "../../_components/RichEditor";
import { Save } from "lucide-react";

type Initial = {
  title: string;
  slug: string;
  author: string;
  excerpt: string;
  coverImage: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  categoryId: number | null;
  published: boolean;
  selectedTagIds: number[];
};

export default function EditPostForm({
  id,
  initial,
  categories,
  tags,
}: {
  id: number;
  initial: Initial;
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
}) {
  const [state, action, pending] = useActionState(
    updatePostAction.bind(null, id),
    undefined,
  );

  const [selectedTags, setSelectedTags] = useState<Set<number>>(
    new Set(initial.selectedTagIds),
  );
  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tagId)) next.delete(tagId);
      else next.add(tagId);
      return next;
    });
  };

  return (
    <form action={action} className="space-y-5">
      {/* hidden: selected tag ids */}
      {Array.from(selectedTags).map((t) => (
        <input key={t} type="hidden" name="tagIds" value={t} />
      ))}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Başlık" required>
          <Input name="title" required defaultValue={initial.title} />
        </Field>
        <Field label="Slug">
          <Input name="slug" defaultValue={initial.slug} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Yazar">
          <Input name="author" defaultValue={initial.author} placeholder="Humor Ekibi" />
        </Field>
        <Field label="Kategori">
          <Select name="categoryId" defaultValue={initial.categoryId ?? ""}>
            <option value="">— Kategorisiz —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Kapak Görseli">
        <ImagePicker name="coverImage" defaultValue={initial.coverImage} />
      </Field>

      <Field label="Kısa Özet" hint="Liste önizlemesi (boşsa içerikten üretilir)">
        <Textarea name="excerpt" rows={2} defaultValue={initial.excerpt} />
      </Field>

      <Field label="İçerik" hint="Zengin metin: başlık, link, görsel, liste…">
        <RichEditor
          name="content"
          defaultValue={initial.content}
          placeholder="Yazını burada oluştur…"
          minHeight={400}
        />
      </Field>

      <Field label="Etiketler" hint="Birden fazla seçilebilir">
        {tags.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#2a3158] px-3 py-3 text-xs text-[#8b8fa8]">
            Henüz etiket eklenmemiş. <a href="/admin/blog/etiketler" className="text-[#a86dab] hover:underline">Etiketler sayfası</a>nda oluştur.
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => {
              const active = selectedTags.has(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggleTag(t.id)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    active
                      ? "border-[#6a4696] bg-[#6a4696]/20 text-white"
                      : "border-[#2a3158] bg-[#111729] text-[#8b8fa8] hover:text-white"
                  }`}
                >
                  {active ? "✓ " : ""}{t.name}
                </button>
              );
            })}
          </div>
        )}
      </Field>

      <details className="rounded-lg border border-[#2a3158] bg-[#0d1220]/60">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-white hover:bg-[#1a2240]/50">
          SEO Ayarları
        </summary>
        <div className="space-y-4 border-t border-[#2a3158] px-4 py-4">
          <Field label="SEO Başlığı" hint="Boşsa yazı başlığı kullanılır">
            <Input name="seoTitle" defaultValue={initial.seoTitle} />
          </Field>
          <Field label="SEO Açıklaması" hint="160 karakter civarı önerilir">
            <Textarea name="seoDescription" rows={2} defaultValue={initial.seoDescription} />
          </Field>
        </div>
      </details>

      <div className="flex items-center justify-between border-t border-[#2a3158] pt-4">
        <Checkbox name="published" defaultChecked={initial.published} label="Sitede yayınla" />
        <div className="flex items-center gap-3">
          {state?.ok ? <span className="text-xs text-emerald-300">Kaydedildi ✓</span> : null}
          {state?.error ? <span className="text-xs text-red-400">{state.error}</span> : null}
          <Button type="submit" disabled={pending}>
            <Save className="h-4 w-4" />
            {pending ? "Kaydediliyor…" : "Kaydet"}
          </Button>
        </div>
      </div>
    </form>
  );
}
