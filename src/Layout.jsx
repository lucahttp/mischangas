import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function Layout() {
  const { user } = useAuth();

  return (
    <div>
      {/* Your app-wide header or footer */}
      <Outlet />
    </div>
  );
}

export default Layout;