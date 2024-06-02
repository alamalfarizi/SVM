import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import ProtectedRoute from '../utils/ProtectedRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// product routing
const ProductCheck = Loadable(lazy(() => import('../views/product/ProductCheck')));
const ProductAdd = Loadable(lazy(() => import('../views/product/ProductAdd')));
const ProductDetail = Loadable(lazy(() => import('../views/product/ProductDetail')));

// kategori routing
const KategoriCheck = Loadable(lazy(() => import('../views/kategori/KategoriCheck')));
const KategoriAdd = Loadable(lazy(() => import('../views/kategori/KategoriAdd')));
const KategoriDetail = Loadable(lazy(() => import('../views/kategori/KategoriDetail')));

// transaksi routing
const TransaksiCheck = Loadable(lazy(() => import('../views/transaksi/TransaksiCheck')));
const TransaksiAdd = Loadable(lazy(() => import('../views/transaksi/TransaksiAdd')));
const TransaksiDetail = Loadable(lazy(() => import('../views/transaksi/TransaksiDetail')));

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

    // Product
    {
      path: 'product',
      children: [
        {
          path: 'product-check',
          element: <ProductCheck />
        },
        {
          path: 'product-add',
          element: <ProductAdd />
        },
        {
          path: 'product-detail/:id',
          element: <ProductDetail />
        }
      ]
    },

    // Kategori
    {
      path: 'kategori',
      children: [
        {
          path: 'kategori-check',
          element: <KategoriCheck />
        },
        {
          path: 'kategori-add',
          element: <KategoriAdd />
        },
        {
          path: 'kategori-detail/:id',
          element: <KategoriDetail />
        }
      ]
    },

    // Transaksi
    {
      path: 'transaksi',
      children: [
        {
          path: 'transaksi-check',
          element: <TransaksiCheck />
        },
        {
          path: 'transaksi-add',
          element: <TransaksiAdd />
        },
        {
          path: 'transaksi-detail/:id',
          element: <TransaksiDetail />
        }
      ]
    }
  ]
};

export default MainRoutes;
