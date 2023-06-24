import React, { ElementType, useEffect } from "react";
import { verifyRefreshToken } from "../../Axios/Authentication/authentication";
import { Outlet } from "react-router-dom";

function PersistLogin({ children }: any) {
  const handleRefreshToken = async () => {
    const response = await verifyRefreshToken();
    console.log(response);
  };
  useEffect(() => {
    handleRefreshToken();
  }, []);
  return <Outlet />;
}

export default PersistLogin;
