import type { Asset, Entry } from "contentful";

/**
 * Contentful's CDA returns Asset file URLs protocol-relative
 * ("//images.ctfassets.net/..."). Gatsby normalized this for free; here it
 * has to be done by hand or every image breaks in the built output.
 */
export function assetUrl(url: string): string {
  return url.startsWith("//") ? `https:${url}` : url;
}

export interface PlainAsset {
  url: string;
  width: number | null;
  height: number | null;
  title: string;
  description: string;
  contentType: string;
}

/** Flattens a resolved Contentful Asset into plain, JSON-safe data. */
export function asset(a: Asset | undefined | null): PlainAsset | null {
  const file = a?.fields?.file as
    | {
        url?: string;
        contentType?: string;
        details?: { image?: { width?: number; height?: number } };
      }
    | undefined;
  if (!file?.url) return null;
  return {
    url: assetUrl(file.url),
    width: file.details?.image?.width ?? null,
    height: file.details?.image?.height ?? null,
    title: (a?.fields?.title as string) ?? "",
    description: (a?.fields?.description as string) ?? "",
    contentType: file.contentType ?? "",
  };
}

export interface CloudinaryImage {
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

/**
 * blogPost.cover is not a Contentful Asset — it's a JSON field holding an
 * array of Cloudinary upload payloads (secure_url/public_id/width/height/format).
 */
export function cloudinaryImage(c: unknown): CloudinaryImage | null {
  const v = c as Record<string, unknown> | undefined;
  if (!v?.secure_url) return null;
  return {
    secureUrl: String(v.secure_url),
    publicId: String(v.public_id ?? ""),
    width: Number(v.width ?? 0),
    height: Number(v.height ?? 0),
    format: String(v.format ?? ""),
  };
}

/**
 * Extracts the reference id for a linked entry without ever reading past its
 * top-level fields. Contentful's CDA SDK resolves same-response entries by
 * shared object identity — e.g. blogPost.recommendedPosts routinely forms a
 * real cycle (post A -> post B -> post A) once more than a couple dozen
 * posts are fetched in one call. Spreading or JSON.stringify-ing a resolved
 * entry here would walk into that cycle; reading a single field off it does
 * not, because nothing recurses.
 */
export function entryId(
  e: Entry | undefined | null,
  slugField?: string
): string | null {
  if (!e?.sys?.id) return null;
  if (slugField) {
    const slug = (e.fields as Record<string, unknown>)?.[slugField];
    if (typeof slug === "string" && slug) return slug;
  }
  return e.sys.id;
}
