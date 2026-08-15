/**
 * Responsive-image URL builders for the two remote CDNs this site pulls
 * from. Neither goes through astro:assets/sharp — these are the same
 * CDN-side transforms Gatsby already relied on (gatsby-source-contentful's
 * own image resolver uses Contentful's Image API rather than downloading
 * assets locally; gatsby-transformer-cloudinary does the same for
 * Cloudinary), and reprocessing ~140 remote images locally on every build
 * would be pure overhead for no visual gain.
 */

interface CtfImageOptions {
  w: number;
  h?: number;
  q?: number;
  fm?: "webp" | "avif" | "jpg" | "png";
  fit?: "fill" | "scale" | "crop" | "thumb" | "pad";
}

/** Appends Contentful's Image API transform params to an asset URL. */
export function ctf(url: string, opts: CtfImageOptions): string {
  const params = new URLSearchParams({
    w: String(opts.w),
    q: String(opts.q ?? 50),
    fm: opts.fm ?? "webp",
  });
  if (opts.h) params.set("h", String(opts.h));
  if (opts.fit) params.set("fit", opts.fit);
  return `${url}?${params}`;
}

/** Builds a srcset string across several widths, holding aspect ratio fixed via `ratio` (h/w) when given. */
export function ctfSrcSet(
  url: string,
  widths: number[],
  opts: Omit<CtfImageOptions, "w" | "h"> & { ratio?: number } = {}
): string {
  const { ratio, ...rest } = opts;
  return widths
    .map((w) => `${ctf(url, { ...rest, w, h: ratio ? Math.round(w * ratio) : undefined })} ${w}w`)
    .join(", ");
}

/** Injects a Cloudinary transform segment into a /upload/ URL. */
export function cld(secureUrl: string, transform: string): string {
  return secureUrl.replace("/upload/", `/upload/${transform}/`);
}

export function cldSrcSet(secureUrl: string, widths: number[], ratio?: number): string {
  return widths
    .map((w) => {
      const h = ratio ? Math.round(w * ratio) : undefined;
      const transform = ["f_webp", "q_auto", "c_fill", "g_auto", `w_${w}`, h ? `h_${h}` : null]
        .filter(Boolean)
        .join(",");
      return `${cld(secureUrl, transform)} ${w}w`;
    })
    .join(", ");
}
