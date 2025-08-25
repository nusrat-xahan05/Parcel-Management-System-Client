import type { IUser } from "./user.type";

export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResponseData {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}