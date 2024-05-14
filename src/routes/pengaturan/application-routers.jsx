import { lazy } from 'react';
import Loadable from '../../ui-component/Loadable';
const ApplicationPage = Loadable(lazy(() => import('../../views/pengaturan/Application/Application')));

const ApplicationRoutes = [
  {
    path: 'user',
    element: <ApplicationPage />
  },
  
]

export default ApplicationRoutes;
