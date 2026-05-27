"use server";

import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
import { signSession, setSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { error: "E-posta ve şifre gerekli." };
  }

  const rows = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  const user = rows[0];
  if (!user) return { error: "Geçersiz e-posta veya şifre." };

  const ok = await compare(password, user.passwordHash);
  if (!ok) return { error: "Geçersiz e-posta veya şifre." };

  const token = await signSession({ uid: user.id, email: user.email });
  await setSessionCookie(token);

  // Safety: only allow same-site relative redirect targets.
  const safeNext = next.startsWith("/admin") ? next : "/admin";
  redirect(safeNext);
}
