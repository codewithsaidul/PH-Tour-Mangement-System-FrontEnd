import { baseApi } from "@/redux/baseApi";



export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userProfile: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET"
            })
        })
    })
})




export const { useUserProfileQuery } = userApi