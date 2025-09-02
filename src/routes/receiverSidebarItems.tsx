import type { ISidebarItem } from "@/types";
import { lazy } from "react";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const IncomingParcels = lazy(() => import("@/pages/Receiver/IncomingParcels"));
const ParcelHistory = lazy(() => import("@/pages/Receiver/ParcelHistory"));

export const receiverSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/receiver/analytics",
                component: Analytics
            }
        ],
    },
    {
        title: "Parcel Management",
        items: [
            {
                title: "Incoming Parcels",
                url: "/receiver/incoming-parcels",
                component: IncomingParcels
            },
            {
                title: "History",
                url: "/receiver/parcel-history",
                component: ParcelHistory
            }
        ],
    },
]