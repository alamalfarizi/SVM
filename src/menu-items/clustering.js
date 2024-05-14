// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const clustering = {
  id: 'clustering',
  title: 'Clustering',
  type: 'group',
  children: [
    {
      id: 'clustering',
      title: 'Clustering',
      type: 'item',
      icon: icons.IconDashboard,
      url: '/clustering/grafik'
    },
  ]
};

export default clustering;
