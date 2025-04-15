import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgentRelationship } from '../../../models/agent-relationship';

const AgentRelationshipListPage: React.FC = () => {
  const navigate = useNavigate();
  const [relationships, setRelationships] = useState<AgentRelationship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: API 호출로 관계 목록 가져오기
    fetchRelationships();
  }, []);

  const fetchRelationships = async () => {
    try {
      // TODO: 실제 API 엔드포인트로 변경
      const response = await fetch('/api/agent-relationships');
      const data = await response.json();
      setRelationships(data);
    } catch (error) {
      console.error('Error fetching relationships:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    navigate('/agents/relationship/create');
  };

  const handleEdit = (id: string) => {
    navigate(`/agent/relationship/edit/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agent 관계 목록</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          새 관계 생성
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                소스 Agent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                대상 Agent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                관계 유형
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                설명
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                생성일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {relationships.map((relationship) => (
              <tr key={relationship.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {relationship.sourceAgentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {relationship.targetAgentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {relationship.relationshipType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {relationship.description || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(relationship.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(relationship.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    수정
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentRelationshipListPage; 