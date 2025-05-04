import React from "react";

import { Icons } from "@/assets/icons";
import { siteConfig } from "@/config/site";

import Row from "../ui/row";

export default function SocialItems() {
  const { github, instagram, linkedin, medium, psn, productHunt, donate } =
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
        { icon: <Icons.Donate />, link: donate, title: "Donate" },
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
