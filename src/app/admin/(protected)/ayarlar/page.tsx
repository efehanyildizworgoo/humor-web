import { readSettings } from "@/lib/settings";
import { PageHeader, Card } from "../_components/ui";
import SettingsForm from "./SettingsForm";
import { SETTING_KEYS } from "./keys";

export const metadata = { title: "Ayarlar" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const values = await readSettings([...SETTING_KEYS]);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Site Ayarları"
        description="İletişim bilgileri, sosyal medya hesapları ve varsayılan SEO metinleri."
      />
      <Card>
        <SettingsForm
          initial={Object.fromEntries(
            Object.entries(values).map(([k, v]) => [k, v == null ? "" : String(v)]),
          )}
        />
      </Card>
    </div>
  );
}
