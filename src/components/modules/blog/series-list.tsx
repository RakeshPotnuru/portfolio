import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import Col from "@/components/ui/col";
import { Heading } from "@/components/ui/heading";
import { AspectRatio } from "@/components/ui/reusables/aspect-ratio";
import { siteConfig } from "@/config/site";
import { shortenText } from "@/utils/shorten-text";

export default function SeriesList({
  nodes,
}: Queries.BlogPageQuery["allContentfulBlogSeries"]) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nodes.map((series) => (
        <SeriesItem key={series.id} {...series} />
      ))}
    </div>
  );
}

function SeriesItem({
  title,
  slug,
  cover,
  description,
}: Queries.BlogPageQuery["allContentfulBlogSeries"]["nodes"][number]) {
  return (
    <Link to={`${siteConfig.pages.series.link}/${slug}`}>
      <Col className="rounded-xl border hover:opacity-80 h-full items-start">
        <AspectRatio ratio={16 / 9} className="relative">
          <GatsbyImage
            image={cover?.gatsbyImageData!}
            alt={title!}
            className="rounded-t-xl h-full w-full object-cover"
          />
        </AspectRatio>
        <Col className="space-y-2 p-4 items-start">
          <Heading level={6}>{title}</Heading>
          <p className="text-sm text-muted-foreground">
            {shortenText(description!, 160)}
          </p>
        </Col>
      </Col>
    </Link>
  );
}
