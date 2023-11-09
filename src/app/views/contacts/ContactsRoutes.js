import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(()=> import('./NotFound')));
const SaldoContacts = Loadable(lazy(()=> import('./SaldoContacts')));
const ListaContactos = Loadable(lazy(()=> import('./ListaContactos')));

const contactsRoutes = [
    { path: '/contacts/balance', element: <SaldoContacts /> },
    { path: '/contacts/list', element: <ListaContactos />},
    { path: '/contacts/404', element: <NotFound /> },
];
    
export default contactsRoutes;