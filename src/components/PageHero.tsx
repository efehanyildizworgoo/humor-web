/**
 * Generic centered hero used by /hizmetler, /portfolio, /hakkimizda, /iletisim, /blog.
 * Server component — accepts plain text props with an accent-highlighted word
 * inside the title.
 */
export default function PageHero({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  image?: string;
}) {
  let prefix = title;
  let highlight = "";
  if (titleHighlight && title.includes(titleHighlight)) {
    const idx = title.lastIndexOf(titleHighlight);
    prefix = title.slice(0, idx).trimEnd();
    highlight = titleHighlight;
  }

  return (
    <section className="relative h-[60vh] min-h-[420px] max-h-[600px] flex items-center justify-center overflow-hidden">
      {image ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1220]/80 via-[#0d1220]/70 to-[#0d1220]" />
      <div className="relative z-10 text-center px-6">
        {eyebrow ? (
          <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.5em] mb-4">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {prefix}
          {highlight ? (
            <>
              {prefix ? " " : ""}
              <span className="text-[var(--color-accent)]">{highlight}</span>
            </>
          ) : null}
        </h1>
        {subtitle ? (
          <p className="mt-6 max-w-2xl mx-auto text-white/60 text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
