import { lazy } from 'react';
import Loadable from '../../ui-component/Loadable';
const AccountPage = Loadable(lazy(() => import('../../views/pengaturan/Account/Account')));

const AccountRoutes = [
  {
    path: 'akun',
    element: <AccountPage />
  },
]

export default AccountRoutes;
