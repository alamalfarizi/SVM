// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const article = {
  id: 'article',
  title: 'Article',
  type: 'group',
  children: [
    {
      id: 'article',
      title: 'Article',
      type: 'item',
      icon: icons.IconDashboard,
      url: '/article/article-check'
    },
  ]
};

export default article;
