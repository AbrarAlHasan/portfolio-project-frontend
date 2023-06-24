import React, { useContext, useEffect, useState } from "react";
import {
  getAllUsers,
  logout,
} from "../../../Axios/Authentication/authentication";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

function Index() {
  const { setUserDetails } = useContext(AuthContext);
  const handleClick = async () => {
    const response = await getAllUsers();
    console.log(response);
  };

  const handleLogout = async () => {
    const response = await logout();
    setUserDetails(undefined);
    console.log(response);
  };

  return (
    <div>
      <button onClick={handleClick}>ClickMe</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Index;
