import CreateParcel from "@/pages/Admin&User/CreateParcel";
import MyParcels from "@/pages/Admin&User/MyParcels";
import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItem } from "@/types";

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