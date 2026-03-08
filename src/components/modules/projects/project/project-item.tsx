import { format } from "date-fns";
import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

import { Icons } from "@/assets/icons";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/reusables/badge";
import { Button } from "@/components/ui/reusables/button";
import { siteConfig } from "@/config/site";

interface ProjectItemProps {
  title: string;
  slug: string;
  url: string;
  image: IGatsbyImageData;
  tags?: readonly (string | null)[] | null;
  launchedAt: string;
}

export function ProjectItem({
  title,
  image,
  slug,
  url,
  tags,
  launchedAt,
}: Readonly<ProjectItemProps>) {
  return (
    <Link to={`${siteConfig.pages.projects.link}/${slug}`} className="group relative aspect-[3/2] rounded-xl overflow-hidden block">
      <GatsbyImage
        image={image}
        alt={title}
        className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {tags && (
        <Badge
          variant={"secondary"}
          className="absolute top-3 right-3 shadow-sm backdrop-blur-sm"
        >
          {tags[0]}
        </Badge>
      )}
      <div className="absolute bottom-0 inset-x-0 p-4 space-y-3">
        <div>
          <Heading level={4} className="text-white">
            {title}
          </Heading>
          <time
            dateTime={launchedAt}
            className="text-xs text-white/70"
          >
            {format(new Date(launchedAt), "MMM d, yyyy")}
          </time>
        </div>
        <div className="flex gap-2">
          <Button
            size={"sm"}
            variant={"secondary"}
            className="backdrop-blur-sm"
          >
            <Icons.Read /> Learn More
          </Button>
          <a href={url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
            <Button
              size={"sm"}
              variant={"secondary"}
              className="backdrop-blur-sm"
            >
              <Icons.ExternalLink /> Visit
            </Button>
          </a>
        </div>
      </div>
    </Link>
  );
}
