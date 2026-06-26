"use client";

import { useActionState } from "react";
import { updateServiceAction } from "../actions";
import { Field, Input, Textarea, Select, Button, Checkbox } from "../../_components/ui";
import ImagePicker from "../../_components/ImagePicker";
import RichEditor from "../../_components/RichEditor";
import { LUCIDE_ICON_NAMES } from "../iconList";
import { Save } from "lucide-react";

type Initial = {
  title: string;
  menuLabel: string;
  slug: string;
  icon: string;
  shortDesc: string;
  heroImage: string;
  aboutImage: string;
  description: string;
  longDescription: string;
  whyUs: string;
  seoText: string;
  metaTitle: string;
  metaDescription: string;
  bannerText: string;
  published: boolean;
};

export default function EditServiceForm({
  id,
  initial,
}: {
  id: number;
  initial: Initial;
}) {
  const [state, action, pending] = useActionState(
    updateServiceAction.bind(null, id),
    undefined,
  );

  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Başlık" required>
          <Input name="title" required defaultValue={initial.title} />
        </Field>
        <Field label="Slug">
          <Input name="slug" defaultValue={initial.slug} />
        </Field>
      </div>

      <Field label="Menü İsmi" hint="Menüdeki dropdown'da görünen kısa ad — boşsa başlık kullanılır">
        <Input name="menuLabel" defaultValue={initial.menuLabel} placeholder={initial.title} />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="İkon">
          <Select name="icon" defaultValue={initial.icon}>
            {LUCIDE_ICON_NAMES.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
            {!LUCIDE_ICON_NAMES.includes(initial.icon as never) ? (
              <option value={initial.icon}>{initial.icon}</option>
            ) : null}
          </Select>
        </Field>
        <Field label="Kısa Açıklama" hint="Listelerde görünür">
          <Input name="shortDesc" defaultValue={initial.shortDesc} />
        </Field>
        <Field label="Banner Metni" hint="Sayfa üst şeridi">
          <Input name="bannerText" defaultValue={initial.bannerText} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Hero Görseli">
          <ImagePicker name="heroImage" defaultValue={initial.heroImage} />
        </Field>
        <Field label="Hakkında Görseli">
          <ImagePicker name="aboutImage" defaultValue={initial.aboutImage} />
        </Field>
      </div>

      <Field label="Açıklama" hint="Kart/önizleme metni">
        <RichEditor name="description" defaultValue={initial.description} placeholder="Kısa tanıtım…" minHeight={120} />
      </Field>

      <Field label="Uzun Açıklama" hint="Servis sayfasının ana metni">
        <RichEditor name="longDescription" defaultValue={initial.longDescription} placeholder="Servisin detaylı anlatımı…" minHeight={260} />
      </Field>

      <Field label="Neden Biz?">
        <RichEditor name="whyUs" defaultValue={initial.whyUs} placeholder="Bu hizmette neden tercih edilmeliyiz?" minHeight={180} />
      </Field>

      <Field label="SEO Metni" hint="Sayfa altı SEO içeriği">
        <RichEditor name="seoText" defaultValue={initial.seoText} placeholder="SEO için anahtar kelimeleri içeren metin…" minHeight={220} />
      </Field>

      <div className="space-y-4 border-t border-[#2a3158] pt-6">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a86dab]">
            SEO — Meta Etiketleri
          </h2>
          <p className="mt-1 text-xs text-[#8b8fa8]">
            Google sonuçlarında ve tarayıcı sekmesinde görünen başlık ve açıklama. Boş bırakılırsa hizmet başlığı ve açıklaması kullanılır.
          </p>
        </div>
        <Field label="Meta Başlık (title)" hint="~60 karakter — boşsa hizmet başlığı kullanılır">
          <Input name="metaTitle" defaultValue={initial.metaTitle} placeholder={initial.title} />
        </Field>
        <Field label="Meta Açıklama (description)" hint="~155 karakter — boşsa açıklama metninden üretilir">
          <Textarea name="metaDescription" rows={3} defaultValue={initial.metaDescription} placeholder="Arama sonuçlarında görünecek kısa açıklama…" />
        </Field>
      </div>

      <div className="flex items-center justify-between border-t border-[#2a3158] pt-4">
        <Checkbox name="published" defaultChecked={initial.published} label="Sitede yayınla" />

        <div className="flex items-center gap-3">
          {state?.ok ? (
            <span className="text-xs text-emerald-300">Kaydedildi ✓</span>
          ) : null}
          {state?.error ? (
            <span className="text-xs text-red-400">{state.error}</span>
          ) : null}
          <Button type="submit" disabled={pending}>
            <Save className="h-4 w-4" />
            {pending ? "Kaydediliyor…" : "Kaydet"}
          </Button>
        </div>
      </div>
    </form>
  );
}
