import Autoplay from "embla-carousel-autoplay";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import ReactPlayer from "react-player";

import Center from "@/components/ui/center";
import { AspectRatio } from "@/components/ui/reusables/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/reusables/carousel";

export default function Header({
  images,
  videoDemoUrl,
}: {
  images:
    | readonly ({
        readonly gatsbyImageData: IGatsbyImageData | null;
        readonly publicUrl: string;
      } | null)[]
    | null;
  videoDemoUrl: Queries.ContentfulProject["videoDemoUrl"];
}) {
  if (!images && !videoDemoUrl) {
    return null;
  }

  const isLoom = (videoDemoUrl ?? "").toLowerCase().includes("loom");

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnMouseEnter: true,
          stopOnInteraction: true,
        }),
      ]}
      className="mx-4 md:mx-0"
    >
      <CarouselContent>
        {videoDemoUrl && (
          <CarouselItem>
            <Center className="h-full">
              <AspectRatio ratio={3 / 2}>
                {isLoom ? (
                  <iframe
                    title="loom"
                    src={`https://www.loom.com/embed/${videoDemoUrl
                      .split("/")
                      .slice(-1)}`}
                    width={"100%"}
                    height={"100%"}
                    style={{
                      borderRadius: 12,
                    }}
                  />
                ) : (
                  <ReactPlayer
                    url={videoDemoUrl}
                    width={"100%"}
                    height={"100%"}
                    controls
                  />
                )}
              </AspectRatio>
            </Center>
          </CarouselItem>
        )}
        {images?.map((img, i) => (
          <CarouselItem key={img?.publicUrl}>
            <GatsbyImage
              image={img?.gatsbyImageData as IGatsbyImageData}
              alt={`${i}`}
              className="rounded-xl aspect-[3/2]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
