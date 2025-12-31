import { graphql, Link, PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import PostsList from "@/components/modules/blog/posts-list";
import SeriesList from "@/components/modules/blog/series-list";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/reusables/button";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";

export default function BlogPage({
  location,
  data,
}: PageProps<Queries.BlogPageQuery>) {
  return (
    <Layout location={location} className="space-y-16">
      <Heading level={1}>Blog</Heading>
      <div className="space-y-8">
        <Row className="justify-between">
          <Heading level={3}>Series</Heading>
          <Link to={siteConfig.pages.series.link}>
            <Button>View All</Button>
          </Link>
        </Row>
        <SeriesList nodes={data.allContentfulBlogSeries.nodes} />
      </div>
      <PostsList nodes={data.allContentfulBlogPost.nodes} />
    </Layout>
  );
}

export function Head() {
  return (
    <Seo
      title={siteConfig.pages.blog.title}
      description={siteConfig.pages.blog.description}
      pathname={siteConfig.pages.blog.link}
    />
  );
}

export const pageQuery = graphql`
  query BlogPage {
    allContentfulBlogPost(
      sort: [{ publishedAt: DESC }]
      filter: { publishedAt: { ne: null } }
    ) {
      nodes {
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
    allContentfulBlogSeries(limit: 3) {
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
