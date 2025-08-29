export type TRole = "ADMIN" | "AGENT" | "SENDER" | "RECEIVER";
export type TUserStatus = "ACTIVE" | "BLOCKED"
export type TAgentStatus = 'NOT_REQUESTED' | "PENDING" | "APPROVED" | "REJECTED"

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    role: string;
    isVerified?: boolean;
    phone?: string;
    address?: string;
    userStatus?: TUserStatus;
    agentStatus?: TAgentStatus;
    createdAt?: string;
    updatedAt?: string;
}
