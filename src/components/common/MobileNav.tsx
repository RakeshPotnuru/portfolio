import { Menu } from "lucide-react";

import { Button } from "@/components/ui/reusables/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/reusables/dropdown-menu";
import { cn } from "@/utils/cn";

interface NavItem {
  title: string;
  link: string;
}

export default function MobileNav({
  navItems,
  pathname,
}: {
  navItems: NavItem[];
  pathname: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {navItems.map((item) => (
          <DropdownMenuItem key={item.link} asChild>
            <a href={item.link} className="w-full">
              <Button
                variant={"ghost"}
                className={cn({ "text-primary": pathname === item.link })}
              >
                {item.title}
              </Button>
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
