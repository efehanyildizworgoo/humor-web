"use client";

import { useActionState } from "react";
import { createPostAction } from "../actions";
import { Field, Input, Textarea, Button } from "../../_components/ui";

export default function NewPostForm() {
  const [state, action, pending] = useActionState(createPostAction, undefined);

  return (
    <form action={action} className="space-y-4">
      <Field label="Başlık" required>
        <Input name="title" required placeholder="Sosyal medyada büyümenin 7 yolu" />
      </Field>
      <Field label="Slug" hint="Boş bırakırsan başlıktan üretilir">
        <Input name="slug" placeholder="sosyal-medyada-buyumenin-7-yolu" />
      </Field>
      <Field label="Yazar">
        <Input name="author" placeholder="Humor Ekibi" />
      </Field>
      <Field label="Kısa Özet" hint="Liste önizlemesi (boşsa içerikten üretilir)">
        <Textarea name="excerpt" rows={2} />
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
