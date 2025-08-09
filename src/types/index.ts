export type { ISendOtp, IVeriyOTP, ILogin, IAuthResponse } from "./auth.types";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}


