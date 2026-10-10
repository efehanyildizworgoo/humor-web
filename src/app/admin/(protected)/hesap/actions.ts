"use server";
import { allowAttempt, assertFormSize } from "@/lib/action-security";

import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcryptjs";
import {
  requireSession,
  signSession,
  setSessionCookie,
} from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type AccountState = {
  ok?: boolean;
  error?: string;
  field?: "email" | "currentPassword" | "newPassword" | "confirmPassword";
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

export async function updateAccountAction(
  _prev: AccountState | undefined,
  formData: FormData,
): Promise<AccountState> {
  const session = await requireSession();
  assertFormSize(formData,4096);
  if(!await allowAttempt("account",8))return {error:"Çok fazla deneme. Lütfen daha sonra tekrar deneyin."};

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newEmail = String(formData.get("email") ?? "").trim().toLowerCase();
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (newEmail.length>255 || currentPassword.length>256 || Buffer.byteLength(newPassword,"utf8")>72) return {error:"E-posta veya şifre çok uzun."};
  if (!currentPassword) {
    return { error: "Mevcut şifren gerekli.", field: "currentPassword" };
  }
  if (!newEmail) {
    return { error: "E-posta gerekli.", field: "email" };
  }
  if (!EMAIL_RE.test(newEmail)) {
    return { error: "Geçerli bir e-posta gir.", field: "email" };
  }

  // Load the admin row matching the session.
  const [admin] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.id, session.uid));
  if (!admin) {
    return { error: "Hesap bulunamadı. Tekrar giriş yap." };
  }

  // Verify the current password.
  const ok = await compare(currentPassword, admin.passwordHash);
  if (!ok) {
    return { error: "Mevcut şifre yanlış.", field: "currentPassword" };
  }

  // Build the update set.
  const updates: { email?: string; passwordHash?: string } = {};

  // If the email changed, make sure it isn't already taken by ANOTHER admin.
  if (newEmail !== admin.email) {
    const [conflict] = await db
      .select({ id: adminUsers.id })
      .from(adminUsers)
      .where(eq(adminUsers.email, newEmail));
    if (conflict && conflict.id !== admin.id) {
      return { error: "Bu e-posta başka bir hesapta kullanılıyor.", field: "email" };
    }
    updates.email = newEmail;
  }

  // Password change is optional — only when newPassword is provided.
  if (newPassword || confirmPassword) {
    if (newPassword.length < MIN_PASSWORD) {
      return { error: `Yeni şifre en az ${MIN_PASSWORD} karakter olmalı.`, field: "newPassword" };
    }
    if (newPassword !== confirmPassword) {
      return { error: "Yeni şifre tekrarı eşleşmiyor.", field: "confirmPassword" };
    }
    if (newPassword === currentPassword) {
      return { error: "Yeni şifre mevcut şifreyle aynı olamaz.", field: "newPassword" };
    }
    updates.passwordHash = await hash(newPassword, 10);
  }

  if (Object.keys(updates).length === 0) {
    return { error: "Değişiklik yok." };
  }

  await db.update(adminUsers).set(updates).where(eq(adminUsers.id, admin.id));

  // If email changed, refresh the session cookie so it carries the new claim.
  if (updates.email || updates.passwordHash) {
    const token = await signSession({ uid: admin.id, email: updates.email ?? admin.email });
    await setSessionCookie(token);
  }

  revalidatePath("/admin/hesap");
  return { ok: true };
}
