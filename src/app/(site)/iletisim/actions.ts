"use server";

import { allowAttempt, assertFormSize } from "@/lib/action-security";
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
  try { assertFormSize(formData,16384); } catch { return {error:"Form çok büyük."}; }
  if(!await allowAttempt("contact",8))return {error:"Çok fazla istek. Lütfen daha sonra tekrar deneyin."};
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const subject = String(formData.get("subject") ?? formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if(email.length>255 || phone.length>40 || subject.length>300) return {error:"Alan uzunluğu sınırı aşıldı."};
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
