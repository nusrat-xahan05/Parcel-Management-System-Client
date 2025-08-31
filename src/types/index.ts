import type { ComponentType } from 'react';

export type { ILogin } from './auth.type';
export type { ISendOtp, IVerifyOtp } from './otp.type';
export type { TRole } from './user.type';
export type { IUser } from './user.type';
export type { IParcel } from './parcel.type';

export interface ISidebarItem {
    title: string;
    items: {
        title: string;
        url: string;
        component: ComponentType;
    }[];
}

interface TMeta {
    page: number;
    limit: number;
    totalPage: number;
    total: number
}

export interface IResponse<T> {
    statusCode?: number;
    success: boolean;
    message: string;
    data?: T;
    meta?: TMeta
}