import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import Center from "@/components/ui/center";
import { AspectRatio } from "@/components/ui/reusables/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/reusables/carousel";
import { ctf, ctfSrcSet } from "@/utils/images";
import type { PlainAsset } from "@/loaders/transforms";

interface Props {
  images: PlainAsset[];
  videoDemoUrl: string | null;
}

// ReactPlayer's default export isn't renderable during Astro's SSR pass at
// all (confirmed by isolating it: the build succeeds with ReactPlayer
// stubbed out, fails identically whether imported as "react-player" or the
// "/lazy" variant, and with or without vite.ssr.noExternal). It can't be
// its own client:only island either, since it's an alternate CarouselItem
// in the same embla track as the images — splitting islands mid-carousel
// breaks swipe/autoplay across the whole track. Mounting it only after a
// client-side effect gets the same "never render this server-side" effect
// within the single island the carousel already needs.
function ClientOnlyPlayer(props: { url: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <ReactPlayer
      src={props.url}
      width={"100%"}
      height={"100%"}
      controls
      style={{ borderRadius: 12, overflow: "hidden" }}
    />
  );
}

export default function ProjectHeader({ images, videoDemoUrl }: Props) {
  if (images.length === 0 && !videoDemoUrl) return null;

  const isLoom = (videoDemoUrl ?? "").toLowerCase().includes("loom");

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      plugins={[Autoplay({ delay: 4000, stopOnMouseEnter: true, stopOnInteraction: true })]}
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
                    src={`https://www.loom.com/embed/${videoDemoUrl.split("/").slice(-1)}`}
                    width={"100%"}
                    height={"100%"}
                    style={{ borderRadius: 12 }}
                  />
                ) : (
                  <ClientOnlyPlayer url={videoDemoUrl} />
                )}
              </AspectRatio>
            </Center>
          </CarouselItem>
        )}
        {images.map((img, i) => (
          <CarouselItem key={img.url}>
            <img
              src={ctf(img.url, { w: 900, h: 600, fit: "fill" })}
              srcSet={ctfSrcSet(img.url, [450, 900, 1350], { ratio: 2 / 3, fit: "fill" })}
              sizes="(max-width: 768px) 100vw, 900px"
              alt={`${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              className="rounded-xl aspect-[3/2] w-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
