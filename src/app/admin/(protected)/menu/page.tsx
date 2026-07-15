import { db } from "@/lib/db";
import { navItems, footerLinks, services } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { PageHeader, Card } from "../_components/ui";
import CollectionEditor from "../_components/CollectionEditor";
import MegaMenuEditor from "./MegaMenuEditor";
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
  const [navs, footers, svcs] = await Promise.all([
    db.select().from(navItems).orderBy(asc(navItems.orderIndex), asc(navItems.id)),
    db.select().from(footerLinks).orderBy(asc(footerLinks.section), asc(footerLinks.orderIndex), asc(footerLinks.id)),
    db
      .select({
        id: services.id,
        title: services.title,
        menuLabel: services.menuLabel,
        icon: services.icon,
        slug: services.slug,
        published: services.published,
      })
      .from(services)
      .orderBy(asc(services.orderIndex), asc(services.id)),
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
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#a86dab]">
          Mega Menü (Hizmetler)
        </h2>
        <p className="mb-4 text-xs text-[#8b8fa8]">
          &quot;Hizmetler&quot; menüsünün açılır (dropdown) listesindeki isimler. Boş bırakılan
          isim, sitede hizmetin başlığına döner. Hizmet eklemek/silmek için{" "}
          <a href="/admin/hizmetler" className="text-[#a86dab] hover:underline">Hizmetler</a>{" "}
          bölümünü kullan.
        </p>
        <MegaMenuEditor items={svcs} />
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
