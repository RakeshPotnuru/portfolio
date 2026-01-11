import { format } from "date-fns";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import Col from "@/components/ui/col";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/reusables/badge";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";
import { shortenText } from "@/utils/shorten-text";

interface PostItemProps
  extends Pick<
    Queries.BlogPageQuery["allContentfulBlogPost"]["nodes"][number],
    | "excerpt"
    | "cover"
    | "slug"
    | "tags"
    | "title"
    | "isFeatured"
    | "publishedAt"
  > {
  isSeries?: boolean;
}

export function PostItem({
  title,
  cover,
  excerpt,
  tags,
  slug,
  isFeatured,
  publishedAt,
  isSeries,
}: PostItemProps) {
  return (
    <Link to={`${siteConfig.pages.blog.link}/${slug}`}>
      <Col
        className={cn("rounded-xl border hover:opacity-80 h-full items-start", {
          "md:flex-row md:items-start md:h-full": isSeries,
        })}
      >
        <div
          className={cn("relative", {
            "md:basis-2/5 md:h-full": isSeries,
          })}
        >
          <GatsbyImage
            image={cover?.[0]?.gatsbyImageData!}
            alt={title!}
            className={cn("rounded-t-xl object-cover aspect-video", {
              "md:rounded-none md:rounded-l-xl md:aspect-auto md:h-full":
                isSeries,
            })}
          />
          {isFeatured && (
            <Badge className="uppercase absolute right-2 top-2 bg-gradient-to-l from-[#7928CA] to-[#FF0080]">
              Featured
            </Badge>
          )}
        </div>
        <Col
          className={cn("space-y-2 p-4 items-start", {
            "md:basis-3/5": isSeries,
          })}
        >
          <Heading level={6} className={cn({ "text-md": isSeries })}>
            {title}
          </Heading>
          <p className="text-sm text-muted-foreground">
            {shortenText(excerpt!, isSeries ? 100 : 160)}
          </p>
          <Row className="justify-between w-full">
            <div className="flex flex-wrap gap-2">
              {tags!.slice(0, 2).map((tag) => (
                <Badge key={tag} variant={"secondary"} className="uppercase">
                  #{tag}
                </Badge>
              ))}
            </div>
            <time
              dateTime={publishedAt!}
              className="text-sm text-muted-foreground"
            >
              {format(new Date(publishedAt!), "MMM d, yyyy")}
            </time>
          </Row>
        </Col>
      </Col>
    </Link>
  );
}
