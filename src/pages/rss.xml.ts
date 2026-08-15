import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

import { siteMetadata } from "@/config/site";

export const GET: APIRoute = async (context) => {
  const posts = await getCollection("posts", ({ data }) => !!data.publishedAt);
  const sorted = posts.sort(
    (a, b) => new Date(b.data.publishedAt!).getTime() - new Date(a.data.publishedAt!).getTime()
  );

  return rss({
    title: "Rakesh's Blog",
    description: siteMetadata.description,
    site: context.site!,
    trailingSlash: false,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? post.data.excerpt ?? "",
      pubDate: new Date(post.data.publishedAt!),
      // Gatsby's feed built this as `${siteUrl}/${slug}`, omitting /blog —
      // confirmed in the pre-migration build's rss.xml (Phase 0 baseline).
      link: `/blog/${post.id}`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language><atom:link href="${siteMetadata.feedUrl}" rel="self" type="application/rss+xml"/>`,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
  });
};
