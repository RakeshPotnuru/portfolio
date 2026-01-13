import { graphql, PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import ProjectsList from "@/components/modules/projects/projects-list";
import { siteConfig } from "@/config/site";

export default function ProjectsPage({
  location,
  data,
}: Readonly<PageProps<Queries.ProjectsPageQuery>>) {
  return (
    <Layout location={location}>
      <ProjectsList
        allContentfulProject={data.allContentfulProject}
        allContentfulTechnology={data.allContentfulTechnology}
      />
    </Layout>
  );
}

export function Head() {
  return (
    <Seo
      title={siteConfig.pages.projects.title}
      description={siteConfig.pages.projects.description}
      pathname={siteConfig.pages.projects.link}
    />
  );
}

export const pageQuery = graphql`
  query ProjectsPage {
    allContentfulProject(sort: { launchedAt: DESC }) {
      nodes {
        id
        slug
        title
        url
        images {
          gatsbyImageData(placeholder: BLURRED)
        }
        tags
        launchedAt
      }
    }
    allContentfulTechnology {
      nodes {
        title
        project {
          id
        }
        icon {
          gatsbyImageData(placeholder: BLURRED)
        }
        id
        type
      }
    }
  }
`;
