import { PageProps } from "gatsby";
import React from "react";

import { cn } from "@/utils/cn";

import { Toaster } from "../ui/reusables/sonner";
import ScrollToTop from "../ui/scroll-to-top";
import Cta from "./cta";
import { BreakpointViewer } from "./dev-tools/breakpoint-viewer";
import Footer from "./footer";
import Nav from "./nav";

interface LayoutProps extends React.HTMLAttributes<HTMLElement> {
  location: PageProps["location"];
}

export default function Layout({
  children,
  location,
  className,
}: Readonly<LayoutProps>) {
  return (
    <>
      {/* <Banner /> */}
      <Nav location={location} />
      <ScrollToTop />
      <main className={cn("min-h-dvh antialiased px-[10%] py-8", className)}>
        {children}
      </main>
      <Cta />
      <Footer location={location} />
      <Toaster />
      {process.env.NODE_ENV === "development" && <BreakpointViewer />}
    </>
  );
}
