import AllParcels from "@/pages/Admin/AllParcels";
import AllUsers from "@/pages/Admin/AllUsers";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));


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
            // {
            //     title: "Get All Users",
            //     url: "/admin/all-users",
            //     component: AddTourType
            // }
        ],
    },
    {
        title: "Parcel Management",
        items: [
            {
                title: "All Parcel",
                url: "/admin/all-parcels",
                component: AllParcels
            }
        ],
    },
]