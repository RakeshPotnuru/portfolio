import { PageProps } from "gatsby";
import React from "react";

import Layout from "@/components/common/layout";
import { Seo } from "@/components/common/seo";
import Center from "@/components/ui/center";

export default function NotFoundPage({ location }: Readonly<PageProps>) {
  return (
    <Layout location={location}>
      <Center>404 | Page Not Found</Center>
    </Layout>
  );
}

export function Head() {
  return <Seo title="Page Not Found" />;
}
