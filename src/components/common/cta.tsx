import React from "react";

import { Icons } from "@/assets/icons";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/reusables/button";
import Row from "@/components/ui/row";
import { siteConfig } from "@/config/site";

export default function Cta() {
  return (
    <Row className="rounded-3xl bg-chart-5 p-16 flex flex-col md:flex-row md:justify-between m-[7%] gap-10">
      <Heading
        level={2}
        className="text-white text-5xl leading-tight text-center md:text-left"
      >
        Interested in <br /> working <br /> with me?
      </Heading>
      <a href={siteConfig.links.email}>
        <Button variant={"secondary"}>
          <Icons.Email /> I'm One Email Away
        </Button>
      </a>
    </Row>
  );
}
