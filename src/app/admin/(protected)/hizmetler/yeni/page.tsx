import { PageHeader, Card } from "../../_components/ui";
import NewServiceForm from "./NewServiceForm";

export const metadata = { title: "Yeni Hizmet" };

export default function NewServicePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Yeni Hizmet"
        description="Temel bilgileri gir, kaydet, sonra detayları düzenle."
        back={{ href: "/admin/hizmetler", label: "Hizmetler" }}
      />
      <Card>
        <NewServiceForm />
      </Card>
    </div>
  );
}
