import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUser } from "@/types";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ------ GET ALL USERS
        allUserInfo: builder.query<IResponse<IUser[]>, { page?: number; limit?: number }>({
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