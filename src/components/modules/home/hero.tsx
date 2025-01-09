import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { TypeAnimation } from "react-type-animation";

import { Icons } from "@/assets/icons";
import Col from "@/components/ui/col";
import { Button } from "@/components/ui/reusables/button";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <Row className="lg:justify-between justify-center">
      <Col className="gap-6 lg:items-start">
        <Col className="gap-2 lg:items-start">
          <p>Hey!</p>
          <h2 className="text-5xl font-medium">
            I'm <span className="text-primary">Rakesh</span>
          </h2>
          <TypeAnimation
            sequence={[
              "Software Engineer",
              1000,
              "Technical Writer",
              1000,
              "Freelancer",
              1000,
            ]}
            wrapper="div"
            className="text-chart-6 text-4xl font-medium typing"
            repeat={Infinity}
            cursor={false}
            deletionSpeed={70}
          />
        </Col>
        <div>
          <Link to="/about">
            <Button variant={"link"} className="h-max p-0 text-md">
              Learn more <Icons.InternalLink className="-ml-1" />
            </Button>
          </Link>{" "}
          about me
        </div>
        <Row className="gap-2">
          Follow me <SocialItems />
        </Row>
        <Row className="gap-4">
          <a href={siteConfig.links.email}>
            <Button className="shadow-lg h-12">
              <Icons.Email /> Email Me
            </Button>
          </a>
          <a href="/resume.pdf" target="_blank">
            <Button
              variant={"outline"}
              className="border-primary h-12 shadow-primary shadow-lg"
            >
              <Icons.Download /> Resume
            </Button>
          </a>
        </Row>
      </Col>

      <div className="hidden lg:block">
        <StaticImage
          src="../../../images/avatar.png"
          alt="Rakesh Potnuru"
          placeholder="blurred"
          width={500}
          height={500}
          className="rounded-full"
        />
      </div>
    </Row>
  );
}

export function SocialItems() {
  const { github, instagram, linkedin, medium, psn, productHunt } =
    siteConfig.links;

  return (
    <Row className="gap-2">
      {[
        { icon: <Icons.GitHub />, link: github, title: "GitHub" },
        { icon: <Icons.LinkedIn />, link: linkedin, title: "LinkedIn" },
        { icon: <Icons.Medium />, link: medium, title: "Medium" },
        {
          icon: <Icons.ProductHunt />,
          link: productHunt,
          title: "Product Hunt",
        },
        { icon: <Icons.Instagram />, link: instagram, title: "Instagram" },
        { icon: <Icons.Playstation />, link: psn, title: "Playstation" },
      ].map((item) => (
        <a
          key={item.link}
          href={item.link}
          className="text-2xl hover:opacity-90"
          target="_blank"
          title={item.title}
          rel="noreferrer"
        >
          {item.icon}
        </a>
      ))}
    </Row>
  );
}
