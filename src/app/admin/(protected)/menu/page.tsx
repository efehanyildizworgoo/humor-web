import { db } from "@/lib/db";
import { navItems, footerLinks } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { PageHeader, Card } from "../_components/ui";
import CollectionEditor from "../_components/CollectionEditor";
import {
  addNavAction,
  updateNavAction,
  deleteNavAction,
  moveNavAction,
  addFooterAction,
  updateFooterAction,
  deleteFooterAction,
  moveFooterAction,
} from "./actions";

export const metadata = { title: "Menü" };
export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const [navs, footers] = await Promise.all([
    db.select().from(navItems).orderBy(asc(navItems.orderIndex), asc(navItems.id)),
    db.select().from(footerLinks).orderBy(asc(footerLinks.section), asc(footerLinks.orderIndex), asc(footerLinks.id)),
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Menü"
        description="Üst menü ve alt menü (footer) linklerini yönet."
      />

      <Card>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#a86dab]">
          Üst Menü (Navbar)
        </h2>
        <CollectionEditor
          addButtonLabel="Menü Maddesi Ekle"
          emptyText="Henüz menü maddesi eklenmemiş."
          fields={[
            { name: "label", label: "Etiket", required: true, placeholder: "Hizmetler" },
            { name: "href", label: "Link", required: true, placeholder: "/hizmetler" },
          ]}
          items={navs.map((it) => ({ id: it.id, label: it.label, href: it.href }))}
          actions={{
            add: addNavAction,
            update: updateNavAction,
            remove: deleteNavAction,
            move: moveNavAction,
          }}
        />
      </Card>

      <Card>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#a86dab]">
          Alt Menü (Footer)
        </h2>
        <p className="mb-3 text-xs text-[#8b8fa8]">
          Bölüm adı (örn. &quot;Hizmetler&quot;, &quot;Kurumsal&quot;) ile gruplanır.
        </p>
        <CollectionEditor
          addButtonLabel="Footer Linki Ekle"
          emptyText="Henüz footer linki eklenmemiş."
          fields={[
            { name: "section", label: "Bölüm", required: true, placeholder: "Hizmetler" },
            { name: "label", label: "Etiket", required: true },
            { name: "href", label: "Link", required: true, colSpan: 2 },
          ]}
          items={footers.map((it) => ({
            id: it.id,
            section: it.section,
            label: it.label,
            href: it.href,
          }))}
          actions={{
            add: addFooterAction,
            update: updateFooterAction,
            remove: deleteFooterAction,
            move: moveFooterAction,
          }}
        />
      </Card>
    </div>
  );
}
