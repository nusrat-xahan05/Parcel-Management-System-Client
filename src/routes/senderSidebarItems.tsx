import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItem } from "@/types";

export const senderSidebarItems : ISidebarItem[] = [
    {
        title: "Parcel Management",
        items: [
            {
                title: "Parcel History",
                url: "/sender/analytics",
                component: Analytics
            }
        ],
    }
]