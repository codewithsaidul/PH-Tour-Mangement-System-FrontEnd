import { useUserProfileQuery } from "@/redux/feature/users/user.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";


export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
    return function AuthWraper () {

        const { data: userInfo, isLoading } = useUserProfileQuery(undefined);

       if (!isLoading && !userInfo?.data?.email) {
            return <Navigate to="/login" />
        }

        if (requiredRole && !isLoading && requiredRole !== userInfo?.data?.role) {
            return <Navigate to="/unauthorized" />
        }


        return <Component />
    }
}