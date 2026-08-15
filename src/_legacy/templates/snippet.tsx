import { graphql, PageProps } from "gatsby";
import React from "react";

import Body from "@/components/common/body";
import CommentBox from "@/components/common/comment-box";
import DonationBox from "@/components/common/donation-box";
import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import { Heading } from "@/components/ui/heading";
import { siteConfig } from "@/config/site";

export default function SnippetTemplate({
  data,
  location,
}: PageProps<Queries.SnippetBySlugQuery>) {
  return (
    <Layout location={location} className="justify-center flex">
      <article>
        <Heading level={1} className="text-foreground leading-tight">
          {data.contentfulSnippet?.title}
        </Heading>
        <Body content={data.contentfulSnippet?.body?.body!} />
        <hr />
        <div className="not-prose space-y-16">
          <DonationBox />
          <CommentBox />
        </div>
      </article>
    </Layout>
  );
}

export function Head({ data }: PageProps<Queries.SnippetBySlugQuery>) {
  const { title, slug, description } = data.contentfulSnippet!;

  return (
    <Seo
      title={title!}
      description={description!}
      pathname={`${siteConfig.pages.blog.link}/${slug}`}
      ogType="article"
    />
  );
}

export const pageQuery = graphql`
  query SnippetBySlug($slug: String!) {
    contentfulSnippet(slug: { eq: $slug }) {
      body {
        body
      }
      slug
      tags
      title
      description
    }
  }
`;
