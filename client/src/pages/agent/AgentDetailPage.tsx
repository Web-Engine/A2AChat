import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AgentDetail } from '@/components/agent/AgentDetail';
import { Agent } from '../../interfaces/agent';

const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API에서 에이전트 상세 정보를 가져오는 로직 구현
    // 임시 데이터
    const mockAgent: Agent = {
      id: id || '1',
      name: '문서 분석 에이전트',
      description: '문서를 분석하고 요약하는 AI 에이전트입니다. PDF, Word, Excel 등 다양한 형식의 문서를 처리할 수 있습니다.',
      status: 'active',
      createdAt: new Date(),
      lastActiveAt: new Date(),
      mcpServerId: 'mcp-server-1',
      tools: ['PDF 분석', '텍스트 요약', '키워드 추출', '문서 분류'],
    };
    setAgent(mockAgent);
    setIsLoading(false);
  }, [id]);

  const handleEdit = () => {
    navigate(`/agents/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 에이전트를 삭제하시겠습니까?')) {
      // TODO: API를 통한 에이전트 삭제 로직 구현
      navigate('/agents');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">에이전트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/agents')}
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
            에이전트 목록으로 돌아가기
          </button>
        </div>
        <AgentDetail
          agent={agent}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AgentDetailPage; 