import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NavigationMenu: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                A2A Chat
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/')
                    ? 'text-gray-900 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                채팅
              </Link>
              <Link
                to="/agents"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/agents')
                    ? 'text-gray-900 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                에이전트 관리
              </Link>
              <Link
                to="/schedules"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/schedules')
                    ? 'text-gray-900 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                예약 실행 관리
              </Link>
              <Link
                to="/mcp"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/mcp')
                    ? 'text-gray-900 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                MCP 서버 관리
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}; 