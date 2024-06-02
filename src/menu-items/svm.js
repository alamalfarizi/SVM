// assets
import { IconMail } from '@tabler/icons-react';

// constant
const icons = { IconMail };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const svm = {
  id: 'svm',
  title: 'SVM',
  type: 'group',
  children: [
    {
      id: 'smv',
      title: 'SVM',
      type: 'item',
      icon: icons.IconMail,
      url: '/svm/svm-check'
    }
  ]
};

export default svm;
