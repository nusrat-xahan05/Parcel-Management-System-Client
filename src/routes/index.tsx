import App from "@/App";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import TrackOrder from "@/pages/TrackOrder";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: HomePage,
                index: true,
            },
            {
                Component: About,
                path: "/about",
            },
            {
                Component: Contact,
                path: "/contact",
            },
            {
                Component: TrackOrder,
                path: "/track",
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