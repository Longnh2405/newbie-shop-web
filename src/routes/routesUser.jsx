import { lazy } from 'react';
import withErrorBoundary from 'components/HOCs/withErrorBoundary';
import { RouteBase } from 'constants/routeUrl';
import Page404 from 'views/Page404';
import Home from 'views/Home';
import Product from 'views/Product';
import Cart from 'views/Cart';
import Catalog from 'views/Catalog';
import Payment from 'views/Payment';
import Support from 'views/Support';
import ProfileUser from 'views/ProfileUser';

//* For secured route
const routesUser = [
  { name: '404', component: withErrorBoundary(Page404) },

  {
    path: RouteBase.Home,
    exact: true,
    name: 'Home',
    component: withErrorBoundary(Home),
  },
  {
    path: RouteBase.Product,
    exact: true,
    name: 'Product',
    component: withErrorBoundary(Product),
  },
  {
    path: RouteBase.Cart,
    exact: true,
    name: 'Cart',
    component: withErrorBoundary(Cart),
  },
  {
    path: RouteBase.Catalog,
    exact: true,
    name: 'Catalog',
    component: withErrorBoundary(Catalog),
  },
  {
    path: RouteBase.Payment,
    exact: true,
    name: 'Payment',
    component: withErrorBoundary(Payment),
  },
  {
    path: RouteBase.Support,
    exact: true,
    name: 'Support',
    component: withErrorBoundary(Support),
  },
  {
    path: RouteBase.ProfileUser,
    exact: true,
    name: 'ProfileUser',
    component: withErrorBoundary(ProfileUser),
  },
];

export default routesUser;
