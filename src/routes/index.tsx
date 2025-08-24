import App from "@/App";
import Banner from "@/components/modules/HomePage/Banner";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: Banner,
                index: true,
            },
        ]
    },
    {
        Component: Login,
        path: "/login",
    },
    {
        Component: Register,
        path: "/register",
    },
    {
        Component: Verify,
        path: "/verify",
    },
]);