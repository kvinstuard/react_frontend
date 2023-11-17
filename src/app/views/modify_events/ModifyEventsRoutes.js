import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(()=> import('./NotFound')));
const ModifyEventsForm = Loadable(lazy(()=> import('./modify_events.jsx')));

const eventRoutes = [
    { path: '/modify/events', element: <ModifyEventsForm /> },
    { path: '/events/404', element: <NotFound /> },
];
    
export default eventRoutes;