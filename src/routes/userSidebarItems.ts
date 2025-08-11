import type { ISidebarItem } from "@/types";
import { lazy } from "react";


const Bookings = lazy(() => import("@/pages/user/Bookings"))

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    url: "#",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: Bookings,
      },
    ],
  },
];
