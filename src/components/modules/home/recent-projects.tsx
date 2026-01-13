import { Link } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/reusables/button";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";

import { ProjectItem } from "../projects/project/project-item";

export default function RecentProjects({
  projects,
}: Readonly<{
  projects: Queries.HomePageQuery["allContentfulProject"];
}>) {
  return (
    <div className="space-y-16">
      <Row className="justify-between">
        <Heading level={2}>Recent Projects</Heading>
        <Link to={siteConfig.pages.projects.link}>
          <Button>View All</Button>
        </Link>
      </Row>
      <div className="gap-10 grid md:grid-cols-2">
        {projects.nodes.map((project) => (
          <ProjectItem
            key={project.id}
            title={project.title ?? ""}
            slug={project.slug ?? ""}
            url={project.url ?? ""}
            image={project.images![0]?.gatsbyImageData as IGatsbyImageData}
            launchedAt={project.launchedAt ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
