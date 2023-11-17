import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(()=> import('./NotFound')));
const CreateEventsForm = Loadable(lazy(()=> import('./create_events.jsx')));
const MyPendingBalance = Loadable(lazy(()=> import('./MyPendingBalance')));

const eventRoutes = [
    { path: '/create/events', element: <CreateEventsForm /> },
    { path: '/my-pending/balance', element: <MyPendingBalance /> },
    { path: '/events/404', element: <NotFound /> },
];
    
export default eventRoutes;