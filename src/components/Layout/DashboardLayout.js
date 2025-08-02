import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children, role, user }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={role} user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} role={role} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 