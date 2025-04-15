export interface MCPServer {
  id: string;
  name: string;
  version: string;
  status: 'running' | 'stopped' | 'error';
  lastStartedAt?: string;
  lastStoppedAt?: string;
  config: {
    port: number;
    host: string;
    maxConnections: number;
  };
}

export interface MCPServerLog {
  id: string;
  serverId: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
}

export interface MCPServerVersion {
  current: string;
  available: string[];
} 