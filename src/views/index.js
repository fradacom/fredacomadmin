import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import AuthLayout from "layouts/auth-layout";
import DashboardLayout from "layouts/dashboard-layout";
import { AUTH_PREFIX_PATH, DASHBOARD_PREFIX_PATH, ERROR_PREFIX_PATH } from 'configs/AppConfig'
import AuthMiddleWare from "middlewares/authMiddleWare";
import GuestMiddleWare from "middlewares/guestMiddleWare";
import Error404 from "./errors/unauthorized";
import Unauthorized from "./errors/unauthorized";

const Login = lazy(() => import(`views/auth-views/authentication/login`));

export const Views = (props) => {
  const { token } = props;
  return (
    <Routes>
       <Route path="/" element={<Login />} />
      <Route element={<GuestMiddleWare isAuthenticated={token} /> }>
        <Route path={`${AUTH_PREFIX_PATH}/*`} element={<AuthLayout/>} />
      </Route>
      <Route element={<AuthMiddleWare isAuthenticated={token}/> }>
        <Route path={`${DASHBOARD_PREFIX_PATH}/*`} element={<DashboardLayout />}/>
      </Route>
      <Route path={`${ERROR_PREFIX_PATH}/unauthorized`} element={<Unauthorized/>} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

const mapStateToProps = ({ auth }) => {
  const { token, authUser } = auth;
  return { token, authUser }
};

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Views);
