// assets
import { IconFile } from '@tabler/icons-react';

// constant
const icons = { IconFile };

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const dataset = {
  id: 'product',
  title: 'Product',
  type: 'group',
  children: [
    {
      id: 'product',
      title: 'Product',
      type: 'item',
      icon: icons.IconFile,
      url: '/product/product-check'
    }
  ]
};

export default dataset;
