import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import { Heading } from "@/components/ui/heading";
import { siteConfig } from "@/config/site";

export default function Intro() {
  return (
    <div className="space-y-8">
      <StaticImage
        src="../../../images/featured.jpeg"
        alt="Rakesh Potnuru skydive"
        className="rounded-xl"
        placeholder="blurred"
      />
      <Heading level={3}>Short Bio</Heading>
      <p className="leading-loose">
        Hi there! Thanks for stopping by.
        <br />
        I&apos;m Rakesh, a software engineer, tech enthusiast, and product
        creator with a passion for building innovative tools and solutions. With
        experience across a wide range of technologies, I&apos;ve worked on
        projects of all sizes, from small prototypes to large-scale systems.
        Whether it&apos;s system design, development, or even marketing, I
        handle it all.
        <br />I regularly share my insights and experiences on my{" "}
        <Link
          to={siteConfig.pages.blog.link}
          className="underline text-primary"
        >
          blog
        </Link>
        , where I discuss everything from technical deep dives to lessons
        learned in product development. I&apos;m also an active contributor to
        developer communities and open source projects, having participated in{" "}
        <a
          href={siteConfig.links.ytPlaylists}
          target="_blank"
          className="underline text-primary"
          rel="noreferrer"
        >
          workshops, events,
        </a>{" "}
        and collaborative initiatives.
      </p>
    </div>
  );
}
