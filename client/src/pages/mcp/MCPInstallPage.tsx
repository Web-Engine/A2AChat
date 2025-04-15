import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MCPInstallForm } from '@/components/mcp/MCPInstallForm';

interface MCPServerConfig {
  port: number;
  host: string;
  maxConnections: number;
}

interface MCPServer {
  id: string;
  name: string;
  version: string;
  status: 'running' | 'stopped';
  lastStartedAt: string;
  config: MCPServerConfig;
}

const MCPInstallPage: React.FC = () => {
  const navigate = useNavigate();

  const handleInstallServer = (serverData: Omit<MCPServer, 'id' | 'status' | 'lastStartedAt'>) => {
    // TODO: API 호출로 대체
    console.log('Installing MCP server:', serverData);
    navigate('/mcp');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/mcp')}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            MCP 서버 목록으로 돌아가기
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-8">MCP 서버 설치</h1>
        <MCPInstallForm
          onSubmit={handleInstallServer}
          onCancel={() => navigate('/mcp')}
        />
      </div>
    </div>
  );
};

export default MCPInstallPage; 