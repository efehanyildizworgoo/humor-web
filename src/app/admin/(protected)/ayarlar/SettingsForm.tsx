"use client";

import { useActionState } from "react";
import { updateSettingsAction } from "./actions";
import { Field, Input, Textarea, Button } from "../_components/ui";
import { Save } from "lucide-react";

export default function SettingsForm({
  initial,
}: {
  initial: Record<string, string>;
}) {
  const [state, action, pending] = useActionState(updateSettingsAction, undefined);

  return (
    <form action={action} className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a86dab]">
          İletişim
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="E-posta">
            <Input name="contact.email" type="email" defaultValue={initial["contact.email"]} />
          </Field>
          <Field label="Telefon">
            <Input name="contact.phone" defaultValue={initial["contact.phone"]} />
          </Field>
          <Field label="WhatsApp" hint="Uluslararası format, ör. +905…">
            <Input name="contact.whatsapp" defaultValue={initial["contact.whatsapp"]} />
          </Field>
          <Field label="Adres">
            <Input name="contact.address" defaultValue={initial["contact.address"]} />
          </Field>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a86dab]">
          Sosyal Medya
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Instagram">
            <Input name="social.instagram" type="url" defaultValue={initial["social.instagram"]} placeholder="https://instagram.com/…" />
          </Field>
          <Field label="LinkedIn">
            <Input name="social.linkedin" type="url" defaultValue={initial["social.linkedin"]} />
          </Field>
          <Field label="X / Twitter">
            <Input name="social.twitter" type="url" defaultValue={initial["social.twitter"]} />
          </Field>
          <Field label="YouTube">
            <Input name="social.youtube" type="url" defaultValue={initial["social.youtube"]} />
          </Field>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a86dab]">
          SEO Varsayılanları
        </h2>
        <Field label="Varsayılan Başlık">
          <Input name="seo.default_title" defaultValue={initial["seo.default_title"]} />
        </Field>
        <Field label="Varsayılan Açıklama">
          <Textarea name="seo.default_description" rows={3} defaultValue={initial["seo.default_description"]} />
        </Field>
      </section>

      <div className="flex items-center justify-end gap-3 border-t border-[#2a3158] pt-4">
        {state?.ok ? <span className="text-xs text-emerald-300">Kaydedildi ✓</span> : null}
        {state?.error ? <span className="text-xs text-red-400">{state.error}</span> : null}
        <Button type="submit" disabled={pending}>
          <Save className="h-4 w-4" />
          {pending ? "Kaydediliyor…" : "Kaydet"}
        </Button>
      </div>
    </form>
  );
}
