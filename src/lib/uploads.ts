import "server-only";
import path from "node:path";
import { promises as fs } from "node:fs";
import { randomBytes } from "node:crypto";

/**
 * Where uploaded files live on disk. In production this should be a mounted
 * persistent volume (e.g. /app/public/uploads on CapRover). The public URL is
 * always /uploads/<filename> so Next.js serves it from /public.
 */
export function getUploadDir(): string {
  const env = process.env.UPLOAD_DIR;
  if (env && env.trim().length > 0) return env;
  return path.join(process.cwd(), "public", "uploads");
}

export const PUBLIC_PREFIX = "/uploads";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB
export const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
]);

export function extFromMime(mime: string): string {
  switch (mime) {
    case "image/jpeg": return ".jpg";
    case "image/png": return ".png";
    case "image/webp": return ".webp";
    case "image/gif": return ".gif";
    case "image/svg+xml": return ".svg";
    case "image/avif": return ".avif";
    default: return "";
  }
}

export function safeFilename(original: string, mime: string): string {
  const stamp = Date.now().toString(36);
  const rand = randomBytes(4).toString("hex");
  // Strip path components, weird chars; keep a short base for readability.
  const base = original
    .split(/[\\/]/).pop()!
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "file";
  return `${stamp}-${rand}-${base}${extFromMime(mime)}`;
}

export async function ensureUploadDir(): Promise<string> {
  const dir = getUploadDir();
  await fs.mkdir(dir, { recursive: true });
  return dir;
}
