// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const data = {
  id: 'data',
  title: 'Data',
  type: 'group',
  children: [
    {
      id: 'data',
      title: 'Data',
      type: 'item',
      icon: icons.IconDashboard,
      url: '/data/data-check'
    },
  ]
};

export default data;