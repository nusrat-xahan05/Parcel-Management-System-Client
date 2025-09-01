import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FAQ from "@/components/modules/FAQ";
import { Role } from "@/constants/User";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Services } from "@/pages/Services";
import TrackParcel from "@/pages/TrackParcel";
import Verify from "@/pages/Verify";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import Unauthorized from "@/pages/Unauthorized";
import UserDetails from "@/pages/Admin/UserDetails";
import ParcelDetails from "@/pages/Admin/ParcelDetails";
import { senderSidebarItems } from "./senderSidebarItems";
import ErrorPage from "@/pages/ErrorPage";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        errorElement: <ErrorPage></ErrorPage>,
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
                Component: Services,
                path: "/services",
            },
            {
                Component: FAQ,
                path: "/faq",
            },
            {
                Component: Contact,
                path: "/contact",
            },
            {
                Component: TrackParcel,
                path: "/track-parcel",
            },
        ]
    },
    {
        Component: withAuth(DashboardLayout, Role.ADMIN as TRole),
        path: "/admin",
        children: [
            { index: true, element: <Navigate to="/admin/analytics" /> },
            {
                Component: UserDetails,
                path: 'user/:id'
            },
            {
                Component: ParcelDetails,
                path: 'parcel/:id'
            },
            ...generateRoutes(adminSidebarItems),
        ],
    },
    {
        Component: withAuth(DashboardLayout, Role.SENDER as TRole),
        path: "/sender",
        children: [
            { index: true, element: <Navigate to="/sender/analytics" /> },
            {
                Component: ParcelDetails,
                path: 'parcel/:id'
            },
            ...generateRoutes(senderSidebarItems),
        ],
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
    {
        Component: Unauthorized,
        path: "/unauthorized",
    }
]);