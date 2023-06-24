import React, { ReactNode, createContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderType } from "./AuthContextType";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
function AuthProvider({ children }: AuthProviderType) {
  const [userDetails, setUserDetails] = useState<AuthContextType>();

  const value: AuthContextType = {
    userDetails,
    setUserDetails,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
