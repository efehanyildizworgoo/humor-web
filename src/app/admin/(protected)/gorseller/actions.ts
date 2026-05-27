"use server";

import path from "node:path";
import { promises as fs } from "node:fs";
import { db } from "@/lib/db";
import { uploads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth";
import {
  ALLOWED_MIME,
  MAX_UPLOAD_BYTES,
  PUBLIC_PREFIX,
  ensureUploadDir,
  safeFilename,
} from "@/lib/uploads";

export type UploadResult =
  | { ok: true; url: string; id: number; filename: string }
  | { ok: false; error: string };

export async function uploadImageAction(formData: FormData): Promise<UploadResult> {
  await requireSession();

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { ok: false, error: "Dosya bulunamadı." };
  }
  if (file.size === 0) return { ok: false, error: "Boş dosya." };
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: `Dosya çok büyük (max ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)} MB).` };
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return { ok: false, error: `Desteklenmeyen format: ${file.type}` };
  }

  const dir = await ensureUploadDir();
  const filename = safeFilename(file.name, file.type);
  const fullPath = path.join(dir, filename);

  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(fullPath, buf);

  const url = `${PUBLIC_PREFIX}/${filename}`;
  const [row] = await db
    .insert(uploads)
    .values({
      filename,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      url,
    })
    .returning({ id: uploads.id });

  revalidatePath("/admin/gorseller");
  return { ok: true, url, id: row.id, filename };
}

export async function deleteUploadAction(id: number) {
  await requireSession();
  const [row] = await db.select().from(uploads).where(eq(uploads.id, id));
  if (!row) return;

  const dir = await ensureUploadDir();
  const fullPath = path.join(dir, row.filename);
  try {
    await fs.unlink(fullPath);
  } catch {
    // file may already be gone; row is still removed
  }
  await db.delete(uploads).where(eq(uploads.id, id));
  revalidatePath("/admin/gorseller");
}
