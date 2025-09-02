import type { ISidebarItem } from "@/types";
import { lazy } from "react";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const MyParcels = lazy(() => import("@/pages/Admin&User/MyParcels"));
const CreateParcel = lazy(() => import("@/pages/Admin&User/CreateParcel"));

export const senderSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/sender/analytics",
                component: Analytics
            }
        ],
    },
    {
        title: "Parcel Management",
        items: [
            {
                title: "My Parcels",
                url: "/sender/my-parcels",
                component: MyParcels
            },
            {
                title: "Create A Parcel",
                url: "/sender/create-parcel",
                component: CreateParcel
            }
        ],
    },
]