import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RouteBase } from 'constants/routeUrl';
import { useAuthentication } from 'providers/AuthenticationProvider';
import { ROLE } from 'constants';
import Page404 from 'views/Page404';

const PrivateRouteAdmin = (props) => {
  const { isLogged, userInfo, token } = useAuthentication();
  const path = useLocation().pathname;
  const routes = Object.values(RouteBase);
  const checkRoute=routes.find((item) => item === path)
  //! Render
  if (isLogged && userInfo.role === ROLE.ADMIN) {
    if(!checkRoute)return <Page404/>
    return props.children;
  }

  return <Navigate to={RouteBase.Login} replace />;
};

export default PrivateRouteAdmin;
