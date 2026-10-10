"use server";

import { writeSettings } from "@/lib/settings";
import { revalidatePath } from "next/cache";
import { assertFormSize } from "@/lib/action-security";
import { requireSession } from "@/lib/auth";
import { SETTING_KEYS } from "./keys";

export type SettingsState = { ok?: boolean; error?: string };

export async function updateSettingsAction(
  _prev: SettingsState | undefined,
  formData: FormData,
): Promise<SettingsState> {
  await requireSession();
  assertFormSize(formData);
  const entries: Record<string, string> = {};
  for (const key of SETTING_KEYS) {
    if (!formData.has(key)) continue;
    entries[key] = String(formData.get(key) ?? "");
  }
  await writeSettings(entries);
  revalidatePath("/admin/ayarlar");
  revalidatePath("/", "layout");
  return { ok: true };
}
