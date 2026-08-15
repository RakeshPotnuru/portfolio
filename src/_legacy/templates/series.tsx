import { graphql, PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import Series from "@/components/modules/blog/series";
import { siteConfig } from "@/config/site";

export default function SeriesTemplate({
  data,
  location,
}: PageProps<Queries.SeriesBySlugQuery>) {
  return (
    <Layout location={location}>
      <Series contentfulBlogSeries={data.contentfulBlogSeries} />
    </Layout>
  );
}

export function Head({ data }: PageProps<Queries.SeriesBySlugQuery>) {
  const { title, slug, cover, description } = data.contentfulBlogSeries!;

  return (
    <Seo
      title={title!}
      description={description!}
      imageUrl={cover?.publicUrl}
      pathname={`${siteConfig.pages.series.link}/${slug}`}
    />
  );
}

export const pageQuery = graphql`
  query SeriesBySlug($slug: String!) {
    contentfulBlogSeries(slug: { eq: $slug }) {
      description
      cover {
        gatsbyImageData(placeholder: BLURRED)
        publicUrl
      }
      slug
      title
      updatedAt
      posts {
        id
        slug
        title
        cover {
          gatsbyImageData(placeholder: BLURRED)
        }
        isFeatured
        excerpt
        tags
        publishedAt
      }
    }
  }
`;
