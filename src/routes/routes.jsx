import { lazy } from 'react';
import withErrorBoundary from 'components/HOCs/withErrorBoundary';
import { RouteBase } from 'constants/routeUrl';

const Page404 = lazy(() => import('views/Page404'));
const Permission = lazy(() => import('views/Permission'));
const Profile = lazy(() => import('views/Profile'));
const UserList = lazy(() => import('views/UserList'));
const CatalogManage = lazy(() => import('views/CatalogManage'));
const Chat = lazy(() => import('views/Chat'));

//* For secured route
const routes = [
  {
    path: RouteBase.OrderManage,
    exact: true,
    name: 'Perrmission',
    component: withErrorBoundary(Permission),
  },
  {
    path: RouteBase.ProductManage,
    exact: true,
    name: 'UserList',
    component: withErrorBoundary(UserList),
  },

  {
    path: RouteBase.Profile,
    exact: true,
    name: 'Profile',
    component: withErrorBoundary(Profile),
  },
  {
    path: RouteBase.CatalogManage,
    exact: true,
    name: 'CatalogManage',
    component: withErrorBoundary(CatalogManage),
  },
  {
    path: RouteBase.Chat,
    exact: true,
    name: 'Chat',
    component: withErrorBoundary(Chat),
  },

  { name: '404', component: withErrorBoundary(Page404) },
];

export default routes;
