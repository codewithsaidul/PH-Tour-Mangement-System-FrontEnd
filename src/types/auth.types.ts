export interface ISendOtp {
    email: string
}
export interface IVeriyOTP {
    email: string;
    otp: string;
}


export interface ILogin {
    email: string;
    password: string;
}


export interface User {
  _id: string
  name: string
  email: string
  password: string
  role: string
  isDeleted: boolean
  isActive: string
  isVerified: boolean
  auths: Auth[]
  createdAt: string
  updatedAt: string
}

export interface Auth {
  provider: string
  providerId: string
}

export interface IAuthResponse {
  accessToken?: string
  refreshToken?: string
  user: User
}