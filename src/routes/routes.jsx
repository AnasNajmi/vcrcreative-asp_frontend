// Auth Routes
import Login from '../containers/Login';

// Superadmin Routes
// eslint-disable-next-line import/no-cycle
import Admins from '../containers/superadmin/admins/Admins';
// eslint-disable-next-line import/no-cycle
import Services from '../containers/superadmin/services/Services';

// Icons
import admin from '../assets/images/admin.svg';
import service from '../assets/images/service.svg';
import serviceAdmin from '../assets/images/serviceAdmin.svg';
import products from '../assets/images/products.svg';
import checklist from '../assets/images/checklist.svg';
import settings from '../assets/images/Setting.svg';
import tank from '../assets/images/aquarium.svg';

// child imports
import Tanks from '../containers/admin/tanks/Tanks';
import Clients from '../containers/admin/services/clients/Clients';
import Aquarium from '../containers/admin/services/aquariums/Aquarium';
import ServiceHistory from '../containers/admin/services/serviceHistory/ServiceHistory';
import Checklist from '../containers/admin/checklistBuilder/Checklist';
import Technicians from '../containers/admin/dashboard/technicians/Technicians';
import Products from '../containers/admin/products/Products';

// Routes for login
const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    layout: '/auth',
    element: <Login />,
  },
];

// Routes for Superadmin
const superadminRoutes = [
  {
    layout: '/superadmin',
    path: '/admins',
    name: 'Admins',
    icon: admin,
    element: <Admins />,
  },
  {
    layout: '/superadmin',
    path: '/services',
    name: 'Services',
    icon: service,
    element: <Services />,
  },
];

// Routes for patient
const adminRoutes = [
  {
    layout: '/admin',
    path: '/technicians',
    name: 'Technicians',
    icon: admin,
    element: <Technicians />,
  },
  {
    layout: '/admin',
    path: '/services/aquariums',
    name: 'Services',
    icon: serviceAdmin,
    element: <Aquarium />,
    key: '1',
    child: [
      {
        layout: '/admin',
        path: '/services/clients',
        name: 'Clients',
        element: <Clients />,
        key: '2',
      },
      {
        layout: '/admin',
        path: '/services/aquariums',
        name: 'Aquariums',
        element: <Aquarium />,
        key: '3',
      },
      {
        layout: '/admin',
        path: '/services/servicehistory',
        name: 'Service History',
        element: <ServiceHistory />,
        key: '4',
      },
    ],
  },

  {
    layout: '/admin',
    path: '/settings/tankDetails',
    name: 'Settings',
    icon: settings,
    element: <Tanks />,
    key: '1',
    child: [
      {
        layout: '/admin',
        path: '/settings/tasklistBuilder',
        name: 'Task List Builder',
        icon: checklist,
        element: <Checklist />,
        key: '2',
      },
      {
        layout: '/admin',
        path: '/settings/tankDetails',
        name: 'Tank Details',
        icon: tank,
        element: <Tanks />,
        key: '3',
      },
      {
        layout: '/admin',
        path: '/settings/products',
        name: 'Products',
        icon: products,
        element: <Products />,
        key: '4',
      },
      {
        layout: '/admin',
        path: '/settings/billing',
        name: 'Billing',
        icon: service,
        key: '5',
      },
    ],
  },
];

// Getting all routes
// eslint-disable-next-line object-curly-newline
export { authRoutes, superadminRoutes, adminRoutes };
