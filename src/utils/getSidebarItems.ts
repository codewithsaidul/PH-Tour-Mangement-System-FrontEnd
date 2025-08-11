import { role } from "@/constants";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";




export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.superAdmin:
            return [...adminSidebarItems];
        case role.admin:
            return [...adminSidebarItems];
        case role.user:
            return [...userSidebarItems];
        case role.guide:
            return [...userSidebarItems];
        default:
            return [];
    }
}