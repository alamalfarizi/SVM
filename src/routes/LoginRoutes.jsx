import { lazy } from 'react';

// project imports
import MinimalLayout from '../layout/MinimalLayout';
import Loadable from '../ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Login3')));
const AuthRegister = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/register',
      element: <AuthRegister />
    },
    
  ]
};

export default LoginRoutes;
