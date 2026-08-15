import { Link, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Menu } from "lucide-react";
import React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

import { Button } from "../ui/reusables/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/reusables/dropdown-menu";
import Row from "../ui/row";

export default function Nav({
  location,
}: Readonly<{ location: PageProps["location"] }>) {
  return (
    <>
      {!siteConfig.hideBanner && (
        <header
          role="banner"
          className="p-2 bg-[linear-gradient(_43deg,#4158d0_0%,#c850c0_46%,#ffcc70_100%_)] text-white text-center"
        >
          <a href={siteConfig.links.email} className="underline">
            Hire Me
          </a>{" "}
          (Open to full-time)
        </header>
      )}
      <nav
        role="navigation"
        className="relative flex justify-between items-center py-8 px-[7%]"
      >
        <Link to="/">
          <StaticImage
            src={"../../images/icon.png"}
            alt="itsrakesh logo"
            width={60}
            height={60}
            class="hover:animate-spin rounded-full cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <Row className="hidden md:flex gap-2">
          {Object.values(siteConfig.pages)
            .filter((item) => item !== siteConfig.pages.series)
            .map((item) => (
              <Link key={item.link} to={item.link}>
                <Button
                  variant={"ghost"}
                  className={cn("font-semibold text-md", {
                    "text-primary":
                      location.pathname.startsWith(item.link) &&
                      (item.link !== "/" || location.pathname === "/"),
                  })}
                >
                  {item.title}
                </Button>
              </Link>
            ))}
        </Row>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {Object.values(siteConfig.pages)
              .filter((item) => item !== siteConfig.pages.series)
              .map((item) => (
                <DropdownMenuItem key={item.link} asChild>
                  <Link to={item.link} className="w-full">
                    <Button
                      variant={"ghost"}
                      className={cn({
                        "text-primary": location.pathname === item.link,
                      })}
                    >
                      {item.title}
                    </Button>
                  </Link>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
}
