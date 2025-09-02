import { baseApi } from "@/redux/baseApi";
import type { IAllUserQueryParams, IResponse, IUser } from "@/types";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ------ GET ALL USERS
        allUserInfo: builder.query<IResponse<IUser[]>, IAllUserQueryParams>({
            query: (params) => ({
                url: "/user/all-users",
                method: "GET",
                params,
            }),
            providesTags: ["USER"],
        }),

        // ------ CREATE AGENT REQUEST
        agentRequest: builder.mutation<IResponse<IUser>, void>({
            query: () => ({
                url: "/user/agent-request",
                method: "POST"
            }),
            invalidatesTags: ['USER']
        }),

        // ------ GET SINGLE USER
        singleUserInfo: builder.query<IResponse<IUser>, string>({
            query: (id: string) => ({
                url: `/user/${id}`,
                method: "GET",
            }),
            providesTags: ["USER"],
        }),

        // ------ UPDATE A USER
        updateUserInfo: builder.mutation({
            query: ({ userId, userData }) => ({
                url: `/user/${userId}`,
                method: 'PATCH',
                data: userData
            }),
            invalidatesTags: ['USER']
        }),
    }),
});

export const { useAllUserInfoQuery, useAgentRequestMutation, useSingleUserInfoQuery, useUpdateUserInfoMutation } = userApi;