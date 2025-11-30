import { BLOCKS, Node } from "@contentful/rich-text-types";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";

import { Icons } from "@/assets/icons";
import Col from "@/components/ui/col";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/reusables/badge";
import { Button } from "@/components/ui/reusables/button";
import Row from "@/components/ui/row";

export default function Body({
  contentfulProject,
}: Queries.ProjectBySlugQuery) {
  const { title, url, techStack, body } = contentfulProject!;

  return (
    <Col className="items-start space-y-8">
      <Row className="justify-between w-full items-start flex-col md:flex-row gap-4">
        <Heading level={1}>{title}</Heading>
        <a
          href={url!}
          target="_blank"
          className="w-full md:w-auto"
          rel="noreferrer"
        >
          <Button variant={"secondary"} className="w-full">
            <Icons.ExternalLink /> Visit
          </Button>
        </a>
      </Row>
      {techStack?.length && (
        <Row className="flex-wrap gap-2 text-muted-foreground">
          Tech Stack:
          {techStack.map((item) => (
            <Badge key={item?.id} variant={"secondary"} className="text-sm">
              <GatsbyImage
                image={item?.icon?.gatsbyImageData as IGatsbyImageData}
                alt={item?.title!}
                className="w-4 h-4 mr-1"
              />
              {item?.title}
            </Badge>
          ))}
        </Row>
      )}
      <div className="space-y-2 whitespace-pre-wrap">
        {body?.raw && renderRichText(body, options)}
      </div>
    </Col>
  );
}

export const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
      const { gatsbyImage, description } = node.data.target;
      return (
        <GatsbyImage
          image={getImage(gatsbyImage) as IGatsbyImageData}
          alt={description}
        />
      );
    },
  },
};
