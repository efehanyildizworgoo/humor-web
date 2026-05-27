"use client";

import { useActionState } from "react";
import { createServiceAction } from "../actions";
import { Field, Input, Button, Textarea, Select } from "../../_components/ui";
import { LUCIDE_ICON_NAMES } from "../iconList";

export default function NewServiceForm() {
  const [state, action, pending] = useActionState(createServiceAction, undefined);

  return (
    <form action={action} className="space-y-4">
      <Field label="Başlık" required>
        <Input name="title" required placeholder="Sosyal Medya Yönetimi" />
      </Field>
      <Field label="Slug" hint="Boş bırakırsan başlıktan üretilir">
        <Input name="slug" placeholder="sosyal-medya-yonetimi" />
      </Field>
      <Field label="Kısa Açıklama">
        <Textarea name="shortDesc" rows={2} placeholder="Tek satırlık tanıtım" />
      </Field>
      <Field label="İkon">
        <Select name="icon" defaultValue="Megaphone">
          {LUCIDE_ICON_NAMES.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </Select>
      </Field>

      {state?.error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {state.error}
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Oluşturuluyor…" : "Oluştur ve Düzenle"}
        </Button>
      </div>
    </form>
  );
}
