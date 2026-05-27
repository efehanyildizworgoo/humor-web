/**
 * Render server-sanitized HTML from the rich editor.
 * Content is already sanitized at write-time (sanitizeRichHtml), so we can
 * safely use dangerouslySetInnerHTML here.
 *
 * Adds a `.prose` wrapper that scopes typography styles to editor output.
 */
export default function SafeHtml({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  if (!html) return null;
  return (
    <div
      className={`prose-rich ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
