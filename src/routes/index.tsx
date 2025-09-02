import App from "@/App";
import FAQ from "@/components/modules/FAQ";
import { Role } from "@/constants/User";
import HomePage from "@/pages/HomePage";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { receiverSidebarItems } from "./receiverSidebarItems";
import { lazy } from "react";
const DashboardLayout = lazy(() => import("@/components/layout/DashboardLayout"));
const Register = lazy(() => import("@/pages/Register"));
const Login = lazy(() => import("@/pages/Login"));
const ViewProfile = lazy(() => import("@/pages/Admin&User/ViewProfile"));
const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const Contact = lazy(() => import("@/pages/Contact"));
const ParcelDetails = lazy(() => import("@/pages/Admin&User/ParcelDetails"));
const UserDetails = lazy(() => import("@/pages/Admin/UserDetails"));
const Verify = lazy(() => import("@/pages/Verify"));
const TrackParcel = lazy(() => import("@/pages/TrackParcel"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));

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
                Component: ViewProfile,
                path: "/profile",
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
        Component: withAuth(DashboardLayout, Role.RECEIVER as TRole),
        path: "/receiver",
        children: [
            { index: true, element: <Navigate to="/receiver/analytics" /> },
            {
                Component: ParcelDetails,
                path: 'parcel/:id'
            },
            ...generateRoutes(receiverSidebarItems),
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