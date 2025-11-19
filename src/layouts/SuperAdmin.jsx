// Init
import React, { useLayoutEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

// Routes
import { superadminRoutes } from '../routes/routes';

import { Store, UpdateStore } from '../StoreContext';
import api from '../api';
import Sidebar from '../components/Sidebar';
import SplashScreen from '../components/SplashScreen';

function SuperAdmin() {
  const { admin } = Store();
  const { pathname } = useLocation();
  const updateStore = UpdateStore();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
    api('get', '/admins/auth')
      .then(({ data }) => {
        setLoading(false);
        if (data.admin?.role === 'admin') {
          window.location = '/admin';
        }
        updateStore({ admin: data.admin, loggedIn: true });
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
    if (admin.role === 'superadmin') {
      routes = superadminRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ));
    }
    return routes;
  };

  return loading ? (
    <SplashScreen />
  ) : (
    <>
      <Sidebar />
      <Routes>
        {getRoutes()}
        <Route
          path="/*"
          element={<Navigate replace to="/superadmin/admins" />}
        />
      </Routes>
    </>
  );
}
export default SuperAdmin;
