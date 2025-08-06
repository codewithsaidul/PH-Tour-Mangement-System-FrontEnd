import App from "@/App";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/Login";
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
  }
]);
