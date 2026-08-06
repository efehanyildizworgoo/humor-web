"use client";

import { useEffect, useState, useTransition } from "react";
import { Image as ImageIcon, X, Upload, Loader2, Check } from "lucide-react";
import { uploadImageAction } from "../gorseller/actions";
import { MAX_UPLOAD_LABEL, validateUploadFile } from "@/lib/upload-limits";

type LibraryItem = { id: number; url: string; filename: string; createdAt: string };

/**
 * Image URL input with a built-in library picker + inline upload.
 * - Plain URLs (https://…) still work — just type or paste.
 * - "Galeriden Seç" opens a modal listing previously uploaded images.
 * - Drop a file inside the picker to upload + select in one step.
 */
export default function ImagePicker({
  name,
  defaultValue = "",
  required = false,
  placeholder = "https://… veya /uploads/…",
}: {
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <input
          type="text"
          name={name}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 rounded-lg border border-[#2a3158] bg-[#0d1220] px-3 py-2 text-sm text-[#e8e9f0] outline-none transition placeholder:text-[#5a6285] focus:border-[#6a4696] focus:ring-2 focus:ring-[#6a4696]/30"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#2a3158] bg-[#111729] px-3 py-2 text-xs font-medium text-white hover:border-[#6a4696]"
          title="Görsel galerisinden seç"
        >
          <ImageIcon className="h-3.5 w-3.5" />
          Galeri
        </button>
      </div>

      {value ? (
        <div className="mt-2 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            className="h-12 w-12 shrink-0 rounded border border-[#2a3158] object-cover"
          />
          <span className="truncate text-xs text-[#8b8fa8]" title={value}>{value}</span>
        </div>
      ) : null}

      {open ? (
        <PickerModal
          onClose={() => setOpen(false)}
          onPick={(url) => {
            setValue(url);
            setOpen(false);
          }}
        />
      ) : null}
    </>
  );
}

function PickerModal({
  onClose,
  onPick,
}: {
  onClose: () => void;
  onPick: (url: string) => void;
}) {
  const [items, setItems] = useState<LibraryItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, startUpload] = useTransition();
  const [dragging, setDragging] = useState(false);

  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Load library via fetch to a route handler that returns JSON.
  // We expose this through a small API route below.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/admin/api/uploads", { cache: "no-store" });
        if (!res.ok) throw new Error("liste yüklenemedi");
        const data = (await res.json()) as LibraryItem[];
        if (alive) setItems(data);
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : "yüklenemedi");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const upload = (files: FileList | File[]) => {
    const list = Array.from(files);
    if (list.length === 0) return;
    startUpload(async () => {
      setError(null);
      for (const f of list) {
        // Reject locally first — an oversized body throws inside the Server
        // Action and React tears down the whole admin page.
        const localErr = validateUploadFile(f);
        if (localErr) {
          setError(localErr);
          continue;
        }
        const fd = new FormData();
        fd.append("file", f);
        try {
          const res = await uploadImageAction(fd);
          if (res.ok) {
            setItems((prev) => [
              { id: res.id, url: res.url, filename: res.filename, createdAt: new Date().toISOString() },
              ...(prev ?? []),
            ]);
          } else {
            setError(res.error);
          }
        } catch {
          setError(`"${f.name}" yüklenemedi. Dosya ${MAX_UPLOAD_LABEL} sınırının altında mı ve bağlantın açık mı kontrol et.`);
        }
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#2a3158] bg-[#0d1220] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#2a3158] px-5 py-4">
          <div>
            <h3 className="text-base font-semibold text-white">Görsel Seç</h3>
            <p className="text-xs text-[#8b8fa8]">Yüklenmiş bir görseli seç veya yeni yükle.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-[#8b8fa8] hover:bg-[#111729] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-[#2a3158] px-5 py-4">
          <label
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              if (e.dataTransfer.files.length > 0) upload(e.dataTransfer.files);
            }}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-4 text-xs transition ${
              dragging
                ? "border-[#6a4696] bg-[#6a4696]/10 text-white"
                : "border-[#2a3158] text-[#8b8fa8] hover:border-[#6a4696]/60"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => { if (e.target.files) upload(e.target.files); }}
            />
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            <span>{uploading ? "Yükleniyor…" : "Yeni görsel yüklemek için tıkla veya sürükle"}</span>
          </label>
          {error ? (
            <div className="mt-2 text-xs text-red-300">{error}</div>
          ) : null}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items === null ? (
            <div className="flex items-center justify-center py-12 text-sm text-[#8b8fa8]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Yükleniyor…
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#2a3158] py-12 text-center text-sm text-[#8b8fa8]">
              Henüz yüklenmiş görsel yok. Yukarıdaki alana sürükleyerek başla.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {items.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => onPick(it.url)}
                  className="group relative overflow-hidden rounded-lg border border-[#2a3158] bg-[#111729] transition hover:border-[#6a4696]"
                >
                  <div className="aspect-square w-full overflow-hidden bg-[#1a2240]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={it.url}
                      alt={it.filename}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-[#6a4696]/0 transition group-hover:bg-[#6a4696]/40">
                    <div className="rounded-full bg-[#6a4696] p-2 opacity-0 transition group-hover:opacity-100">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="truncate px-2 py-1.5 text-[10px] text-[#8b8fa8]" title={it.filename}>
                    {it.filename}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
