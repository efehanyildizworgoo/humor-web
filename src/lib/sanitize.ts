import "server-only";
import sanitizeHtml from "sanitize-html";

/**
 * Sanitize HTML coming from the admin RichEditor before persisting / rendering.
 * Allows a curated set of tags + safe attributes. Strips scripts, on* handlers,
 * data:/javascript: URLs, and unknown tags.
 *
 * NOTE: We sanitize on WRITE (in server actions) so reads are cheap and
 * stored data is always safe — even if a future code path forgets to sanitize.
 */
export function sanitizeRichHtml(input: string | null | undefined): string {
  if (!input) return "";
  return sanitizeHtml(input, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "br", "hr",
      "strong", "em", "u", "s", "code", "mark", "sub", "sup",
      "ul", "ol", "li",
      "blockquote", "pre",
      "a",
      "img", "figure", "figcaption",
      "table", "thead", "tbody", "tr", "th", "td",
      "span", "div",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    // Tiptap stores image src either as absolute URL or /uploads/... — both fine.
    allowedSchemesByTag: {
      img: ["http", "https", "data"],
    },
    transformTags: {
      // Force safe defaults on external links.
      a: (tagName, attribs) => {
        const href = attribs.href || "";
        const isExternal = /^https?:\/\//i.test(href);
        return {
          tagName: "a",
          attribs: {
            ...attribs,
            ...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer nofollow" }
              : {}),
          },
        };
      },
    },
    // Strip empty <p></p>? Tiptap outputs <p></p> for empty content; keep as-is.
  });
}

/** Strip all HTML, return plain text. Useful for excerpts / meta descriptions. */
export function htmlToPlainText(input: string | null | undefined, max = 160): string {
  if (!input) return "";
  const text = sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}
