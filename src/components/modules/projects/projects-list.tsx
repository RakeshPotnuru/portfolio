import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useState } from "react";

import { Icons } from "@/assets/icons";
import { ProjectItem } from "@/components/modules/projects/project/project-item";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/reusables/button";
import Row from "@/components/ui/row";

export default function ProjectsList({
  allContentfulProject,
  allContentfulTechnology,
}: Queries.ProjectsPageQuery) {
  const [projects, setProjects] = useState<
    Queries.ProjectsPageQuery["allContentfulProject"]["nodes"]
  >(allContentfulProject.nodes);
  const [selectedTech, setSelectedTech] = useState<string>();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const handleClick = (ids: string[]) => {
    if (ids.length === 0) {
      setProjects(allContentfulProject.nodes);
      return;
    }
    setProjects(
      allContentfulProject.nodes.filter((item) => ids.includes(item.id))
    );
  };

  return (
    <div className="space-y-16">
      <Row className="justify-between">
        <Heading level={1}>Projects</Heading>
        <Button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          variant={"outline"}
        >
          <Icons.Filter /> Filter
        </Button>
      </Row>
      <div className="space-y-6">
        {isFilterOpen && (
          <div className="flex flex-wrap gap-2">
            {projects.length !== allContentfulProject.nodes.length && (
              <Button
                onClick={() => handleClick([])}
                variant={"outline"}
                size={"sm"}
                className="text-sm"
              >
                All ({allContentfulProject.nodes.length})
              </Button>
            )}{" "}
            {allContentfulTechnology.nodes.map((item) => (
              <Button
                onClick={() => {
                  handleClick(
                    item?.project?.map((project) => project!.id) ?? []
                  );
                  setSelectedTech(item.title!);
                }}
                key={item?.id}
                variant={"secondary"}
                size={"sm"}
                className="text-sm"
                disabled={selectedTech === item?.title}
              >
                <GatsbyImage
                  image={item?.icon?.gatsbyImageData as IGatsbyImageData}
                  alt={item?.title!}
                  className="w-4 h-4 rounded-[3px] mr-1"
                />
                {item?.title} ({item?.project?.length})
              </Button>
            ))}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              title={project.title!}
              image={project.images![0]?.gatsbyImageData as IGatsbyImageData}
              slug={project.slug!}
              url={project.url!}
              tags={project.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
