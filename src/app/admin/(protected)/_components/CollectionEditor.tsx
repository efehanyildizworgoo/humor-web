"use client";

import { useState, useTransition } from "react";
import { ArrowUp, ArrowDown, Trash2, Plus, Save } from "lucide-react";
import ImagePicker from "./ImagePicker";

export type CollectionField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "url" | "image";
  rows?: number;
  placeholder?: string;
  required?: boolean;
  colSpan?: 1 | 2; // grid col span
};

export type CollectionItem = {
  id?: number;
  [key: string]: string | number | undefined;
};

export type CollectionActions = {
  add: (data: FormData) => Promise<{ error?: string } | void>;
  update: (id: number, data: FormData) => Promise<{ error?: string } | void>;
  remove: (id: number) => Promise<void>;
  move: (id: number, direction: "up" | "down") => Promise<void>;
};

/**
 * CollectionEditor — generic CRUD for child collections (features, faqs, etc.)
 * Each row is editable inline; "+" appends a new row with the same fields.
 * Server actions handle persistence; local state is only for the "add new" row.
 */
export default function CollectionEditor({
  title,
  emptyText,
  fields,
  items,
  actions,
  addButtonLabel = "Yeni Ekle",
}: {
  title?: string;
  emptyText?: string;
  fields: CollectionField[];
  items: CollectionItem[];
  actions: CollectionActions;
  addButtonLabel?: string;
}) {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="space-y-3">
      {title ? (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a86dab]">
            {title}
          </h3>
          {!addOpen ? (
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#2a3158] bg-[#111729] px-3 py-1.5 text-xs font-medium text-white hover:border-[#6a4696]"
            >
              <Plus className="h-3.5 w-3.5" />
              {addButtonLabel}
            </button>
          ) : null}
        </div>
      ) : null}

      {items.length === 0 && !addOpen ? (
        <div className="rounded-xl border border-dashed border-[#2a3158] py-8 text-center text-sm text-[#8b8fa8]">
          {emptyText ?? "Henüz kayıt yok."}
        </div>
      ) : null}

      {items.map((item, idx) => (
        <RowEditor
          key={item.id}
          item={item}
          fields={fields}
          actions={actions}
          isFirst={idx === 0}
          isLast={idx === items.length - 1}
        />
      ))}

      {addOpen ? (
        <NewRowForm
          fields={fields}
          onSubmit={async (formData) => {
            const res = await actions.add(formData);
            if (!res?.error) setAddOpen(false);
            return res ?? undefined;
          }}
          onCancel={() => setAddOpen(false)}
        />
      ) : !title ? (
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[#2a3158] px-3 py-2 text-xs font-medium text-[#8b8fa8] transition hover:border-[#6a4696] hover:text-white"
        >
          <Plus className="h-3.5 w-3.5" />
          {addButtonLabel}
        </button>
      ) : null}
    </div>
  );
}

function FieldRow({
  field,
  defaultValue,
  autoFocus,
}: {
  field: CollectionField;
  defaultValue?: string | number;
  autoFocus?: boolean;
}) {
  const cls =
    "w-full rounded-lg border border-[#2a3158] bg-[#0d1220] px-3 py-2 text-sm text-[#e8e9f0] outline-none transition placeholder:text-[#5a6285] focus:border-[#6a4696] focus:ring-2 focus:ring-[#6a4696]/30";
  return (
    <div className={field.colSpan === 2 ? "sm:col-span-2" : ""}>
      <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[#8b8fa8]">
        {field.label}
        {field.required ? <span className="ml-0.5 text-red-400">*</span> : null}
      </label>
      {field.type === "textarea" ? (
        <textarea
          name={field.name}
          rows={field.rows ?? 3}
          required={field.required}
          autoFocus={autoFocus}
          defaultValue={defaultValue ?? ""}
          placeholder={field.placeholder}
          className={`${cls} resize-y`}
        />
      ) : field.type === "image" ? (
        <ImagePicker
          name={field.name}
          defaultValue={defaultValue == null ? "" : String(defaultValue)}
          required={field.required}
          placeholder={field.placeholder}
        />
      ) : (
        <input
          name={field.name}
          type={field.type === "url" ? "url" : "text"}
          required={field.required}
          autoFocus={autoFocus}
          defaultValue={defaultValue ?? ""}
          placeholder={field.placeholder}
          className={cls}
        />
      )}
    </div>
  );
}

function RowEditor({
  item,
  fields,
  actions,
  isFirst,
  isLast,
}: {
  item: CollectionItem;
  fields: CollectionField[];
  actions: CollectionActions;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | undefined>();

  return (
    <form
      action={(formData) => {
        setError(undefined);
        start(async () => {
          const res = await actions.update(item.id!, formData);
          if (res?.error) setError(res.error);
        });
      }}
      className="rounded-xl border border-[#2a3158] bg-[#0d1220]/60 p-3"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <FieldRow key={f.name} field={f} defaultValue={item[f.name]} />
        ))}
      </div>

      {error ? <div className="mt-2 text-xs text-red-400">{error}</div> : null}

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={isFirst || pending}
            onClick={() => start(() => actions.move(item.id!, "up"))}
            className="rounded-md border border-[#2a3158] p-1.5 text-[#8b8fa8] transition hover:border-[#6a4696] hover:text-white disabled:opacity-30"
            title="Yukarı taşı"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            disabled={isLast || pending}
            onClick={() => start(() => actions.move(item.id!, "down"))}
            className="rounded-md border border-[#2a3158] p-1.5 text-[#8b8fa8] transition hover:border-[#6a4696] hover:text-white disabled:opacity-30"
            title="Aşağı taşı"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (confirm("Bu kaydı silmek istediğine emin misin?"))
                start(() => actions.remove(item.id!));
            }}
            className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Sil
          </button>
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

function NewRowForm({
  fields,
  onSubmit,
  onCancel,
}: {
  fields: CollectionField[];
  onSubmit: (formData: FormData) => Promise<{ error?: string } | undefined>;
  onCancel: () => void;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | undefined>();

  return (
    <form
      action={(formData) => {
        setError(undefined);
        start(async () => {
          const res = await onSubmit(formData);
          if (res?.error) setError(res.error);
        });
      }}
      className="rounded-xl border border-[#6a4696]/40 bg-[#1a2240]/40 p-3"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((f, i) => (
          <FieldRow key={f.name} field={f} autoFocus={i === 0} />
        ))}
      </div>

      {error ? <div className="mt-2 text-xs text-red-400">{error}</div> : null}

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={pending}
          className="rounded-lg border border-[#2a3158] px-3 py-1.5 text-xs text-[#8b8fa8] hover:text-white"
        >
          Vazgeç
        </button>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#6a4696] to-[#a86dab] px-3 py-1.5 text-xs font-semibold text-white hover:from-[#7463a9] disabled:opacity-50"
        >
          <Plus className="h-3.5 w-3.5" />
          {pending ? "Ekleniyor…" : "Ekle"}
        </button>
      </div>
    </form>
  );
}
