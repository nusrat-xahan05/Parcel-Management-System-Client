import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userRegisterInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userRegisterInfo,
            }),
        }),
        login: builder.mutation({
            query: (userLoginInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userLoginInfo,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            invalidatesTags: ['USER'],
        }),
        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useUserInfoQuery } = authApi;