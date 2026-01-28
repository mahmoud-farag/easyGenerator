import React from 'react';
import { useAuth } from '../../context/authContext';
import AppLayout from '../layout/AppLayout';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
   //* States

  //* Custom hooks
  const { isAuthenticated, loading } = useAuth();

  //* Refs

  //* Helper functions

  //* Life cycle hooks

  //* Handlers

  //* JSX

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ?
    (
      <AppLayout>
        <Outlet />
      </AppLayout>
    )
    : (

      <Navigate to='/login' replace />
    )


};

export default ProtectedRoute;