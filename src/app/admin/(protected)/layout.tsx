import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Sidebar from "./Sidebar";

export const metadata: Metadata = {
  title: { default: "Yönetim Paneli", template: "%s | Humor Yönetim" },
  robots: { index: false, follow: false },
};

// Auth state is per-request; never cache the layout.
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Login page has its own layout-less full-screen UI; this layout only wraps protected pages.
  // Proxy already redirects unauthenticated users, but verify defensively.
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#0d1220] text-[#e8e9f0]">
      <Sidebar email={session.email} />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
