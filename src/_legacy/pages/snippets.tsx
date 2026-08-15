import { graphql, PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import SnippetsList from "@/components/modules/snippets/snippets-list";
import { siteConfig } from "@/config/site";

export default function TestPage({
  location,
  data,
}: PageProps<Queries.SnippetPageQuery>) {
  return (
    <Layout location={location}>
      <SnippetsList allContentfulSnippet={data.allContentfulSnippet} />
    </Layout>
  );
}

export function Head() {
  return (
    <Seo
      title={siteConfig.pages.snippets.title}
      description={siteConfig.pages.snippets.description}
      pathname={siteConfig.pages.snippets.link}
    />
  );
}

export const pageQuery = graphql`
  query SnippetPage {
    allContentfulSnippet(sort: [{ createdAt: DESC }]) {
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
