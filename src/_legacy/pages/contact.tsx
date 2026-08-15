import { PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import Contact from "@/components/modules/contact";
import { Heading } from "@/components/ui/heading";
import { siteConfig } from "@/config/site";

export default function ContactPage({ location }: PageProps) {
  return (
    <Layout location={location} className="space-y-16">
      <Heading level={1}>Contact Me</Heading>
      <Contact />
    </Layout>
  );
}

export function Head() {
  return (
    <Seo
      title={siteConfig.pages.contact.title}
      description={siteConfig.pages.contact.description}
      pathname={siteConfig.pages.contact.link}
    />
  );
}
