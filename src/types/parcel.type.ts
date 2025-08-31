import type { TRole } from "./user.type";

export type TServiceType = "REGULAR" | "SAME DAY";
export type TDeliveryType = "HOME" | "ADDRESS POINT";
export type TParcelType = 'FRAGILE' | "CLOTHES" | "ELECTRONICS" | "FOOD ITEMS" | "MEDICAL" | "DOCUMENTS" | "OTHERS"
export type TParcelStatus = 'REQUESTED' | "APPROVED" | "DISPATCHED" | "IN TRANSIT" | "OUT FOR DELIVERY" | "DELIVERED" | "CONFIRMED" | "CANCELLED" | "BLOCKED"
export type TAgentParcelStatus = 'DISPATCHED' | "IN TRANSIT" | "OUT FOR DELIVERY" | "DELIVERED";



export interface IParcelStatusLog {
    status: TParcelStatus;
    timeStamp?: string;
    updatedBy: TRole;
    updaterId: string;
    location?: string;
}

export interface IParcel {
    _id?: string;
    trackingId?: string;
    serviceType?: TServiceType;
    deliveryType?: TDeliveryType;
    parcelType?: TParcelType;
    senderEmail?: string;
    senderId?: string;
    receiverName?: string;
    receiverEmail?: string;
    receiverPhone: string;
    pickUpAddress: string;
    deliveryAddress: string;
    weight: number;
    codAmount: number;  // COLLECT FROM CUSTOMER AMOUNT
    agentId?: string;
    currentStatus: TParcelStatus;
    parcelStatusLog: IParcelStatusLog[];
    createdAt?: string;
    updatedAt?: string;
}