"use server";

import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth";

export async function markMessageReadAction(id: number, read: boolean) {
  await requireSession();
  await db.update(contactMessages).set({ read }).where(eq(contactMessages.id, id));
  revalidatePath("/admin/mesajlar");
  revalidatePath("/admin");
}

export async function deleteMessageAction(id: number) {
  await requireSession();
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
  revalidatePath("/admin/mesajlar");
  revalidatePath("/admin");
  redirect("/admin/mesajlar");
}

export async function markAllReadAction() {
  await requireSession();
  await db.update(contactMessages).set({ read: true });
  revalidatePath("/admin/mesajlar");
  revalidatePath("/admin");
}
