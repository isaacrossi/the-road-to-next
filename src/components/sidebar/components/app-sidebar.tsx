import Link from "next/link";
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navItems } from "../constants";

const AppSideBar = () => {
  return (
    <Sidebar className="pt-[60px]">
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.href}>{item.title}</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </Sidebar>
  );
};

export { AppSideBar };
