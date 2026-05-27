"use client";

import { useActionState } from "react";
import { updateProjectAction } from "../actions";
import { Field, Input, Textarea, Button, Checkbox } from "../../_components/ui";
import ImagePicker from "../../_components/ImagePicker";
import RichEditor from "../../_components/RichEditor";
import { Save } from "lucide-react";

type Initial = {
  title: string;
  slug: string;
  category: string;
  image: string;
  desc: string;
  client: string;
  year: string;
  challenge: string;
  solution: string;
  published: boolean;
};

export default function EditProjectForm({
  id,
  initial,
}: {
  id: number;
  initial: Initial;
}) {
  const [state, action, pending] = useActionState(
    updateProjectAction.bind(null, id),
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Kategori">
          <Input name="category" defaultValue={initial.category} />
        </Field>
        <Field label="Müşteri">
          <Input name="client" defaultValue={initial.client} />
        </Field>
        <Field label="Yıl">
          <Input name="year" defaultValue={initial.year} />
        </Field>
      </div>

      <Field label="Kapak Görseli">
        <ImagePicker name="image" defaultValue={initial.image} />
      </Field>

      <Field label="Kısa Açıklama" hint="Liste/kart önizlemesi">
        <Textarea name="desc" rows={2} defaultValue={initial.desc} />
      </Field>

      <Field label="Problem / Challenge">
        <RichEditor name="challenge" defaultValue={initial.challenge} placeholder="Karşılaşılan zorluk…" minHeight={180} />
      </Field>

      <Field label="Çözüm / Solution">
        <RichEditor name="solution" defaultValue={initial.solution} placeholder="Sunduğumuz çözüm…" minHeight={180} />
      </Field>

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
