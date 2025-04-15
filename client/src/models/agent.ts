export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'error';
  createdAt: Date;
  lastActiveAt: Date;
  mcpServerId?: string;
  tools: string[];
} 