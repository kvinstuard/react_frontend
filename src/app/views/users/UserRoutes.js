import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(()=> import('./NotFound')));
const ModificarUsuario = Loadable(lazy(()=> import('./ModificarUsuario')));

const userRoutes = [
    { path: '/users/modify', element: <ModificarUsuario /> },
    { path: '/users/404', element: <NotFound /> },
];
    
export default userRoutes;