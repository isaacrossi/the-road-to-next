import { LucideTickets } from "lucide-react";
import Link from "next/link";
import { homePath, ticketsPath } from "@/src/paths";
import { ThemeSwithcher } from "./themes/theme-switcher";
import { buttonVariants } from "./ui/button";

const Header = () => {
  return (
    <nav
      className="
            supports-backdrop-blur:bg-background/60
            fixed left-0 right-0 top-0 z-20
            border-b bg-background/95 backdrop-blur
            w-full flex py-2.5 px-5 justify-between
          "
    >
      <div className="flex align-items gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideTickets />
          <h1 className="font-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex align-items gap-x-2">
        <ThemeSwithcher />
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: "default" })}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
};

export { Header };
