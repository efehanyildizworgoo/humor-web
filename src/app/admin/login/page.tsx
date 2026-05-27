import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Giriş",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  const next = sp.next && sp.next.startsWith("/admin") ? sp.next : "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d1220] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-2 inline-block rounded-full border border-[#2a3158] bg-[#111729]/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#a86dab]">
            Humor Yönetim
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Hoş geldin
          </h1>
          <p className="mt-2 text-sm text-[#8b8fa8]">
            Yönetim paneline erişmek için giriş yap.
          </p>
        </div>

        <div className="rounded-2xl border border-[#2a3158] bg-[#111729]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
          <LoginForm next={next} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8b8fa8]">
          © {new Date().getFullYear()} Humor Kreatif
        </p>
      </div>
    </div>
  );
}
