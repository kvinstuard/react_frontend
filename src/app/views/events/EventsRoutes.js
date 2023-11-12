import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(()=> import('./NotFound')));
const CreateEventsForm = Loadable(lazy(()=> import('./create_events.jsx')));

const userRoutes = [
    { path: '/create/events', element: <CreateEventsForm /> },
    { path: '/events/404', element: <NotFound /> },
];
    
export default userRoutes;