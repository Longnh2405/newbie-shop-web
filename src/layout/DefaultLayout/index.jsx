import React, { Fragment, Suspense, useEffect } from 'react';
import PrivateRouteAdmin from 'components/PrivateRouteAdmin';
import routes from 'routes/routes';
import { Route, Routes, useLocation } from 'react-router-dom';
import LayoutWithDrawerAndAppbar from 'components/LayoutWithDrawerAndAppbar';
import CommonIcons from 'components/CommonIcons';
import { RouteBase } from 'constants/routeUrl';
import CommonStyles from 'components/CommonStyles';
import { leftmenu } from 'constants/leftmenu';
import HeaderProfile from 'components/HeaderProfile';
import HeaderLayoutContent from 'components/HeaderLayoutContent';
import { CircularProgress, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuthentication } from 'providers/AuthenticationProvider';
import Page404 from 'views/Page404';

const useStyle = makeStyles((theme) => ({
  loading: {
    width: '100%',
    height: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const DefaultLayout = (props) => {
  //! State
  const classes = useStyle();
  const { userInfo } = useAuthentication();

  const { pathname } = useLocation();

  let label = '';

  leftmenu.forEach((item) => {
    Object.keys(item).forEach((key) => {
      item[key].map((elm) => {
        if (elm?.path === pathname) {
          label = elm?.label;
          return;
        }
      });
    });
  });

  //! Function

  //! Render
  return (
    <Fragment>
      <LayoutWithDrawerAndAppbar
        header={<HeaderProfile />}
        headerContent={<HeaderLayoutContent header={label} title="" />}
        leftMenu={leftmenu}
      >
        <Suspense
          fallback={
            <Box className={classes.loading}>
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            {routes.map((route, idx, arr) => {
              return (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  element={
                    route.isPrivateRoute ? (
                      <PrivateRouteAdmin>
                        <route.component />
                      </PrivateRouteAdmin>
                    ) : (
                      <route.component />
                    )
                  }
                />
              );
            })}
          </Routes>
        </Suspense>
      </LayoutWithDrawerAndAppbar>
    </Fragment>
  );
};

export default DefaultLayout;
