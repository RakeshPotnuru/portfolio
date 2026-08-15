# itsrakesh.com

Rakesh Potnuru's portfolio site — blog, projects, snippets, and about pages, statically
generated with [Astro](https://astro.build) and content sourced from [Contentful](https://www.contentful.com).

## Stack

- **Astro** for routing, static site generation, and the content layer
- **React** for the handful of interactive pieces (contact form, subscribe form, project
  carousel/video, donation dialog) — everything else ships zero JavaScript
- **Tailwind CSS v4** + [shadcn/ui](https://ui.shadcn.com) primitives
- **Contentful** as the CMS, loaded at build time via a custom [Content Layer](https://docs.astro.build/en/guides/content-collections/) loader (`src/loaders/contentful.ts`)

## Local development

```bash
pnpm install
```

Copy `.env.example` to `.env.development` and fill in:

| Variable | Purpose |
|---|---|
| `CONTENTFUL_SPACE_ID` / `CONTENTFUL_ACCESS_TOKEN` | Content Delivery API access, read at build time |
| `PUBLIC_BACKEND_URL` | Backend that receives contact-form and subscribe submissions |
| `GA_MEASUREMENT_ID` | Google Analytics; analytics is skipped entirely when unset |
| `CLOUDINARY_CLOUD_NAME` | Serves blog post cover images |

```bash
pnpm dev        # dev server on :3000
pnpm build      # static build to dist/
pnpm preview    # serve the production build locally
pnpm typecheck  # astro check
```

## Deployment

Deployed on Netlify (`netlify.toml`); build command `pnpm build`, publish directory `dist`.
