import { lazy } from 'react';
import Loadable from '../../ui-component/Loadable';
const ApplicationPage = Loadable(lazy(() => import('../../views/pengaturan/Application/Application')));
const ApplicationInputPage = Loadable(lazy(() => import('../../views/pengaturan/Application/ApplicationInput')));

const ApplicationRoutes = [
  {
    path: 'user',
    element: <ApplicationPage />
  },
  {
    path: 'user/add',
    element: <ApplicationInputPage />
  },
  {
    path: 'user/edit/:id',
    element: <ApplicationInputPage />
  },
]

export default ApplicationRoutes;
