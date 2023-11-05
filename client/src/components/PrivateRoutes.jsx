import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";

function PrivateRoutes() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
