import { graphql, PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import Body from "@/components/modules/projects/project/body";
import Header from "@/components/modules/projects/project/header";
import { siteConfig } from "@/config/site";

export default function ProjectTemplate({
  location,
  data,
}: Readonly<PageProps<Queries.ProjectBySlugQuery>>) {
  const { images, videoDemoUrl } = data.contentfulProject!;

  return (
    <Layout location={location} className="justify-center flex">
      <article className="flex flex-col gap-10">
        <Header images={images} videoDemoUrl={videoDemoUrl} />
        <Body contentfulProject={data.contentfulProject} />
      </article>
    </Layout>
  );
}

export function Head({ data }: PageProps<Queries.ProjectBySlugQuery>) {
  const { title, slug, images } = data.contentfulProject!;

  return (
    <Seo
      title={title!}
      image={images![0]?.publicUrl}
      pathname={`${siteConfig.pages.projects.link}/${slug}`}
      ogType="article"
    />
  );
}

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      slug
      title
      url
      videoDemoUrl
      techStack {
        id
        title
        icon {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      body {
        raw
      }
      images {
        gatsbyImageData
        publicUrl
      }
      launchedAt
    }
  }
`;
