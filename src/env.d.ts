/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Contentful space, read at build time by the content loaders. */
  readonly CONTENTFUL_SPACE_ID: string;
  /** Contentful Content Delivery API token, build time only. */
  readonly CONTENTFUL_ACCESS_TOKEN: string;
  /** Google Analytics measurement id; analytics is skipped when unset. */
  readonly GA_MEASUREMENT_ID?: string;
  /** Cloudinary account that serves blog cover images. */
  readonly CLOUDINARY_CLOUD_NAME: string;
  /** Backend that receives contact and subscribe submissions, called from the browser. */
  readonly PUBLIC_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
