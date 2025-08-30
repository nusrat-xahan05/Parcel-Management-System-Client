import { baseApi } from "@/redux/baseApi";
import type { IParcel, IResponse } from "@/types";

export const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ------ GET ALL PARCELS
        allParcelInfo: builder.query({
            query: () => ({
                url: "/parcel/all-parcels",
                method: "GET",
            }),
            providesTags: ["PARCEL"],
        }),

        // ------ GET SINGLE PARCEL
        singleParcelInfo: builder.query<IResponse<IParcel>, string>({
            query: (id: string) => ({
                url: `/parcel/${id}`,
                method: "GET",
            }),
            providesTags: ["PARCEL"],
        }),

        // ------ UPDATE A PARCEL
        updateParcelInfo: builder.mutation({
            query: ({ parcelId, parcelData }) => ({
                url: `/parcel/${parcelId}`,
                method: 'PATCH',
                data: parcelData
            }),
            invalidatesTags: ['PARCEL']
        }),
    }),
});

export const { useAllParcelInfoQuery, useSingleParcelInfoQuery, useUpdateParcelInfoMutation } = parcelApi;