import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import contactsRoutes from './views/contacts/ContactsRoutes';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes, 
      ...contactsRoutes],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="session/signin" /> },
  { path: '/dashboard', element: <Navigate to="default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
