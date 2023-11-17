import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(()=> import('./NotFound')));
const LinkContactsForm = Loadable(lazy(()=> import('./link_contacts.jsx')));

const eventRoutes = [
    { path: '/link/contacts', element: <LinkContactsForm /> },
    { path: '/events/404', element: <NotFound /> },
];
    
export default eventRoutes;