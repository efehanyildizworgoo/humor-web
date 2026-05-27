"use client";

import { useRef, useState, useTransition } from "react";
import { Upload, Loader2 } from "lucide-react";
import { uploadImageAction, type UploadResult } from "./actions";

export default function UploadZone({
  onUploaded,
}: {
  onUploaded?: (res: { url: string; id: number }) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const upload = async (files: FileList | File[]) => {
    setError(null);
    const list = Array.from(files);
    if (list.length === 0) return;
    setProgress({ done: 0, total: list.length });
    let firstErr: string | null = null;
    for (let i = 0; i < list.length; i++) {
      const fd = new FormData();
      fd.append("file", list[i]);
      const res: UploadResult = await uploadImageAction(fd);
      if (res.ok) {
        onUploaded?.({ url: res.url, id: res.id });
      } else if (!firstErr) {
        firstErr = res.error;
      }
      setProgress({ done: i + 1, total: list.length });
    }
    if (firstErr) setError(firstErr);
    setProgress(null);
  };

  return (
    <div>
      <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files.length > 0) {
            start(() => upload(e.dataTransfer.files));
          }
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition ${
          dragging
            ? "border-[#6a4696] bg-[#6a4696]/10"
            : "border-[#2a3158] bg-[#0d1220]/40 hover:border-[#6a4696]/60"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) start(() => upload(e.target.files!));
            if (inputRef.current) inputRef.current.value = "";
          }}
        />
        {pending ? (
          <Loader2 className="h-8 w-8 animate-spin text-[#a86dab]" />
        ) : (
          <Upload className="h-8 w-8 text-[#a86dab]" />
        )}
        <div className="text-sm font-medium text-white">
          {pending && progress
            ? `Yükleniyor ${progress.done}/${progress.total}…`
            : "Görsel yüklemek için tıkla veya sürükle"}
        </div>
        <div className="text-xs text-[#8b8fa8]">
          JPG, PNG, WEBP, GIF, SVG · Max 10 MB
        </div>
      </label>
      {error ? (
        <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </div>
      ) : null}
    </div>
  );
}
