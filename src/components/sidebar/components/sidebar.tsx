"use client";

import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";
import { navItems } from "../constants";
import { SidebarItem } from "./sidebar-item";

const SideBar = () => {
  // get user from our useAuth hook to check if we should render the sidebar
  // we opt for our hook as opposed to getAuth on it's own to prevent all pages being
  // dynamically rendered leading to slower page loads (sidebar sits at our root layout)
  const { user, isFetched } = useAuth();

  // this is to check if we are currently in the process of transitioning from open to closed or vice versa
  const [isTransition, setTransition] = useState(false);
  // show or hide sidebar
  const [isOpen, setOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => {
      setTransition(false);
    }, 200);
  };

  // 1. Show the loading skeleton while verifying auth state
  if (!isFetched) {
    return <div className="w-[78px] bg-secondary/20" />;
  }
  // 2. Hide completely from guests once we know they are logged out
  if (!user) {
    return null;
  }

  return (
    <nav
      className={cn(
        "animate-sidebar-from-left",
        "h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "md:w-60 w-[78px]" : "w-[78px]",
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
};

export { SideBar };
