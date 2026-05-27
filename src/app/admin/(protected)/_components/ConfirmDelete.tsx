"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";

export default function ConfirmDelete({
  action,
  label = "Sil",
  confirmText = "Bu kaydı silmek istediğine emin misin?",
  size = "sm",
  iconOnly = false,
}: {
  action: () => Promise<void>;
  label?: string;
  confirmText?: string;
  size?: "sm" | "md";
  iconOnly?: boolean;
}) {
  const [pending, start] = useTransition();
  const [open, setOpen] = useState(false);

  const sz = size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm";

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={pending}
        className={`inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 ${sz} font-medium text-red-300 transition hover:bg-red-500/20 disabled:opacity-50`}
        title={label}
      >
        <Trash2 className="h-3.5 w-3.5" />
        {!iconOnly ? <span>{label}</span> : null}
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`rounded-lg bg-red-500/10 ${sz} text-red-300`}>{confirmText}</span>
      <button
        type="button"
        disabled={pending}
        onClick={() => start(async () => { await action(); setOpen(false); })}
        className={`rounded-lg bg-red-500 ${sz} font-semibold text-white hover:bg-red-600 disabled:opacity-50`}
      >
        {pending ? "Siliniyor…" : "Evet, Sil"}
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        disabled={pending}
        className={`rounded-lg border border-[#2a3158] ${sz} text-[#8b8fa8] hover:text-white`}
      >
        Vazgeç
      </button>
    </span>
  );
}
