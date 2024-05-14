import { useRoutes } from 'react-router-dom';

// routes
import LandingRoutes from './LandingRoutes';
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import NotFoundRoutes from './NotFoundRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([LandingRoutes, LoginRoutes, MainRoutes, NotFoundRoutes]);
}
