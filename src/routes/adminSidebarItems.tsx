import type { ISidebarItem } from "@/types";
import { lazy } from "react";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const CreateParcel = lazy(() => import("@/pages/Admin&User/CreateParcel"));
const MyParcels = lazy(() => import("@/pages/Admin&User/MyParcels"));
const AllParcels = lazy(() => import("@/pages/Admin/AllParcels"));
const AllUsers = lazy(() => import("@/pages/Admin/AllUsers"));
const AllAgentRequest = lazy(() => import("@/pages/Admin/AllAgentRequest"));


export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: Analytics
            }
        ],
    },
    {
        title: "User Management",
        items: [
            {
                title: "All Users",
                url: "/admin/all-users",
                component: AllUsers
            }
        ],
    },
    {
        title: "Agent Management",
        items: [
            {
                title: "Get All Request",
                url: "/admin/agent-requests",
                component: AllAgentRequest
            }
        ],
    },
    {
        title: "Parcel Management",
        items: [
            {
                title: "All Parcel",
                url: "/admin/all-parcels",
                component: AllParcels
            },
            {
                title: "My Parcels",
                url: "/admin/my-parcels",
                component: MyParcels
            },
            {
                title: "Create A Parcel",
                url: "/admin/create-parcel",
                component: CreateParcel
            }
        ],
    },
]