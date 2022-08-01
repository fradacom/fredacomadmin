import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { AUTH_PREFIX_PATH } from "configs/AppConfig";

const Login = lazy(() => import(`./authentication/login`));

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="page"/>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to={`${AUTH_PREFIX_PATH}/login`} /> } />
      </Routes>
    </Suspense>
  )
}

export default AppViews;

