import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(()=> import('./NotFound')));
const AcceptActivities = Loadable(lazy(()=> import('./acceptActivities')));

const eventRoutes = [
    { path: '/accept/activities', element: <AcceptActivities /> },
    { path: '/events/404', element: <NotFound /> },
];
    
export default eventRoutes;