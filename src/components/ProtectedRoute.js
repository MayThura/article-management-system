import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('token');

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;