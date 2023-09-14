import CommonIcons from 'components/CommonIcons';
import IconDoc from 'components/CommonIcons/IconMenu/IconDoc';
import { RouteBase } from './routeUrl';
import React from 'react';
import IconDecentralization from 'components/CommonIcons/IconMenu/IconDecentralization';
import IconEditChange from 'components/CommonIcons/IconMenu/IconEditChange';
import IconActivity from 'components/CommonIcons/IconMenu/IconActivity';
import IconCategory from 'components/CommonIcons/IconMenu/IconCategory';
import IconCall from 'components/CommonIcons/IconMenu/IconCall';
import Icon2User from 'components/CommonIcons/IconMenu/Icon2User';
import IconHome from 'components/CommonIcons/IconMenu/IconHome';
import IconChart from 'components/CommonIcons/IconMenu/IconChart';
import IconSquare from 'components/CommonIcons/IconMenu/IconSquare';


export const leftmenu = [
  {
    'Quản lý': [
      {
        label: 'Quản lý sản phẩm',
        icon: IconDoc,
        path: RouteBase.ProductManage,
      },
      {
        label: 'Quản lý đơn hàng',
        icon: IconDecentralization,
        path: RouteBase.OrderManage,
      },
      {
        label: 'Phân loại sản phẩm',
        icon: IconDecentralization,
        path: RouteBase.CatalogManage,
      },
    ],
  },
  {
    'Chăm sóc khách hàng': [
      {
        label: 'Chat',
        icon: IconCall,
        path: RouteBase.Chat,
      },
    ],
  },
];
