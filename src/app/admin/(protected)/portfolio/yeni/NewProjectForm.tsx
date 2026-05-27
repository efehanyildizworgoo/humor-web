"use client";

import { useActionState } from "react";
import { createProjectAction } from "../actions";
import { Field, Input, Button } from "../../_components/ui";

export default function NewProjectForm() {
  const [state, action, pending] = useActionState(createProjectAction, undefined);

  return (
    <form action={action} className="space-y-4">
      <Field label="Başlık" required>
        <Input name="title" required placeholder="GreenPeak Marka Lansmanı" />
      </Field>
      <Field label="Slug" hint="Boş bırakırsan başlıktan üretilir">
        <Input name="slug" placeholder="greenpeak-marka-lansmani" />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Kategori">
          <Input name="category" placeholder="Dijital Strateji" />
        </Field>
        <Field label="Müşteri">
          <Input name="client" placeholder="GreenPeak" />
        </Field>
        <Field label="Yıl">
          <Input name="year" placeholder="2024" />
        </Field>
      </div>

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
