import Link from "next/link";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { desc, eq, count } from "drizzle-orm";
import { PageHeader, Card, EmptyState, Badge } from "../_components/ui";
import { markAllReadAction } from "./actions";
import { CheckCheck } from "lucide-react";

export const metadata = { title: "Mesajlar" };
export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const [list, [unread]] = await Promise.all([
    db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)),
    db.select({ c: count() }).from(contactMessages).where(eq(contactMessages.read, false)),
  ]);

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Mesajlar"
        description={`Toplam ${list.length} mesaj${
          unread.c > 0 ? ` · ${unread.c} okunmamış` : ""
        }.`}
        action={
          unread.c > 0 ? (
            <form action={markAllReadAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#2a3158] bg-[#111729] px-3 py-2 text-xs font-medium text-white hover:border-[#6a4696]"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Tümünü Okundu İşaretle
              </button>
            </form>
          ) : null
        }
      />

      {list.length === 0 ? (
        <EmptyState
          title="Henüz mesaj yok"
          description="Site iletişim formundan gelen mesajlar burada listelenecek."
        />
      ) : (
        <Card padded={false}>
          <ul className="divide-y divide-[#2a3158]">
            {list.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/admin/mesajlar/${m.id}`}
                  className={`flex items-start gap-4 px-5 py-4 transition hover:bg-[#1a2240]/50 ${
                    !m.read ? "bg-[#6a4696]/[0.04]" : ""
                  }`}
                >
                  <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    !m.read ? "bg-[#a86dab]" : "bg-transparent"
                  }`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${!m.read ? "text-white" : "text-[#c0c4d8]"}`}>
                        {m.name}
                      </span>
                      {m.email ? (
                        <span className="text-xs text-[#8b8fa8]">· {m.email}</span>
                      ) : null}
                      {!m.read ? <Badge tone="accent">Yeni</Badge> : null}
                    </div>
                    <div className="mt-1 truncate text-sm text-[#8b8fa8]">
                      {m.subject ? <span className="font-medium text-[#c0c4d8]">{m.subject} — </span> : null}
                      {m.message}
                    </div>
                  </div>
                  <div className="shrink-0 text-xs text-[#8b8fa8]">
                    {new Date(m.createdAt).toLocaleDateString("tr-TR")}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
