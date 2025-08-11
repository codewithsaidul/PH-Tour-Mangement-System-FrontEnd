import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"))
const AddTour = lazy(() => import("@/pages/admin/AddTour"))
const TourTypes = lazy(() => import("@/pages/admin/TourTypes"))

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics
      },
    ],
  },
  {
    title: "Tour Mangement",
    url: "#",
    items: [
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour
      },
      {
        title: "Add Tour Type",
        url: "/admin/tour-types",
        component: TourTypes
      },
    ],
  },
];
