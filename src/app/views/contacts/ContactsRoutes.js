import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(()=> import('./NotFound')));
const SaldoContacts = Loadable(lazy(()=> import('./SaldoContacts')));

const contactsRoutes = [
    { path: '/contacts/saldos', element: <SaldoContacts /> },
    { path: '/contacts/404', element: <NotFound /> },
];
    
export default contactsRoutes;