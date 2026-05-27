import "server-only";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { inArray } from "drizzle-orm";

export type SettingValue = string | number | boolean | null;

/** Read site settings as a plain key→value map (values are JSON). */
export async function readSettings(keys: string[]): Promise<Record<string, SettingValue>> {
  if (keys.length === 0) return {};
  const rows = await db
    .select()
    .from(siteSettings)
    .where(inArray(siteSettings.key, keys));
  const out: Record<string, SettingValue> = {};
  for (const k of keys) out[k] = null;
  for (const r of rows) {
    const v = r.value as unknown;
    out[r.key] =
      typeof v === "string" || typeof v === "number" || typeof v === "boolean" ? v : null;
  }
  return out;
}

export async function writeSettings(entries: Record<string, SettingValue>) {
  const items = Object.entries(entries);
  if (items.length === 0) return;
  for (const [key, value] of items) {
    await db
      .insert(siteSettings)
      .values({ key, value: value as unknown as object, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value: value as unknown as object, updatedAt: new Date() },
      });
  }
}
