import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { PageHeader, Card } from "../_components/ui";
import AccountForm from "./AccountForm";

export const metadata = { title: "Hesap" };
export const dynamic = "force-dynamic";

export default async function HesapPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [admin] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.id, session.uid));
  if (!admin) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Hesap"
        description="E-posta ve şifreni buradan güncelleyebilirsin."
      />
      <Card>
        <AccountForm currentEmail={admin.email} />
      </Card>
    </div>
  );
}
