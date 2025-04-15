import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgentList } from '@/components/agent/AgentList';
import { Agent } from '../../interfaces/agent';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

const AgentListPage: React.FC = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API에서 에이전트 목록을 가져오는 로직 구현
    // 임시 데이터
    const mockAgents: Agent[] = [
      {
        id: '1',
        name: '문서 분석 에이전트',
        description: '문서를 분석하고 요약하는 AI 에이전트',
        status: 'active',
        createdAt: new Date(),
        lastActiveAt: new Date(),
        tools: ['PDF 분석', '텍스트 요약', '키워드 추출'],
      },
      {
        id: '2',
        name: '데이터 처리 에이전트',
        description: '데이터를 처리하고 시각화하는 AI 에이전트',
        status: 'inactive',
        createdAt: new Date(),
        lastActiveAt: new Date(),
        tools: ['데이터 정제', '시각화', '통계 분석'],
      },
    ];
    setAgents(mockAgents);
    setIsLoading(false);
  }, []);

  const handleSelectAgent = (agent: Agent) => {
    navigate(`/agents/${agent.id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">에이전트 관리</h1>
          <Button
            onClick={() => navigate('/agents/create')}
            className="bg-blue-500 hover:bg-blue-600"
          >
            새 에이전트 생성
          </Button>
        </div>
        <Card>
          <AgentList
            agents={agents}
            onSelectAgent={handleSelectAgent}
          />
        </Card>
      </div>
    </div>
  );
};

export default AgentListPage; 