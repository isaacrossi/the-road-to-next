import { ReactElement } from "react";

export type NavItem = {
  separator?: boolean;
  title: string;
  icon: ReactElement<{ className?: string }>;
  href: string;
  items?: {
    title: string;
    href: string;
  }[];
};
