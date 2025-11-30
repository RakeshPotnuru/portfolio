import { graphql, PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import Intro from "@/components/modules/about/intro";
import Timeline from "@/components/modules/about/timeline";
import { Heading } from "@/components/ui/heading";
import { siteConfig } from "@/config/site";

export default function AboutPage({
  location,
  data: { allContentfulTimeline },
}: PageProps<Queries.AboutPageQuery>) {
  return (
    <Layout location={location} className="space-y-16">
      <Heading level={1}>About Me</Heading>
      <Intro />
      <Timeline
        group={
          allContentfulTimeline.group as unknown as {
            nodes: Queries.ContentfulTimeline[];
            fieldValue: string;
          }[]
        }
      />
    </Layout>
  );
}

export function Head() {
  return (
    <Seo
      title={siteConfig.pages.about.title}
      description={siteConfig.pages.about.description}
      pathname={siteConfig.pages.about.link}
    />
  );
}

export const pageQuery = graphql`
  query AboutPage {
    allContentfulTimeline(sort: { endDate: DESC }) {
      group(field: { type: SELECT }) {
        nodes {
          company
          id
          logo {
            gatsbyImageData(placeholder: BLURRED)
          }
          startDate(formatString: "MMM, YYYY")
          tag
          title
          endDate(formatString: "MMM, YYYY")
          description {
            raw
          }
        }
        fieldValue
      }
    }
  }
`;
