import { createClient, type Entry } from "contentful";
import type { Loader, LoaderContext } from "astro/loaders";

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

const PAGE_SIZE = 100;

/** CDA's own type for link-resolution depth: 0 through 10. */
type IncludeDepth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface ContentfulLoaderOptions {
  /** Contentful content-type id, e.g. "blogPost". */
  contentType: string;
  /** Entry id for the loaded collection. Falls back to sys.id when omitted. */
  idOf?: (entry: Entry) => string;
  /** CDA `order` param, e.g. ["-fields.publishedAt"]. */
  order?: string[];
  /**
   * Link-resolution depth. 1 is enough to resolve every direct Asset/Entry
   * field this project reads — deeper levels are never touched by transform()
   * and would only risk materializing the cross-post reference cycles
   * Contentful's bulk responses already exhibit at depth 1 (see transforms.ts).
   */
  include?: IncludeDepth;
  /** Maps a raw entry to the collection's schema input. Must not spread or
   * serialize a linked Entry/Asset wholesale — see entryId() in transforms.ts. */
  transform: (entry: Entry) => Record<string, unknown>;
  /** When set, the named field is treated as a Markdown body and rendered
   * at load time so `render(entry)` works on the resulting collection entry. */
  markdownField?: string;
}

export function contentfulLoader(opts: ContentfulLoaderOptions): Loader {
  return {
    name: `contentful:${opts.contentType}`,
    load: async ({ store, logger, parseData, generateDigest, renderMarkdown }: LoaderContext) => {
      store.clear();

      let skip = 0;
      let total = Infinity;
      let loaded = 0;

      while (skip < total) {
        const page = await client.getEntries({
          content_type: opts.contentType,
          include: opts.include ?? 1,
          order: opts.order as never,
          limit: PAGE_SIZE,
          skip,
        });
        total = page.total;
        skip += page.items.length;

        for (const entry of page.items) {
          const id = opts.idOf?.(entry) ?? entry.sys.id;
          const raw = opts.transform(entry);
          const data = await parseData({ id, data: raw });
          const digest = generateDigest(data);

          const markdown = opts.markdownField
            ? (entry.fields as Record<string, unknown>)[opts.markdownField]
            : undefined;

          if (typeof markdown === "string" && markdown) {
            const rendered = await renderMarkdown(markdown);
            store.set({ id, data, body: markdown, digest, rendered });
          } else {
            store.set({ id, data, digest });
          }
          loaded++;
        }

        // CDA's `total` can exceed items actually returned once filtered by
        // access rules; bail once a page returns nothing to avoid looping.
        if (page.items.length === 0) break;
      }

      logger.info(`loaded ${loaded} ${opts.contentType} entries`);
    },
  };
}
