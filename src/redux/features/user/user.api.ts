import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUser } from "@/types";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // register: builder.mutation<IResponse<IUser>, IUser>({
        //     query: (userRegisterInfo) => ({
        //         url: "/user/register",
        //         method: "POST",
        //         data: userRegisterInfo,
        //     }),
        // }),

        // ------ GET ALL USERS
        allUserInfo: builder.query({
            query: () => ({
                url: "/user/all-users",
                method: "GET",
            }),
            providesTags: ["USER"],
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

export const { useAllUserInfoQuery, useSingleUserInfoQuery, useUpdateUserInfoMutation } = userApi;