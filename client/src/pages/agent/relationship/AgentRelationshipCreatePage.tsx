import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AgentRelationshipCreateRequest } from '../../../models/agent-relationship';
import { Agent } from '../../../models/agent';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

const AgentRelationshipCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sourceAgentId = searchParams.get('sourceAgentId');

  const [formData, setFormData] = useState<AgentRelationshipCreateRequest>({
    sourceAgentId: sourceAgentId || '',
    targetAgentId: '',
    relationshipType: 'PARENT_CHILD',
    description: '',
  });

  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: 실제 API 엔드포인트로 변경
      const response = await fetch('/api/agent-relationships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/agents/relationship');
      } else {
        console.error('Failed to create relationship');
      }
    } catch (error) {
      console.error('Error creating relationship:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getSourceAgent = () => {
    return agents.find(agent => agent.id === sourceAgentId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/agents/relationship')}
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
            관계 목록으로 돌아가기
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Agent 관계 생성</h1>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            {sourceAgentId ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  소스 Agent
                </label>
                <div className="p-4 bg-gray-50 rounded">
                  <h3 className="font-medium">{getSourceAgent()?.name}</h3>
                  <p className="text-sm text-gray-500">{getSourceAgent()?.description}</p>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="sourceAgentId">
                  소스 Agent
                </label>
                <select
                  id="sourceAgentId"
                  name="sourceAgentId"
                  value={formData.sourceAgentId}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">선택하세요</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="targetAgentId">
                대상 Agent
              </label>
              <select
                id="targetAgentId"
                name="targetAgentId"
                value={formData.targetAgentId}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">선택하세요</option>
                {agents
                  .filter(agent => agent.id !== formData.sourceAgentId)
                  .map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="relationshipType">
                관계 유형
              </label>
              <select
                id="relationshipType"
                name="relationshipType"
                value={formData.relationshipType}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="PARENT_CHILD">상위-하위</option>
                <option value="PEER">동등</option>
                <option value="DEPENDENCY">의존</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
                설명
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-end space-x-4">
              <Button
                type="button"
                onClick={() => navigate('/agents/relationship')}
                variant="secondary"
              >
                취소
              </Button>
              <Button type="submit" variant="primary">
                생성
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AgentRelationshipCreatePage; 