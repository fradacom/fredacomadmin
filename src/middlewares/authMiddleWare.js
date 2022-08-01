import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, Outlet, useLocation } from "react-router-dom";
import { AUTH_PREFIX_PATH } from "configs/AppConfig";
import { connect } from "react-redux";
import { saveUserData, authenticated, showAuthMessage, signOut} from '../redux/actions/Auth';
import JwtAuthService from "services/JwtAuthService";
import { AUTH_TOKEN, REDIRECT_PATH, REFRESH_TOKEN } from "../redux/constants/Auth";
import Loading from "components/shared-components/Loading";

const AuthMiddleWare = (props) => {
  let navigate = useNavigate();
  let location = useLocation();

  const {
    saveUserData,
    authUser,
    signOut,
    isAuthenticated,
    showAuthMessage,
  } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem(REDIRECT_PATH, location.pathname);
    if (!authUser) {
      setIsLoading(true);
      JwtAuthService.user()
      .then((response) => {
        saveUserData(response.data);
      })
      .catch((e) => {
        showAuthMessage(["Account could not be resolved"]);
        signOut();
        localStorage.removeItem(AUTH_TOKEN);
        sessionStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(REDIRECT_PATH);
        navigate(`${AUTH_PREFIX_PATH}/login`);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }else{
      setIsLoading(false);
    }
  }, []);
    
  return (
    <>
      {isLoading === true ? (
        <Loading cover="page" />
      ) : (
        isAuthenticated ?
        <Outlet />
       :
        <Navigate
          to={{
            pathname: AUTH_PREFIX_PATH,
            state: { from: location },
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, Navigate, authUser } = auth;
  return { loading, message, showMessage, token, Navigate, authUser };
};

const mapDispatchToProps = {
	authenticated,
  showAuthMessage,
  saveUserData,
  signOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthMiddleWare);
