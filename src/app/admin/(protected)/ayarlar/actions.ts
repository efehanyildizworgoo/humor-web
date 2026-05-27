"use server";

import { writeSettings } from "@/lib/settings";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth";
import { SETTING_KEYS } from "./keys";

export type SettingsState = { ok?: boolean; error?: string };

export async function updateSettingsAction(
  _prev: SettingsState | undefined,
  formData: FormData,
): Promise<SettingsState> {
  await requireSession();
  const entries: Record<string, string> = {};
  for (const key of SETTING_KEYS) {
    entries[key] = String(formData.get(key) ?? "");
  }
  await writeSettings(entries);
  revalidatePath("/admin/ayarlar");
  revalidatePath("/", "layout");
  return { ok: true };
}
