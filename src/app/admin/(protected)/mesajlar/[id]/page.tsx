import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PageHeader, Card } from "../../_components/ui";
import ConfirmDelete from "../../_components/ConfirmDelete";
import { markMessageReadAction, deleteMessageAction } from "../actions";
import { Mail, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();
  const [m] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
  if (!m) notFound();

  // Auto-mark as read when viewing
  if (!m.read) {
    await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id));
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title={m.subject || `${m.name} ile iletişim`}
        description={
          <span>
            {new Date(m.createdAt).toLocaleString("tr-TR")}
          </span>
        }
        back={{ href: "/admin/mesajlar", label: "Mesajlar" }}
        action={
          <>
            <form action={markMessageReadAction.bind(null, m.id, false)}>
              <button
                type="submit"
                className="inline-flex items-center gap-1 rounded-lg border border-[#2a3158] bg-[#111729] px-3 py-2 text-xs text-white hover:border-[#6a4696]"
              >
                Okunmamış İşaretle
              </button>
            </form>
            <ConfirmDelete
              action={deleteMessageAction.bind(null, m.id)}
              size="md"
              label="Mesajı Sil"
            />
          </>
        }
      />

      <Card className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8b8fa8]">Gönderen</div>
            <div className="mt-1 text-base font-medium text-white">{m.name}</div>
          </div>
          {m.email ? (
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8b8fa8]">E-posta</div>
              <a
                href={`mailto:${m.email}`}
                className="mt-1 inline-flex items-center gap-1.5 text-base text-white hover:text-[#a86dab]"
              >
                <Mail className="h-4 w-4" />
                {m.email}
              </a>
            </div>
          ) : null}
          {m.phone ? (
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8b8fa8]">Telefon</div>
              <a
                href={`tel:${m.phone}`}
                className="mt-1 inline-flex items-center gap-1.5 text-base text-white hover:text-[#a86dab]"
              >
                <Phone className="h-4 w-4" />
                {m.phone}
              </a>
            </div>
          ) : null}
          {m.subject ? (
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8b8fa8]">Konu</div>
              <div className="mt-1 text-base text-white">{m.subject}</div>
            </div>
          ) : null}
        </div>

        <div className="border-t border-[#2a3158] pt-5">
          <div className="text-xs uppercase tracking-wider text-[#8b8fa8]">Mesaj</div>
          <div className="mt-2 whitespace-pre-wrap text-base leading-relaxed text-[#e8e9f0]">
            {m.message}
          </div>
        </div>
      </Card>
    </div>
  );
}
