import React, { useContext, ReactNode } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouter() {
  const { userDetails } = useContext(AuthContext);
  console.log(userDetails?.userId);
  if (!userDetails?.userId) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default ProtectedRouter;
