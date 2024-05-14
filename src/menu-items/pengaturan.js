// assets
import { IconSettings } from '@tabler/icons-react';

// constant
const icons = { IconSettings };

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pengaturan = {
  id: 'pengaturan',
  title: 'Pengaturan',
  type: 'group',
  children: [
    {
      id: 'pengaturan',
      title: 'Pengaturan',
      type: 'collapse',
      icon: icons.IconSettings,
      children: [
        {
          id: 'akun',
          title: 'Akun',
          type: 'item',
          url: '/pengaturan/akun'
        },
        {
          id: 'aplikasi',
          title: 'Aplikasi',
          type: 'item',
          url: '/pengaturan/user'
        }
      ]
    }
  ]
};

export default pengaturan;
