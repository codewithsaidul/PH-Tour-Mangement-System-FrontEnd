import * as React from "react";

import Logo from "@/assets/icons/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Link } from "react-router";
import { useUserProfileQuery } from "@/redux/feature/users/user.api";
import { Separator } from "./ui/separator";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userInfo } = useUserProfileQuery(undefined);

  const data = {
    navMain: getSidebarItems(userInfo?.data?.role),
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div>
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <h2 className="text-foreground max-sm:hidden text-2xl font-bold font-tour-title">
              Tour Your <span className="text-primary">Way</span>
            </h2>
          </Link>
        </div>
      </SidebarHeader>

    <Separator />

      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
