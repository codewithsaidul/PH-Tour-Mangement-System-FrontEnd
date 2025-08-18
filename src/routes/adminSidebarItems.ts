import Division from "@/pages/admin/Division";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const AddTour = lazy(() => import("@/pages/admin/AddTour"));
const TourTypes = lazy(() => import("@/pages/admin/TourTypes"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Mangement",
    url: "#",
    items: [
      {
        title: "Add Division",
        url: "/admin/division",
        component: Division,
      },
      {
        title: "Add Tour Type",
        url: "/admin/tour-types",
        component: TourTypes,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
    ],
  },
];
