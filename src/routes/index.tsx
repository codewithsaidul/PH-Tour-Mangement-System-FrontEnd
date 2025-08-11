import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import HomePage from "@/pages/public/HomePage";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { Navigate } from "react-router"
import { lazy } from "react";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants";
import type { TRole } from "@/types";



const Verify = lazy(() => import("@/pages/auth/Verify"))
const LoginPage = lazy(() => import("@/pages/auth/Login"))
const RegisterPage = lazy(() => import("@/pages/auth/Register"))
const Unauthorized = lazy(() => import("@/pages/unauthorized/Unauthorized"))



export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems)
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.user as TRole),
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems)],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/verify",
    Component: Verify,
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
