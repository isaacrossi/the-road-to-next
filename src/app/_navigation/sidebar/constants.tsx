import { LucideBook, LucideCircleUser, LucideLibrary } from "lucide-react";
import {
  accountPasswordPath,
  accountProfilePath,
  homePath,
  ticketsPath,
} from "@/paths";
import { NavItem } from "./types";

export const navItems: NavItem[] = [
  {
    title: "All Tickets",
    href: homePath(),
    icon: <LucideLibrary />,
  },
  {
    title: "My Tickets",
    href: ticketsPath(),
    icon: <LucideBook />,
  },
  {
    separator: true,
    title: "Account",
    icon: <LucideCircleUser />,
    href: accountProfilePath(),
    items: [
      {
        title: "Profile",
        href: accountProfilePath(),
      },
      {
        title: "Password",
        href: accountPasswordPath(),
      },
    ],
  },
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
