import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import ProtectedRoute from '../utils/ProtectedRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// data routing
const DataPage = Loadable(lazy(() => import('../views/data/DataCheck')));
const DataAddPage = Loadable(lazy(() => import('../views/data/DataAdd')));
const DataDetailPage = Loadable(lazy(() => import('../views/data/DataDetail')));
const DataAddAnswer = Loadable(lazy(() => import('../views/data/DataAddAnswer')));

// Pengaduan routing
const PengaduanPage = Loadable(lazy(() => import('../views/pengaduan/PengaduanCheck')));
const PengaduanDetailPage = Loadable(lazy(() => import('../views/pengaduan/PengaduanCheckDetail')));
const PengaduanAddPage = Loadable(lazy(() => import('../views/pengaduan/PengaduanAdd')));

// Article routing
const ArticlePage = Loadable(lazy(() => import('../views/article/ArticleCheck')));
const ArticleDetailPage = Loadable(lazy(() => import('../views/article/ArticleDetail')));
const ArticleAddPage = Loadable(lazy(() => import('../views/article/ArticleAdd')));

// Pengaturan
import ApplicationRoutes from './pengaturan/application-routers';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

    // Data Routes
    {
      path: 'data',
      children: [
        {
          path: 'data-check',
          element: <DataPage />
        },
        {
          path: 'data-add',
          element: <DataAddPage />
        },
        {
          path: 'data-detail/:id',
          element: <DataDetailPage />
        },
        {
          path: 'data-answer/:id',
          element: <DataAddAnswer />
        }
      ]
    },

    // Pengaduan Routes
    {
      path: 'pengaduan',
      children: [
        {
          path: 'pengaduan-check',
          element: <PengaduanPage />
        },
        {
          path: 'pengaduan-detail/:id',
          element: <PengaduanDetailPage />
        },
        {
          path: 'pengaduan-add',
          element: <PengaduanAddPage />
        }
      ]
    },

    // Article
    {
      path: 'article',
      children: [
        {
          path: 'article-check',
          element: <ArticlePage />
        },
        {
          path: 'article-detail/:id',
          element: <ArticleDetailPage />
        },
        {
          path: 'article-add',
          element: <ArticleAddPage />
        }
      ]
    },

    // Pengaturan
    {
      path: 'pengaturan',
      children: [...ApplicationRoutes]
    }
  ]
};

export default MainRoutes;
