import React from 'react';
import { Agent } from '../../models/agent';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface AgentDetailProps {
  agent: Agent;
  onEdit: () => void;
  onDelete: () => void;
  onManageRelationships: () => void;
}

export const AgentDetail: React.FC<AgentDetailProps> = ({
  agent,
  onEdit,
  onDelete,
  onManageRelationships,
}) => {
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-gray-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{agent.name}</h2>
            <div className="flex items-center mt-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)} mr-2`} />
              <span className="text-sm text-gray-600">
                {agent.status === 'active' ? '활성화' : 
                 agent.status === 'inactive' ? '비활성화' : '오류'}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={onManageRelationships} variant="secondary">
              관계 관리
            </Button>
            <Button onClick={onEdit} variant="primary">
              수정
            </Button>
            <Button onClick={onDelete} variant="danger">
              삭제
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">기본 정보</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">설명</label>
            <p className="mt-1 text-gray-900">{agent.description}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">생성일</label>
            <p className="mt-1 text-gray-900">
              {new Date(agent.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">마지막 활동</label>
            <p className="mt-1 text-gray-900">
              {new Date(agent.lastActiveAt).toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">MCP 서버 정보</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">연결된 MCP 서버</label>
            <p className="mt-1 text-gray-900">
              {agent.mcpServerId || '연결되지 않음'}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">사용 가능한 도구</h3>
        <div className="flex flex-wrap gap-2">
          {agent.tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tool}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}; 