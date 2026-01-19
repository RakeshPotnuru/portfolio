import { graphql, PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import Hero from "@/components/modules/home/hero";
import LatestBlogPosts from "@/components/modules/home/latest-blog-posts";
import LatestSnippets from "@/components/modules/home/latest-snippets";
import RecentProjects from "@/components/modules/home/recent-projects";
import WhyHireMe from "@/components/modules/home/why-hire-me";

export default function HomePage({
  location,
  data,
}: Readonly<PageProps<Queries.HomePageQuery>>) {
  return (
    <Layout location={location} className="space-y-20">
      <Hero />
      <RecentProjects projects={data.allContentfulProject} />
      <LatestBlogPosts nodes={data.allContentfulBlogPost.nodes} />
      {/* <ExploreTools /> */}
      <LatestSnippets nodes={data.allContentfulSnippet.nodes} />
      <WhyHireMe />
    </Layout>
  );
}

export function Head() {
  return <Seo />;
}

export const pageQuery = graphql`
  query HomePage {
    allContentfulProject(limit: 2, sort: { launchedAt: DESC }) {
      nodes {
        id
        slug
        title
        images {
          gatsbyImageData(placeholder: BLURRED)
        }
        url
        launchedAt
      }
    }
    allContentfulBlogPost(limit: 2, sort: [{ publishedAt: DESC }]) {
      nodes {
        id
        slug
        title
        cover {
          gatsbyImageData(placeholder: BLURRED)
        }
        tags
        excerpt
        isFeatured
        publishedAt
      }
    }
    allContentfulSnippet(limit: 3, sort: [{ createdAt: DESC }]) {
      nodes {
        id
        slug
        title
        tags
        description
        createdAt
      }
    }
  }
`;
