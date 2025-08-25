import { baseApi } from "@/redux/baseApi";
import type { ILogin, IResponse, ISendOtp, IUser, IVerifyOtp } from "@/types";
import type { ILoginResponseData } from "@/types/auth.type";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<IResponse<IUser>, IUser>({
            query: (userRegisterInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userRegisterInfo,
            }),
        }),
        login: builder.mutation<IResponse<ILoginResponseData>, ILogin>({
            query: (userLoginInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userLoginInfo,
            }),
        }),
        logout: builder.mutation<IResponse<null>, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            invalidatesTags: ['USER'],
        }),
        userInfo: builder.query<IResponse<IUser>, void>({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),
        sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
            query: (userInfo) => ({
                url: "/otp/send",
                method: "POST",
                data: userInfo,
            }),
        }),
        verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
            query: (userInfo) => ({
                url: "/otp/verify",
                method: "POST",
                data: userInfo,
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useUserInfoQuery, useSendOtpMutation, useVerifyOtpMutation } = authApi;