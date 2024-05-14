import { lazy } from 'react';

// project imports
import MinimalLayout from '../layout/MinimalLayout';
import Loadable from '../ui-component/Loadable';

// login routing
const HomePage = Loadable(lazy(() => import('../views/landing/Home')));
const ComplaintPage = Loadable(lazy(() => import('../views/landing/Complaint')));
const ArtikelPage = Loadable(lazy(() => import('../views/landing/Article')));
const ResultPage = Loadable(lazy(() => import('../views/landing/Result')));

// ==============================|| AUTH ROUTING ||============================== //

const LandingRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/pengaduan',
      element: <ComplaintPage />
    },
    {
      path: '/artikel',
      element: <ArtikelPage />
    },
    {
      path: '/result/:id',
      element: <ResultPage />
    }
  ]
};

export default LandingRoutes;
