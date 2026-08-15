import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES, type Document } from "@contentful/rich-text-types";

import { ctf, ctfSrcSet } from "./images";

/**
 * Replaces gatsby-source-contentful/rich-text's renderRichText (Gatsby-only
 * API) with the vendor-neutral documentToHtmlString. Embedded assets resolve
 * from the loader's own Contentful `include` depth (1 for timeline, 3 for
 * projects — see content.config.ts); an asset that comes back as an
 * unresolved link stub instead of a full Asset is rendered as nothing
 * rather than crashing, since no content in this space currently embeds one
 * (verified against the live space while building the content layer).
 */
export function renderRichText(doc: Document): string {
  return documentToHtmlString(doc, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const target = node.data.target as
          | { fields?: { file?: { url?: string }; title?: string; description?: string } }
          | undefined;
        const file = target?.fields?.file;
        if (!file?.url) return "";
        const url = file.url.startsWith("//") ? `https:${file.url}` : file.url;
        const alt = target?.fields?.description || target?.fields?.title || "";
        return `<img src="${ctf(url, { w: 1200 })}" srcset="${ctfSrcSet(url, [600, 900, 1200])}" sizes="(max-width: 768px) 100vw, 900px" alt="${alt}" loading="lazy" decoding="async" class="rounded-xl" />`;
      },
      [INLINES.HYPERLINK]: (node, next) => {
        const uri = String(node.data.uri ?? "");
        const external = /^https?:\/\//.test(uri);
        return `<a href="${uri}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${next(node.content)}</a>`;
      },
    },
  });
}
