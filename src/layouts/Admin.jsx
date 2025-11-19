// Init
import React, { useLayoutEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

// Routes
import { adminRoutes } from '../routes/routes';

import { Store, UpdateStore } from '../StoreContext';
import api from '../api';
import Sidebar from '../components/Sidebar';
import Schedule from '../containers/admin/dashboard/schedule.jsx/schedule';
import SplashScreen from '../components/SplashScreen';

function Admin() {
  const { admin } = Store();
  const { pathname } = useLocation();
  const updateStore = UpdateStore();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
    api('get', '/admins/auth')
      .then(({ data }) => {
        setLoading(false);
        if (data.admin?.role === 'superadmin') {
          window.location = '/superadmin';
        }
        updateStore({ admin: data.admin, loggedIn: true });
        localStorage.setItem('role', data.admin.role);
      })
      .catch((err) => {
        setLoading(false);
        if (err?.response?.status === 403) {
          localStorage.removeItem('token');
          window.location = '/auth/login';
        }
      });

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const getRoutes = () => {
    let routes = [];
    if (admin.role === 'admin') {
      // eslint-disable-next-line array-callback-return
      routes = adminRoutes.map((route) => {
        if (route.name === 'Services' || route.name === 'Settings') {
          return route.child.map((child) => (
            <Route path={child.path} element={child.element} />
          ));
          // eslint-disable-next-line no-else-return
        } else {
          return <Route path={route.path} element={route.element} />;
        }
      });
    }

    return routes.flat();
  };

  return loading ? (
    <SplashScreen />
  ) : (
    <>
      <Sidebar />
      <Routes>
        {getRoutes()}
        <Route path="/technicians/:id" element={<Schedule />} />
        <Route
          path="/*"
          element={<Navigate to="/admin/technicians" />}
        />
      </Routes>
    </>
  );
}

export default Admin;
