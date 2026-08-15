import { graphql, PageProps } from "gatsby";
import React from "react";

import Body from "@/components/common/body";
import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import Footer from "@/components/modules/blog/post/footer";
import Header from "@/components/modules/blog/post/header";
import Sidebar from "@/components/modules/blog/post/sidebar";
import { siteConfig } from "@/config/site";

export default function PostTemplate({
  data,
  location,
}: PageProps<Queries.PostBySlugQuery>) {
  return (
    <Layout location={location} className="justify-center flex gap-10">
      <article>
        <Header post={data.contentfulBlogPost} />
        <Body content={data.contentfulBlogPost?.body?.body!} />
        <hr />
        <Footer post={data.contentfulBlogPost} />
      </article>
      <div className="hidden lg:block">
        <Sidebar
          content={data.contentfulBlogPost?.body?.body!}
          href={location.href}
        />
      </div>
    </Layout>
  );
}

export function Head({ data }: PageProps<Queries.PostBySlugQuery>) {
  const { title, slug, cover, canonical, description } =
    data.contentfulBlogPost!;

  return (
    <Seo
      title={title!}
      description={description!}
      imageUrl={cover?.[0]?.url!}
      pathname={`${siteConfig.pages.blog.link}/${slug}`}
      canonicalUrl={canonical ?? undefined}
      ogType="article"
    />
  );
}

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      canonical
      body {
        body
      }
      publishedAt
      description
      cover {
        gatsbyImageData(placeholder: BLURRED)
        url
      }
      isFeatured
      slug
      isSponsored
      tags
      title
      updatedAt
      recommendedPosts {
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
