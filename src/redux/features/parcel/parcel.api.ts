import { baseApi } from "@/redux/baseApi";
import type { IParcel, IResponse } from "@/types";
import type { ITrackParcelInfo } from "@/types/parcel.type";

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

        // ------ GET MY PARCELs
        myParcels: builder.query({
            query: () => ({
                url: "/parcel/me",
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

        // ------ GET INCOMING PARCELS
        incomingParcel: builder.query<IResponse<IParcel>, void>({
            query: () => ({
                url: "/parcel/incoming",
                method: "GET",
            }),
            providesTags: ["PARCEL"],
        }),

        // ------ GET INCOMING PARCELS
        parcelHistory: builder.query<IResponse<IParcel>, void>({
            query: () => ({
                url: "/parcel/history",
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

        // ------ CANCEL A PARCEL
        cancelParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcel/${parcelId}/cancel`,
                method: 'PATCH'
            }),
            invalidatesTags: ['PARCEL']
        }),

        // ------ CONFIRM PARCEL DELIVERY
        confirmParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcel/${parcelId}/confirm-delivery`,
                method: 'PATCH'
            }),
            invalidatesTags: ['PARCEL']
        }),

        // ------ TRACK PARCEL
        trackParcel: builder.query<IResponse<ITrackParcelInfo>, string>({
            query: (id: string) => ({
                url: `/parcel/track-parcel/${id}`,
                method: "GET",
            }),
            providesTags: ["PARCEL"],
        }),
    }),
});

export const { useCreateParcelMutation, useAllParcelInfoQuery, useMyParcelsQuery, useSingleParcelInfoQuery, useIncomingParcelQuery, useUpdateParcelInfoMutation, useParcelHistoryQuery, useCancelParcelMutation, useConfirmParcelMutation, useLazyTrackParcelQuery } = parcelApi;