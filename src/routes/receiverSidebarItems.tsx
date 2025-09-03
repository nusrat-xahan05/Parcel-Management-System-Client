import type { ISidebarItem } from "@/types";
import { lazy } from "react";
const IncomingParcels = lazy(() => import("@/pages/Receiver/IncomingParcels"));
const ParcelHistory = lazy(() => import("@/pages/Receiver/ParcelHistory"));

export const receiverSidebarItems: ISidebarItem[] = [
    {
        title: "Parcel Management",
        items: [
            {
                title: "History",
                url: "/receiver/parcel-history",
                component: ParcelHistory
            },
            {
                title: "Incoming Parcels",
                url: "/receiver/incoming-parcels",
                component: IncomingParcels
            }
        ],
    },
]