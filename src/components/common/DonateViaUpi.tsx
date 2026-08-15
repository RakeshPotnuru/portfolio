import { toast } from "sonner";

import upiLogo from "@/images/upi-logo.svg";
import upiQr from "@/images/upi.png";
import { Icons } from "@/assets/icons";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/reusables/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/reusables/dialog";

export default function DonateViaUpi() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          Donate via <img src={upiLogo.src} alt="UPI" width={40} className="rounded-lg shrink-0" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <img src={upiQr.src} alt={siteConfig.links.upi} className="rounded-lg" />
        <Button
          onClick={() =>
            navigator.clipboard.writeText(siteConfig.links.upi).then(() => toast.success("UPI ID copied to clipboard"))
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
