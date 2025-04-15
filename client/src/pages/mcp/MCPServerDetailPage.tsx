import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MCPServer, MCPServerLog, MCPServerVersion } from '../../models/mcp';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Table } from '@/components/common/Table';

// 더미 데이터
const dummyServers: Record<string, MCPServer> = {
  '1': {
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
  '2': {
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
};

const dummyLogs: Record<string, MCPServerLog[]> = {
  '1': [
    {
      id: '1',
      serverId: '1',
      level: 'info',
      message: '서버가 시작되었습니다.',
      timestamp: '2024-04-15T10:00:00Z'
    },
    {
      id: '2',
      serverId: '1',
      level: 'warning',
      message: '메모리 사용량이 높습니다.',
      timestamp: '2024-04-15T10:05:00Z'
    }
  ],
  '2': [
    {
      id: '3',
      serverId: '2',
      level: 'error',
      message: '데이터베이스 연결 실패',
      timestamp: '2024-04-15T10:10:00Z'
    }
  ]
};

const dummyVersion: MCPServerVersion = {
  current: '1.0.0',
  available: ['1.0.0', '1.1.0', '2.0.0']
};

const MCPServerDetailPage: React.FC = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const navigate = useNavigate();
  const [server, setServer] = useState<MCPServer>(dummyServers[serverId || '1']);
  const [logs] = useState<MCPServerLog[]>(dummyLogs[serverId || '1'] || []);
  const [version] = useState<MCPServerVersion>(dummyVersion);

  const handleStartServer = () => {
    setServer(prev => ({ ...prev, status: 'running' }));
  };

  const handleStopServer = () => {
    setServer(prev => ({ ...prev, status: 'stopped' }));
  };

  const handleUpdateVersion = (newVersion: string) => {
    setServer(prev => ({ ...prev, version: newVersion }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">MCP Server 상세 정보</h1>
          <Button
            onClick={() => navigate('/mcp')}
            className="bg-gray-500 hover:bg-gray-600"
          >
            목록으로
          </Button>
        </div>

        {/* 서버 상태 카드 */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-4">서버 상태</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p>이름: {server.name}</p>
                <p>버전: {server.version}</p>
                <p>상태: 
                  <span className={`ml-2 px-2 py-1 rounded ${
                    server.status === 'running' ? 'bg-green-100 text-green-800' :
                    server.status === 'stopped' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {server.status}
                  </span>
                </p>
                <p>포트: {server.config.port}</p>
                <p>호스트: {server.config.host}</p>
                <p>최대 연결: {server.config.maxConnections}</p>
              </div>
              <div className="space-x-2">
                <Button
                  onClick={handleStartServer}
                  disabled={server.status === 'running'}
                  className="bg-green-500 hover:bg-green-600"
                >
                  시작
                </Button>
                <Button
                  onClick={handleStopServer}
                  disabled={server.status === 'stopped'}
                  className="bg-red-500 hover:bg-red-600"
                >
                  중지
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* 버전 관리 카드 */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-4">버전 관리</h2>
          <div className="space-y-4">
            <p>현재 버전: {server.version}</p>
            <div>
              <p className="mb-2">사용 가능한 버전:</p>
              <div className="space-y-2">
                {version.available.map((v) => (
                  <Button
                    key={v}
                    onClick={() => handleUpdateVersion(v)}
                    disabled={v === server.version}
                    className="mr-2"
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* 로그 카드 */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">서버 로그</h2>
          <Table
            headers={['시간', '레벨', '메시지']}
            data={logs.map((log) => [
              new Date(log.timestamp).toLocaleString(),
              <span className={`px-2 py-1 rounded ${
                log.level === 'error' ? 'bg-red-100 text-red-800' :
                log.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {log.level}
              </span>,
              log.message
            ])}
          />
        </Card>
      </div>
    </div>
  );
};

export default MCPServerDetailPage; 