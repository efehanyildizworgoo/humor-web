"use client";

import { useState, useTransition } from "react";
import { Copy, Check, Trash2 } from "lucide-react";
import { deleteUploadAction } from "./actions";

export default function UploadCard({
  id,
  url,
  filename,
  size,
  createdAt,
}: {
  id: number;
  url: string;
  filename: string;
  size: number;
  createdAt: string;
}) {
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [pending, start] = useTransition();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* no-op */
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#2a3158] bg-[#0d1220]">
      <div className="aspect-square w-full overflow-hidden bg-[#1a2240]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={filename} className="h-full w-full object-cover" />
      </div>
      <div className="p-3">
        <div className="truncate text-xs font-medium text-white" title={filename}>
          {filename}
        </div>
        <div className="mt-0.5 flex items-center justify-between text-[10px] text-[#8b8fa8]">
          <span>{(size / 1024).toFixed(0)} KB</span>
          <span>{new Date(createdAt).toLocaleDateString("tr-TR")}</span>
        </div>

        <div className="mt-2 flex items-center gap-1">
          <button
            type="button"
            onClick={copy}
            className="flex-1 inline-flex items-center justify-center gap-1 rounded-md border border-[#2a3158] bg-[#111729] px-2 py-1.5 text-[11px] font-medium text-white hover:border-[#6a4696]"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-300" />
                <span className="text-emerald-300">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                URL Kopyala
              </>
            )}
          </button>
          {!confirming ? (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 p-1.5 text-red-300 hover:bg-red-500/20"
              title="Sil"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          ) : (
            <>
              <button
                type="button"
                disabled={pending}
                onClick={() => start(async () => { await deleteUploadAction(id); })}
                className="inline-flex items-center rounded-md bg-red-500 px-2 py-1.5 text-[10px] font-semibold text-white hover:bg-red-600 disabled:opacity-60"
              >
                {pending ? "…" : "Evet"}
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                disabled={pending}
                className="inline-flex items-center rounded-md border border-[#2a3158] px-2 py-1.5 text-[10px] text-[#8b8fa8]"
              >
                İptal
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
