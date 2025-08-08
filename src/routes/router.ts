import App from "@/App";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

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
    path: "/login",
    Component: LoginPage
  },
  {
    path: "/register",
    Component: RegisterPage
  },
  {
    path: "/verify",
    Component: Verify
  }
]);
