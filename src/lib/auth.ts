import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";

export const SESSION_COOKIE = "humor_admin_session";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { credentialVersion, signToken, verifyToken, SESSION_TTL_SECONDS } from "./session-token";
export type SessionPayload = { uid: number; email: string };
export async function signSession(payload: SessionPayload): Promise<string> {
 const [user]=await db.select().from(adminUsers).where(eq(adminUsers.id,payload.uid)).limit(1);
 if(!user || user.email!==payload.email) throw new Error("Unauthorized");
 return signToken(user.id,user.email,user.passwordHash);
}
export async function verifySession(token:string|undefined):Promise<SessionPayload|null> {
 try { const p=await verifyToken(token);if(!p)return null;
 const [user]=await db.select().from(adminUsers).where(eq(adminUsers.id,p.uid)).limit(1);
 if(!user || user.email!==p.email || credentialVersion(user.passwordHash)!==p.cv)return null;
 return {uid:user.id,email:user.email}; } catch {return null;}
}

export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return verifySession(token);
});

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    // Throwing here means caller should be inside protected area.
    // For pages, we redirect — this is a defensive fallback.
    throw new Error("Unauthorized");
  }
  return session;
}

export async function setSessionCookie(token: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
