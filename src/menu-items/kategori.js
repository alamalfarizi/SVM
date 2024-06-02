// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const kategori = {
  id: 'kategori',
  title: 'Kategori',
  type: 'group',
  children: [
    {
      id: 'kategori',
      title: 'Kategori',
      type: 'item',
      icon: icons.IconDashboard,
      url: '/kategori/kategori-check'
    },
  ]
};

export default kategori;
