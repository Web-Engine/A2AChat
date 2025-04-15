import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

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

// 더미 데이터
const dummyServers: MCPServer[] = [
  {
    id: '1',
    name: 'MCP Server 1',
    version: '1.0.0',
    status: 'running',
    lastStartedAt: '2024-04-15T10:00:00Z',
    config: {
      port: 8080,
      host: 'localhost',
      maxConnections: 100
    }
  },
  {
    id: '2',
    name: 'MCP Server 2',
    version: '1.1.0',
    status: 'stopped',
    lastStartedAt: '2024-04-15T09:00:00Z',
    config: {
      port: 8081,
      host: 'localhost',
      maxConnections: 200
    }
  }
];

const MCPServerPage: React.FC = () => {
  const navigate = useNavigate();
  const [servers] = useState<MCPServer[]>(dummyServers);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">MCP Server 관리</h1>
          <Button
            onClick={() => navigate('/mcp/install')}
            className="bg-blue-500 hover:bg-blue-600"
          >
            MCP 설치
          </Button>
        </div>

        <Card>
          <h2 className="text-xl font-semibold mb-4">서버 목록</h2>
          <div className="space-y-4">
            {servers.map((server, index) => (
              <div key={server.id}>
                <div 
                  className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/mcp/${server.id}`)}
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">{server.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>버전: {server.version}</span>
                      <span>포트: {server.config.port}</span>
                      <span>호스트: {server.config.host}</span>
                      <span>최대 연결: {server.config.maxConnections}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded ${
                      server.status === 'running' ? 'bg-green-100 text-green-800' :
                      server.status === 'stopped' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {server.status}
                    </span>
                  </div>
                </div>
                {index < servers.length - 1 && <div className="border-t border-gray-200" />}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MCPServerPage; 