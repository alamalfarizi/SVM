import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import ProtectedRoute from '../utils/ProtectedRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
const MonthlyCalendar = Loadable(lazy(() => import('../views/dashboard/MonthlyCalendar')));

// data routing
const DataPage = Loadable(lazy(() => import('../views/data/DataCheck')));
const DataAddPage = Loadable(lazy(() => import('../views/data/DataAdd')));
const DataDetailPage = Loadable(lazy(() => import('../views/data/DataDetail')));

// Pengaduan routing
const PengaduanPage = Loadable(lazy(() => import('../views/pengaduan/PengaduanCheck')));
const PengaduanDetailPage = Loadable(lazy(() => import('../views/pengaduan/PengaduanCheckDetail')));
const PengaduanAddPage = Loadable(lazy(() => import('../views/pengaduan/PengaduanAdd')));

// clustering routing
const ClusteringPage = Loadable(lazy(() => import('../views/clustering/Clustering')));

// Article routing
const ArticlePage = Loadable(lazy(() => import('../views/article/ArticleCheck')));
const ArticleDetailPage = Loadable(lazy(() => import('../views/article/ArticleDetail')));
const ArticleAddPage = Loadable(lazy(() => import('../views/article/ArticleAdd')));

// Pengaturan
import AccountRoutes from './pengaturan/account-routers';
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
        },
        {
          path: 'monthly-calendar',
          element: <MonthlyCalendar />
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

    // Clustering
    {
      path: 'clustering',
      children: [
        {
          path: 'grafik',
          element: <ClusteringPage />
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
      children: [...AccountRoutes, ...ApplicationRoutes]
    }
  ]
};

export default MainRoutes;
