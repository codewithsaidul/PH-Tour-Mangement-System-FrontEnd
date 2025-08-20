import type { ComponentType } from "react";

export type { ISendOtp, IVeriyOTP, ILogin, IAuthResponse } from "./auth.types";
export type { TRole } from "./user.types"
export type { IAddTourType, ITourType, ITour } from "./tour.types"
export type { IDivision, IAddDivision } from "./division.types"


export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[]
}
