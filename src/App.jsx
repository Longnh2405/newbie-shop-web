import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { RouteBase } from 'constants/routeUrl';
import LoginPage from 'views/Login';
import DefaultLayout from 'layout/DefaultLayout';
import './scss/styles.scss';
import PrivateRouteAdmin from 'components/PrivateRouteAdmin';
import Home from 'views/Home';
import routesUser from 'routes/routesUser';
import HeaderLayoutUser from 'components/HeaderLayoutUser';
import Footer from 'components/Footer';
import CartProvider from 'providers/CartProvider';
import Register from 'views/Register';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import ProductsProvider from 'providers/ProductsProvider';
import Page404 from 'views/Page404';
import Order from './views/ProfileUser/Order';
import Profile from './views/ProfileUser/Profile';
import Noti from 'views/ProfileUser/Noti';

const App = () => {
  useEffect(() => {
    window.addEventListener('offline', (event) => {
      alert('Bạn đang offline');
    });
    return () => {
      window.removeEventListener('offline', (event) => {
        alert('Bạn đang offline');
      });
    };
  }, []);
  //! Render
  return (
    <Router>
      <Routes>
        <Route path={RouteBase.Login} exact element={<LoginPage />} />
        <Route path={RouteBase.Register} exact element={<Register />} />
        {routesUser.map((route, idx, arr) => {
          if (route.path === RouteBase.ProfileUser) {
            return (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                element={
                  <>
                    {/* <SimpleBarReact style={{ maxHeight: 'calc(100vh - 0px)' }}> */}
                    <ProductsProvider>
                      <CartProvider>
                        <HeaderLayoutUser />
                        <div style={{ width: '100%', paddingTop: '100px', backgroundColor: '#f5f5f5' }}>
                          <route.component />
                        </div>
                      </CartProvider>
                    </ProductsProvider>
                    <Footer />
                    {/* </SimpleBarReact> */}
                  </>
                }
              >
                <Route path={RouteBase.OrderUser} element={<Order />} />
                <Route path={RouteBase.ProfileUserTab} element={<Profile />} />
                <Route path={RouteBase.NotiUser} element={<Noti />} />
              </Route>
            );
          }
          return (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              element={
                <>
                  {/* <SimpleBarReact style={{ maxHeight: 'calc(100vh - 0px)' }}> */}
                  <ProductsProvider>
                    <CartProvider>
                      <HeaderLayoutUser />
                      <div style={{ width: '100%', paddingTop: '100px', backgroundColor: '#f5f5f5' }}>
                        <route.component />
                      </div>
                    </CartProvider>
                  </ProductsProvider>
                  <Footer />
                  {/* </SimpleBarReact> */}
                </>
              }
            />
          );
        })}
        <Route
          path="*"
          element={
            <PrivateRouteAdmin>
              <DefaultLayout />
            </PrivateRouteAdmin>
          }
        />
        <Route element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
