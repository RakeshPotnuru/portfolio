import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import type { Document } from "@contentful/rich-text-types";

import { contentfulLoader } from "@/loaders/contentful";
import { asset, cloudinaryImage, entryId } from "@/loaders/transforms";

const assetSchema = z.object({
  url: z.string(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  title: z.string(),
  description: z.string(),
  contentType: z.string(),
});

const cloudinaryImageSchema = z.object({
  secureUrl: z.string(),
  publicId: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.string(),
});

// Contentful rich text is a plain JSON document; validated structurally
// rather than field-by-field since @contentful/rich-text-html-renderer
// (Phase 5) consumes the whole tree.
const richTextSchema = z.custom<Document>(
  (v) => !!v && typeof v === "object" && "nodeType" in (v as object)
);

const posts = defineCollection({
  loader: contentfulLoader({
    contentType: "blogPost",
    order: ["-fields.publishedAt"],
    idOf: (e) => String(e.fields.slug),
    markdownField: "body",
    transform: (e) => ({
      title: e.fields.title,
      slug: e.fields.slug,
      description: e.fields.description ?? null,
      excerpt: e.fields.excerpt ?? null,
      canonical: e.fields.canonical ?? null,
      tags: e.fields.tags ?? [],
      isFeatured: Boolean(e.fields.isFeatured),
      isSponsored: Boolean(e.fields.isSponsored),
      publishedAt: e.fields.publishedAt ?? null,
      updatedAt: e.sys.updatedAt,
      // Every observed entry has exactly one cover image; Gatsby's own
      // code read cover?.[0], so the array shape is kept for parity.
      cover: (
        (e.fields.cover as unknown[] | undefined) ?? []
      ).map(cloudinaryImage).filter((c): c is NonNullable<typeof c> => c !== null),
      recommendedPosts: (
        (e.fields.recommendedPosts as import("contentful").Entry[] | undefined) ?? []
      )
        .map((p) => entryId(p, "slug"))
        .filter((id): id is string => id !== null),
    }),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().nullable(),
    excerpt: z.string().nullable(),
    canonical: z.string().nullable(),
    tags: z.array(z.string()),
    isFeatured: z.boolean(),
    isSponsored: z.boolean(),
    publishedAt: z.string().nullable(),
    updatedAt: z.string(),
    cover: z.array(cloudinaryImageSchema),
    recommendedPosts: z.array(reference("posts")),
  }),
});

const series = defineCollection({
  loader: contentfulLoader({
    contentType: "blogSeries",
    order: ["-sys.updatedAt"],
    idOf: (e) => String(e.fields.slug),
    transform: (e) => ({
      title: e.fields.title,
      slug: e.fields.slug,
      description: e.fields.description ?? null,
      cover: asset(e.fields.cover as import("contentful").Asset | undefined),
      updatedAt: e.sys.updatedAt,
      posts: (
        (e.fields.posts as import("contentful").Entry[] | undefined) ?? []
      )
        .map((p) => entryId(p, "slug"))
        .filter((id): id is string => id !== null),
    }),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().nullable(),
    cover: assetSchema.nullable(),
    updatedAt: z.string(),
    posts: z.array(reference("posts")),
  }),
});

const snippets = defineCollection({
  loader: contentfulLoader({
    contentType: "snippet",
    order: ["-sys.createdAt"],
    idOf: (e) => String(e.fields.slug),
    markdownField: "body",
    transform: (e) => ({
      title: e.fields.title,
      slug: e.fields.slug,
      description: e.fields.description ?? null,
      tags: e.fields.tags ?? [],
      createdAt: e.sys.createdAt,
    }),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().nullable(),
    tags: z.array(z.string()),
    createdAt: z.string(),
  }),
});

// Contentful's content-type id is "projectPage" (the "project" id belongs
// to another, unrelated content type in this space); the collection itself
// is still named "projects" to match the site's /projects routes.
const projects = defineCollection({
  loader: contentfulLoader({
    contentType: "projectPage",
    order: ["-fields.launchedAt"],
    idOf: (e) => String(e.fields.slug),
    transform: (e) => ({
      title: e.fields.title,
      slug: e.fields.slug,
      url: e.fields.url,
      videoDemoUrl: e.fields.videoDemoUrl ?? null,
      body: e.fields.body ?? null,
      images: (
        (e.fields.images as import("contentful").Asset[] | undefined) ?? []
      )
        .map(asset)
        .filter((a): a is NonNullable<typeof a> => a !== null),
      // Two published projects currently have no techStack entries.
      techStack: (
        (e.fields.techStack as import("contentful").Entry[] | undefined) ?? []
      )
        .map((t) => entryId(t))
        .filter((id): id is string => id !== null),
      launchedAt: e.fields.launchedAt,
      tags: e.fields.tags ?? [],
    }),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    url: z.string(),
    videoDemoUrl: z.string().nullable(),
    body: richTextSchema.nullable(),
    images: z.array(assetSchema),
    techStack: z.array(reference("technologies")),
    launchedAt: z.string(),
    tags: z.array(z.string()),
  }),
});

// technology has no slug field, and no back-reference to projectPage despite
// Gatsby's GraphQL layer exposing one (`technology.project`) — that was a
// Gatsby-inferred reverse link with no Contentful Content Delivery API
// equivalent. The project <-> technology filter in projects-list is
// rebuilt at render time in Phase 5 by scanning projects.techStack instead.
const technologies = defineCollection({
  loader: contentfulLoader({
    contentType: "technology",
    transform: (e) => ({
      title: e.fields.title,
      type: e.fields.type ?? [],
      icon: asset(e.fields.icon as import("contentful").Asset | undefined),
    }),
  }),
  schema: z.object({
    title: z.string(),
    type: z.array(z.string()),
    icon: assetSchema.nullable(),
  }),
});

const timeline = defineCollection({
  loader: contentfulLoader({
    contentType: "timeline",
    // Matches Gatsby's `allContentfulTimeline(sort: { endDate: DESC })` exactly —
    // no secondary key, so ordering of null-endDate (ongoing) entries is
    // whatever Contentful's CDA does with nulls; verified against the live
    // /about page in Phase 5.
    order: ["-fields.endDate"],
    transform: (e) => ({
      type: e.fields.type,
      title: e.fields.title,
      company: e.fields.company,
      tag: e.fields.tag ?? null,
      startDate: e.fields.startDate,
      endDate: e.fields.endDate ?? null,
      description: e.fields.description ?? null,
      logo: asset(e.fields.logo as import("contentful").Asset | undefined),
    }),
  }),
  schema: z.object({
    type: z.string(),
    title: z.string(),
    company: z.string(),
    tag: z.string().nullable(),
    startDate: z.string(),
    endDate: z.string().nullable(),
    description: richTextSchema.nullable(),
    logo: assetSchema.nullable(),
  }),
});

const clients = defineCollection({
  loader: contentfulLoader({
    contentType: "pastClient",
    transform: (e) => ({
      name: e.fields.name,
      logo: asset(e.fields.logo as import("contentful").Asset | undefined),
    }),
  }),
  schema: z.object({
    name: z.string(),
    logo: assetSchema.nullable(),
  }),
});

export const collections = {
  posts,
  series,
  snippets,
  projects,
  technologies,
  timeline,
  clients,
};
