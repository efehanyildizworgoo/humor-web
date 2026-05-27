import { PageHeader, Card } from "../../_components/ui";
import NewProjectForm from "./NewProjectForm";

export const metadata = { title: "Yeni Proje" };

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Yeni Proje"
        description="Temel bilgileri gir, kaydet, sonra detayları düzenle."
        back={{ href: "/admin/portfolio", label: "Portfolyo" }}
      />
      <Card>
        <NewProjectForm />
      </Card>
    </div>
  );
}
