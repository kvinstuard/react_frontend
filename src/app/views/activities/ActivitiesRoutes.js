import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(()=> import('./NotFound')));
const CrearActividad = Loadable(lazy(()=> import('./CreateActivities.jsx')));

const ActivitiesRoutes = [
    { path: '/create/activities', element: <CrearActividad /> },
    { path: '/activities/404', element: <NotFound /> },
];
    
export default ActivitiesRoutes;