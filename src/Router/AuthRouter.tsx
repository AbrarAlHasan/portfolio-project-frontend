import React, { useContext, ReactNode } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function AuthRouter() {
  const { userDetails } = useContext(AuthContext);
  if (userDetails?.userId) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
}

export default AuthRouter;
