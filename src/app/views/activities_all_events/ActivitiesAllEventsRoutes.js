import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(()=> import('./NotFound')));
const ActivitiesAllEvents = Loadable(lazy(()=> import('./ActivitiesAllEvents.jsx')));

const eventRoutes = [
    { path: '/all/Activities', element: <ActivitiesAllEvents /> },
    { path: '/events/404', element: <NotFound /> },
];
    
export default eventRoutes;