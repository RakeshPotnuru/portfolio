import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { toast } from "sonner";

import { Icons } from "@/assets/icons";
import { siteConfig } from "@/config/site";

import { Button } from "../ui/reusables/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/reusables/dialog";
import Row from "../ui/row";

export default function DonationBox({ title }: { title?: string }) {
  return (
    <Row className="justify-between rounded-xl bg-chart-6 p-8 text-black flex-col md:flex-row gap-4">
      <p className="font-bold">{title || "Loved this post?"}</p>
      <Row className="gap-2 flex-col md:flex-row">
        <a href={siteConfig.links.donate} target="_blank" rel="noreferrer">
          <Button variant={"secondary"}>🍕 Buy me a pizza</Button>
        </a>
        <DonateViaUPI />
      </Row>
    </Row>
  );
}

function DonateViaUPI() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          Donate via{" "}
          <StaticImage
            src="../../images/upi-logo.svg"
            alt="UPI"
            className="rounded-lg shrink-0"
            width={40}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <StaticImage
          src="../../images/upi.png"
          alt={siteConfig.links.upi}
          className="rounded-lg"
        />
        <Button
          onClick={() =>
            navigator.clipboard
              .writeText(siteConfig.links.upi)
              .then(() => toast.success("UPI ID copied to clipboard"))
          }
          variant={"outline"}
          className="w-max rounded-full absolute bottom-2 sm:bottom-4 right-0 left-0 m-auto"
        >
          {siteConfig.links.upi}
          <Icons.Copy />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
