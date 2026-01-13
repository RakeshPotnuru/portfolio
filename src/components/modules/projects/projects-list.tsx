import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useMemo, useState } from "react";

import { Icons } from "@/assets/icons";
import { ProjectItem } from "@/components/modules/projects/project/project-item";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/reusables/button";
import Row from "@/components/ui/row";

export default function ProjectsList({
  allContentfulProject,
  allContentfulTechnology,
}: Queries.ProjectsPageQuery) {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);

  const projects = useMemo(() => {
    if (selectedTechs.length === 0) {
      return allContentfulProject.nodes;
    }

    const selectedTechNodes = allContentfulTechnology.nodes.filter((node) =>
      selectedTechs.includes(node.title!)
    );

    const projectIds = new Set<string>();
    selectedTechNodes.forEach((tech) => {
      tech.project?.forEach((p) => {
        if (p?.id) projectIds.add(p.id);
      });
    });

    return allContentfulProject.nodes.filter((project) =>
      projectIds.has(project.id)
    );
  }, [allContentfulProject, allContentfulTechnology, selectedTechs]);

  const toggleTech = (title: string) => {
    setSelectedTechs((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const technologiesByType = allContentfulTechnology.nodes.reduce(
    (acc, item) => {
      const types = item.type;
      if (Array.isArray(types) && types.length > 0) {
        types.forEach((t) => {
          if (t) {
            if (!acc[t]) acc[t] = [];
            acc[t].push(item);
          }
        });
      } else {
        if (!acc["Others"]) acc["Others"] = [];
        acc["Others"].push(item);
      }
      return acc;
    },
    {} as Record<string, (typeof allContentfulTechnology.nodes)[number][]>
  );

  const sortedTypes = Object.keys(technologiesByType).sort((a, b) => {
    if (a === "Others") return 1;
    if (b === "Others") return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-16">
      <Row className="justify-between">
        <Heading level={1}>Projects</Heading>
        <Button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          variant={isFilterOpen ? "secondary" : "outline"}
        >
          <Icons.Filter /> Filter
        </Button>
      </Row>
      <div className="space-y-6">
        {isFilterOpen && (
          <div className="space-y-4">
            <Heading level={6}>Filter</Heading>
            {selectedTechs.length > 0 && (
              <Button
                onClick={() => setSelectedTechs([])}
                variant={"outline"}
                size={"sm"}
                className="text-sm"
              >
                All ({allContentfulProject.nodes.length})
              </Button>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sortedTypes.map((type) => (
                <div key={type} className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {type}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technologiesByType[type].map((item) => {
                      const isSelected = selectedTechs.includes(item.title!);
                      return (
                        <Button
                          onClick={() => toggleTech(item.title!)}
                          key={item?.id}
                          variant={isSelected ? "secondary" : "outline"}
                          size={"sm"}
                          className="text-sm"
                        >
                          <GatsbyImage
                            image={
                              item?.icon?.gatsbyImageData as IGatsbyImageData
                            }
                            alt={item?.title!}
                            className="w-4 h-4 rounded-[3px] mr-1"
                          />
                          {item?.title} ({item?.project?.length})
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
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
              launchedAt={project.launchedAt!}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
