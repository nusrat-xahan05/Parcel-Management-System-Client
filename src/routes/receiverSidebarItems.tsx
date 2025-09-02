// import Bookings from "@/pages/User/Bookings";
import Analytics from "@/pages/Admin/Analytics";
import IncomingParcels from "@/pages/Receiver/IncomingParcels";
import ParcelHistory from "@/pages/Receiver/ParcelHistory";
import type { ISidebarItem } from "@/types";

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