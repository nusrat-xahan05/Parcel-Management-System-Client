export interface IParcelAnalyticsItem {
    _id: string | number;
    count: number;
}

export interface IParcelAnalyticsResponse {
    totalParcels?: number;
    pendingParcels?: number;
    approvedParcels?: number;
    dispatchedParcels?: number;
    inTransitParcels?: number;
    outForDeliveryParcels?: number;
    deliveredParcels?: number;
    confirmedParcels?: number;
    cancelledParcels?: number;
    blockedParcels?: number;

    newParcelsLast7Days?: number;
    newParcelsLast30Days?: number;

    monthlyParcels?: IParcelAnalyticsItem[];
    parcelsByStatus?: IParcelAnalyticsItem[];
    parcelsByServiceType?: IParcelAnalyticsItem[];
    parcelsByParcelType?: IParcelAnalyticsItem[];
    parcelsByDeliveryType?: IParcelAnalyticsItem[];
}