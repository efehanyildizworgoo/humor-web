import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { uploads } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const rows = await db
    .select({
      id: uploads.id,
      url: uploads.url,
      filename: uploads.filename,
      createdAt: uploads.createdAt,
    })
    .from(uploads)
    .orderBy(desc(uploads.createdAt))
    .limit(200);
  return NextResponse.json(rows);
}
