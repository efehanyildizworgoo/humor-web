"use server";

import { writeSettings, type SettingValue } from "@/lib/settings";
import { revalidatePath } from "next/cache";
import { assertFormSize } from "@/lib/action-security";
import { requireSession } from "@/lib/auth";
import { sanitizeRichHtml } from "@/lib/sanitize";
import { fieldsForPage, getPageBySlug } from "@/lib/pageContent";

export type PageState = { ok?: boolean; error?: string };

export async function savePageAction(
  slug: string,
  _prev: PageState | undefined,
  formData: FormData,
): Promise<PageState> {
  await requireSession();
  assertFormSize(formData);
  const page = getPageBySlug(slug);
  if (!page) return { error: "Sayfa bulunamadı." };

  const fields = fieldsForPage(slug);
  const entries: Record<string, SettingValue> = {};
  for (const f of fields) {
    if (!formData.has(f.key)) continue;
    const raw = String(formData.get(f.key) ?? "");
    entries[f.key] = f.type === "rich" ? sanitizeRichHtml(raw) : raw;
  }
  await writeSettings(entries);

  revalidatePath(`/admin/sayfalar/${slug}`);
  revalidatePath(page.publicHref, "layout");
  return { ok: true };
}
