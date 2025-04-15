import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/chat', label: '채팅' },
    { path: '/agents', label: '에이전트' },
    { path: '/schedules', label: '스케줄' },
    { path: '/mcp', label: 'MCP 서버' },
  ];

  return (
    <header className="bg-white shadow">
      <div className="px-4 py-3">
        <div className="flex">
          <h1 className="w-64 text-xl font-bold text-gray-800">A2A Chat</h1>
          <nav className="flex space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname.startsWith(item.path)
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 