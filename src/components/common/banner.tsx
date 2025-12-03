import React from "react";

import { siteConfig } from "@/config/site";

export default function Banner() {
  return (
    <div className="bg-black p-4 text-center">
      Open for full-time roles.{" "}
      <a
        href={siteConfig.links.email}
        className="underline text-blue-500 hover:text-blue-600 hover:underline-offset-2"
      >
        Contact Me
      </a>
    </div>
  );
}
