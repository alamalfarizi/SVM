import { lazy } from 'react';

// project imports
import Loadable from '../ui-component/Loadable';
import MinimalLayout from '../layout/MainLayout';

const NotFound404 = Loadable(lazy(() => import('../views/404')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const NotFoundRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: "*",
      element: <NotFound404 />,
    },
  ]
};

export default NotFoundRoutes;
