import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function Layout() {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: 400 , margin: '0 auto'}}>
      {/* Your app-wide header or footer */}
      <Outlet />
    </div>
  );
}

export default Layout;