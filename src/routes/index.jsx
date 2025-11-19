// Init
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Auth from '../layouts/Auth';
import SuperAdmin from '../layouts/SuperAdmin';
import Admin from '../layouts/Admin';
import ResetPasswordPopup from '../components/ResetPasswordPopup';

function Index() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate replace to="/auth/login" />}
      />
      <Route path="auth/*" element={<Auth />} />
      <Route path="superadmin/*" element={<SuperAdmin />} />
      <Route path="admin/*" element={<Admin />} />

      {/* Forget Password Route */}
      <Route
        exact
        path="/password/:token"
        element={<ResetPasswordPopup />}
      />
      <Route
        path="*"
        element={<Navigate replace to="/auth/login" />}
      />
    </Routes>
  );
}
export default Index;
