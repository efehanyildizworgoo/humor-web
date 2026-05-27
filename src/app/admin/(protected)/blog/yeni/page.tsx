import { PageHeader, Card } from "../../_components/ui";
import NewPostForm from "./NewPostForm";

export const metadata = { title: "Yeni Yazı" };

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Yeni Yazı"
        description="Temel bilgileri gir, oluştur, sonra içeriği zenginleştir."
        back={{ href: "/admin/blog", label: "Blog" }}
      />
      <Card>
        <NewPostForm />
      </Card>
    </div>
  );
}
