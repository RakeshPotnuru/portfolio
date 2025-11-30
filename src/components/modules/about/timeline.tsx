import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";

import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/reusables/badge";
import Row from "@/components/ui/row";
import { cn } from "@/utils/cn";

import { options } from "../projects/project/body";

export default function Timeline({
  group,
}: {
  group: { nodes: Queries.ContentfulTimeline[]; fieldValue: string }[];
}) {
  return group.reverse().map(({ nodes, fieldValue }, i) => (
    <div key={fieldValue} className="space-y-8">
      <Heading level={3}>{fieldValue}</Heading>

      <ol
        className={cn("relative border-s", {
          // "border-none": i === group.length - 1,
        })}
      >
        {nodes.map((item) => (
          <ExpItem key={item.id} {...item} />
        ))}
      </ol>
    </div>
  ));
}

function ExpItem({
  logo,
  company,
  description,
  startDate,
  title,
  endDate,
  tag,
}: Queries.ContentfulTimeline) {
  return (
    <li className="mb-10 ms-12">
      <span className="absolute flex items-center justify-center rounded-full -start-8">
        <GatsbyImage
          image={logo?.gatsbyImageData as IGatsbyImageData}
          alt={company!}
          className="rounded-full w-16 h-16 bg-background border"
        />
      </span>
      <p className="block mb-2 text-sm font-normal leading-none text-muted-foreground">
        <time dateTime={startDate!}>{startDate}</time> -{" "}
        {endDate ? <time dateTime={endDate}>{endDate}</time> : "Present"}
      </p>
      <Heading level={4} className="mb-1">
        {title}
      </Heading>
      <Row>
        <p>{company}</p>
        {tag && (
          <Badge variant={"secondary"} className="ml-2">
            {tag}
          </Badge>
        )}
      </Row>
      {description && (
        <div className="space-y-2 whitespace-pre-wrap">
          {description?.raw && renderRichText(description, options)}
        </div>
      )}
    </li>
  );
}
