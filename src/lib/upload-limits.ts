/**
 * Upload constraints shared by the server action and the client widgets.
 * Kept free of "server-only" imports so the admin UI can reject a file
 * *before* it is sent — an oversized body makes the Server Action throw a
 * 413 that React surfaces as a full page crash.
 */

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

export const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
]);

export const MAX_UPLOAD_LABEL = `${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)} MB`;

export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** Returns a Turkish error message, or null when the file is acceptable. */
export function validateUploadFile(file: File): string | null {
  if (file.size === 0) return `"${file.name}" boş görünüyor.`;
  if (file.size > MAX_UPLOAD_BYTES) {
    return `"${file.name}" çok büyük (${formatBytes(file.size)}). En fazla ${MAX_UPLOAD_LABEL} yükleyebilirsin.`;
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return `"${file.name}" desteklenmeyen bir format (${file.type || "bilinmiyor"}). JPG, PNG, WEBP, GIF, SVG veya AVIF kullan.`;
  }
  return null;
}
