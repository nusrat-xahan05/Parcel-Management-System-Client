import { Role } from "@/constants/User";
import { adminSidebarItems } from "@/routes/AdminSidebarItems";
import { receiverSidebarItems } from "@/routes/receiverSidebarItems";
import { senderSidebarItems } from "@/routes/SenderSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case Role.ADMIN:
            return [...adminSidebarItems];
        case Role.SENDER:
            return [...senderSidebarItems];
        case Role.RECEIVER:
            return [...receiverSidebarItems];
        default:
            return [];
    }
}