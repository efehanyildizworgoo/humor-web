export default function SeoText({ html }: { html: string }) {
  if (!html) return null;
  return (
    <section className="border-t border-[var(--color-border)] bg-[#0d1220]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <div
          className="prose-rich h-[110px] overflow-y-auto pr-4 scrollbar-thin text-white/30 text-[13px] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  );
}
