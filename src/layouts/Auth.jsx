// Init
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Routes
import { authRoutes } from '../routes/routes';

function SuperAdmin() {
  function getRoutes() {
    return authRoutes.map((route) => (
      <Route path={route.path} element={route.element} />
    ));
  }

  return (
    <Routes>
      {getRoutes()}
      <Route
        path="/*"
        element={<Navigate replace to="/auth/login" />}
      />
    </Routes>
  );
}
export default SuperAdmin;
