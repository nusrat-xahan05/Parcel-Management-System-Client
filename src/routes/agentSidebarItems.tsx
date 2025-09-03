import AllAssignedParcel from "@/pages/Agent/AllAssignedParcel";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
    {
        title: "Parcel Management",
        items: [
            {
                title: "Assigned Parcels",
                url: "/agent/assigned-parcels",
                component: AllAssignedParcel
            }
        ],
    },
]