import { baseApi } from "@/redux/baseApi";
import type { IParcel, IResponse } from "@/types";

export const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ------ CREATE A PARCEL
        createParcel: builder.mutation<IResponse<IParcel>, IParcel>({
            query: (parcelCreateInfo) => ({
                url: "/parcel/create-parcel",
                method: "POST",
                data: parcelCreateInfo,
            }),
            invalidatesTags: ['PARCEL']
        }),

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

        // ------ TRACK PARCEL
        trackParcel: builder.query<IResponse<IParcel>, string>({
            query: (id: string) => ({
                url: `/parcel/track-parcel/${id}`,
                method: "GET",
            }),
            providesTags: ["PARCEL"],
        }),
    }),
});

export const { useCreateParcelMutation, useAllParcelInfoQuery, useSingleParcelInfoQuery, useUpdateParcelInfoMutation, useLazyTrackParcelQuery } = parcelApi;