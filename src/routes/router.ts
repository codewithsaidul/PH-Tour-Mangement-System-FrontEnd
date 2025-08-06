import Layout from "@/layout/Layout";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router";




export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                Component: HomePage
            },
        ]
    }
])