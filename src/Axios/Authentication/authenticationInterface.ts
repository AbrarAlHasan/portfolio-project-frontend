export interface registerType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | null ;
  password: string;
  re_password: string;
}

export interface verifyEmailType {
  otp: number | null | undefined;
  userId: string | undefined;
}

export interface loginType{
  email:string | undefined,
  password:string | undefined
}