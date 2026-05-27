"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import { savePageAction } from "../actions";
import { Field, Input, Textarea, Button } from "../../_components/ui";
import ImagePicker from "../../_components/ImagePicker";
import RichEditor from "../../_components/RichEditor";
import type { PageDefinition } from "@/lib/pageContent";

export default function PageContentForm({
  slug,
  page,
  values,
}: {
  slug: string;
  page: PageDefinition;
  values: Record<string, string>;
}) {
  const [state, action, pending] = useActionState(
    savePageAction.bind(null, slug),
    undefined,
  );

  return (
    <form action={action} className="space-y-8">
      {page.groups.map((group, gi) => (
        <section
          key={gi}
          className={`space-y-4 ${gi > 0 ? "border-t border-[#2a3158] pt-6" : ""}`}
        >
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a86dab]">
              {group.title}
            </h2>
            {group.description ? (
              <p className="mt-1 text-xs text-[#8b8fa8]">{group.description}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {group.fields.map((field) => {
              const value = values[field.key] ?? "";
              const span = field.colSpan === 2 ? "sm:col-span-2" : "";
              return (
                <div key={field.key} className={span}>
                  <Field label={field.label} hint={field.hint}>
                    {field.type === "rich" ? (
                      <RichEditor
                        name={field.key}
                        defaultValue={value}
                        placeholder={field.hint ?? ""}
                        minHeight={180}
                      />
                    ) : field.type === "image" ? (
                      <ImagePicker name={field.key} defaultValue={value} />
                    ) : field.type === "textarea" ? (
                      <Textarea name={field.key} rows={3} defaultValue={value} />
                    ) : (
                      <Input
                        name={field.key}
                        type={field.type === "url" ? "url" : "text"}
                        defaultValue={value}
                      />
                    )}
                  </Field>
                </div>
              );
            })}
          </div>
        </section>
      ))}

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
