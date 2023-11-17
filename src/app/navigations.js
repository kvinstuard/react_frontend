export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'PAGES', type: 'label' },
  {
    name: "User's management",
    icon: 'person',
    children: [
      {name: 'User settings', iconText: 'SI', path: '/users/modify'},
      // { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
      // { name: 'Error', iconText: '404', path: '/session/404' },
    ],
  },
  {
    name: 'Contacts',
    icon: 'person_add',
    children: [
        {name: 'Contact list', iconText: 'SI', path:'/contacts/list'},
        {name: "Contact balance", iconText: 'SI', path: '/contacts/balance'},
        {name: "All Contacts pending$", iconText: 'SI', path: '/contacts/all/pending/balance'},
    ],
  },
  {
    name: 'Events',
    icon: 'store',
    children: [
        {name: 'Create event', iconText: 'SI', path:'/create/events'},
        {name: 'Modify event', iconText: 'SI', path:'/modify/events'},
        {name: 'My pending balance', iconText: 'SI', path:'/my-pending/balance'},
        {name: 'Add/Remove contacts', iconText: 'SI', path:'/link/contacts'},
        {name: 'All Activities', iconText: 'SI', path:'/all/Activities'},
    ],
  },
  {
    name: 'Activities',
    icon: 'local_activity',
    children: [
        {name: 'Accept activities', iconText: 'SI', path:'/accept/activities'},
    ],
  },
  // { label: 'Components', type: 'label' },
  // {
  //   name: 'Components',
  //   icon: 'favorite',
  //   badge: { value: '30+', color: 'secondary' },
  //   children: [
  //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
  //     { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
  //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
  //     { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
  //     { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
  //     { name: 'Form', path: '/material/form', iconText: 'F' },
  //     { name: 'Icons', path: '/material/icons', iconText: 'I' },
  //     { name: 'Menu', path: '/material/menu', iconText: 'M' },
  //     { name: 'Progress', path: '/material/progress', iconText: 'P' },
  //     { name: 'Radio', path: '/material/radio', iconText: 'R' },
  //     { name: 'Switch', path: '/material/switch', iconText: 'S' },
  //     { name: 'Slider', path: '/material/slider', iconText: 'S' },
  //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
  //     { name: 'Table', path: '/material/table', iconText: 'T' },
  //   ],
  // },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  // },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/',
  // },
];
