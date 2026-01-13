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
    <div className="border rounded-xl relative">
      <Link to={`${siteConfig.pages.projects.link}/${slug}`}>
        <GatsbyImage
          image={image}
          alt={title}
          className="rounded-t-xl hover:opacity-80"
        />
      </Link>
      {tags && (
        <Badge variant={"secondary"} className="absolute top-2 right-2">
          {tags[0]}
        </Badge>
      )}
      <Heading level={4} className="p-2 px-4 flex justify-between items-center">
        {title}{" "}
        <time dateTime={launchedAt} className="text-sm text-muted-foreground">
          {format(new Date(launchedAt), "MMM d, yyyy")}
        </time>
      </Heading>
      <div className="grid grid-cols-2 divide-x border-t">
        <Link to={`${siteConfig.pages.projects.link}/${slug}`}>
          <Button
            variant={"ghost"}
            className="w-full rounded-none rounded-bl-xl"
          >
            <Icons.Read /> Learn More
          </Button>
        </Link>
        <a href={url} target="_blank" rel="noreferrer">
          <Button
            variant={"ghost"}
            className="w-full rounded-none rounded-br-xl"
          >
            <Icons.ExternalLink /> Visit
          </Button>
        </a>
      </div>
    </div>
  );
}
