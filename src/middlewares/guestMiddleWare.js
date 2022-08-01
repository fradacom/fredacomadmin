import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { DASHBOARD_PREFIX_PATH } from "configs/AppConfig";

const GuestMiddleWare = (props) => {
  const {
    isAuthenticated,
    location
  } = props;
  return (
    <>
      {
        !isAuthenticated ?
        <Outlet />
       :
        <Navigate
          to={{
            pathname: DASHBOARD_PREFIX_PATH,
            state: { from: location },
          }}
        />
      }
    </>
  );
};

export default GuestMiddleWare;
