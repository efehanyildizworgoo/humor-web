"use server";

import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export type ContactState = {
  ok?: boolean;
  error?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactAction(
  _prev: ContactState | undefined,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const subject = String(formData.get("subject") ?? formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name) return { error: "İsim gerekli." };
  if (!message) return { error: "Mesaj gerekli." };
  if (!email && !phone) return { error: "E-posta veya telefon gerekli." };
  if (email && !EMAIL_RE.test(email)) return { error: "Geçerli bir e-posta adresi girin." };
  if (name.length > 200 || message.length > 5000) {
    return { error: "Mesaj veya isim çok uzun." };
  }

  try {
    await db.insert(contactMessages).values({
      name,
      email,
      phone,
      subject,
      message,
    });
  } catch {
    return { error: "Mesaj kaydedilemedi. Lütfen tekrar deneyin." };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/mesajlar");
  return { ok: true };
}
