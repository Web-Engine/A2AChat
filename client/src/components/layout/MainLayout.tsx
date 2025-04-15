import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isChatPage = location.pathname.startsWith('/chat');

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 ${isChatPage ? '' : 'p-4'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 