// assets
import { IconUserCheck } from '@tabler/icons-react';

// constant
const icons = { IconUserCheck };

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pengaduan = {
  id: 'pengaduan',
  title: 'Pengaduan',
  type: 'group',
  children: [
    {
      id: 'pengaduan',
      title: 'Pengaduan',
      type: 'item',
      icon: icons.IconUserCheck,
      url: '/pengaduan/pengaduan-check'
    }
  ]
};

export default pengaduan;
