import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AgentForm } from '@/components/agent/AgentForm';
import { Agent } from '../../models/agent';

const AgentCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (agent: Omit<Agent, 'id' | 'createdAt' | 'lastActiveAt'>) => {
    // TODO: API 호출 구현
    console.log('Creating agent:', agent);
    navigate('/agents');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">새 에이전트 생성</h1>
        <AgentForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/agents')}
        />
      </div>
    </div>
  );
};

export default AgentCreatePage; 