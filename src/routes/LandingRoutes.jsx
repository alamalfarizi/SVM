import { lazy } from 'react';

// project imports
import MinimalLayout from '../layout/MinimalLayout';
import Loadable from '../ui-component/Loadable';

// login routing
const HomePage = Loadable(lazy(() => import('../views/landing/Home')));
// ==============================|| AUTH ROUTING ||============================== //

const LandingRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <HomePage />
    },
 
    
  ]
};

export default LandingRoutes;
