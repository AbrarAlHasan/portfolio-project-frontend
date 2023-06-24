import { Dispatch, SetStateAction } from "react";

export interface AuthContextType {
  userDetails: any
  setUserDetails: Dispatch<SetStateAction<AuthContextType | undefined>>;
}

export interface AuthProviderType {
  children: JSX.Element | JSX.Element[];
}
