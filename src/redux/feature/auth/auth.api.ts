
import { baseApi } from "@/redux/baseApi";
import type { IAuthResponse, ILogin, IResponse, ISendOtp, IVeriyOTP } from "@/types";




const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IResponse<IAuthResponse>, ILogin>({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo
            })
        }),
        logout: builder.mutation<IResponse<null>, undefined>({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            })
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),
        sendOTP: builder.mutation<IResponse<null>, ISendOtp>({
            query: (userInfo) => ({
                url: "/otp/send",
                method: "POST",
                data: userInfo
            })
        }),
        verifyOTP: builder.mutation<IResponse<null>, IVeriyOTP>({
            query: (userInfo) => ({
                url: "/otp/verify",
                method: "POST",
                data: userInfo
            })
        }),
    })
})



export const { useLoginMutation, useRegisterMutation, useSendOTPMutation, useVerifyOTPMutation, useLogoutMutation } = authApi