import { baseApi } from "@/redux/baseApi";
import type { IParcelAnalyticsResponse, IResponse } from "@/types";

export const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // ------ GET PARCEL STATS
        parcelStats: builder.query<IResponse<IParcelAnalyticsResponse>, void>({
            query: () => ({
                url: "/stats/parcel",
                method: "GET",
            }),
            providesTags: ["PARCEL"],
        }),
    }),
});

export const { useParcelStatsQuery } = statsApi;