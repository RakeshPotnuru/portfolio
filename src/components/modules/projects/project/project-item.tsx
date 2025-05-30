import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

import { Icons } from "@/assets/icons";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/reusables/button";
import { siteConfig } from "@/config/site";

interface ProjectItemProps {
  title: string;
  slug: string;
  url: string;
  image: IGatsbyImageData;
}

export function ProjectItem({
  title,
  image,
  slug,
  url,
}: Readonly<ProjectItemProps>) {
  return (
    <div className="border rounded-xl">
      <Link to={`${siteConfig.pages.projects.link}/${slug}`}>
        <GatsbyImage
          image={image}
          alt={title}
          className="rounded-t-xl hover:opacity-80"
        />
      </Link>
      <Heading level={4} className="p-2 px-4">
        {title}
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
