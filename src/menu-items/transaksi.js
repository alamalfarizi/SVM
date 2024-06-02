// assets
import { IconMail } from '@tabler/icons-react';

// constant
const icons = { IconMail };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const transaksi = {
  id: 'transaksi',
  title: 'Transaksi',
  type: 'group',
  children: [
    {
      id: 'transaksi',
      title: 'Transaksi',
      type: 'item',
      icon: icons.IconMail,
      url: '/transaksi/transaksi-check'
    }
  ]
};

export default transaksi;
