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
        Hi! Thanks for stopping by.
        <br />
        <br />
        I&apos;m Rakesh, a software engineer who builds products end-to-end and
        enjoys optimizing both codebases and loadouts. I&apos;ve worked on
        enterprise AI platforms, DeFi infrastructure, and creator tools,
        focusing on performance, clarity, and systems that hold up under
        real-world use.
        <br />
        <br />I like thinking in systems: clean architectures, thoughtful
        trade-offs, and interfaces that make complex things feel obvious. When
        I&apos;m not shipping software, I&apos;m{" "}
        <a
          href={siteConfig.links.psn}
          target="_blank"
          className="underline text-primary"
          rel="noreferrer"
        >
          gaming
        </a>
        , which probably explains my obsession with feedback loops, latency, and
        making things feel responsive.
        <br />
        <br />I enjoy building things people actually use, improving them
        iteratively, and knowing when to refactor… and when to just ship.
      </p>
    </div>
  );
}
