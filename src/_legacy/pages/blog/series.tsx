import { graphql, PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import SeriesList from "@/components/modules/blog/series-list";
import { Heading } from "@/components/ui/heading";
import { siteConfig } from "@/config/site";

export default function SeriesPage({
  location,
  data,
}: PageProps<Queries.BlogPageQuery>) {
  return (
    <Layout location={location} className="space-y-16">
      <Heading level={1}>Blog</Heading>
      <div className="space-y-8">
        <Heading level={3}>Series</Heading>
        <SeriesList nodes={data.allContentfulBlogSeries.nodes} />
      </div>
    </Layout>
  );
}

export function Head() {
  return (
    <Seo
      title={siteConfig.pages.series.title}
      description={siteConfig.pages.series.description}
      pathname={siteConfig.pages.series.link}
    />
  );
}

export const pageQuery = graphql`
  query SeriesPage {
    allContentfulBlogSeries(sort: { updatedAt: DESC }) {
      nodes {
        id
        slug
        title
        description
        cover {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  }
`;
