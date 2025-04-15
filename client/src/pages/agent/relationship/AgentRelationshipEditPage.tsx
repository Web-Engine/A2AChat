import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AgentRelationship, AgentRelationshipUpdateRequest } from '../../../models/agent-relationship';

const AgentRelationshipEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AgentRelationshipUpdateRequest>({
    relationshipType: 'PARENT_CHILD',
    description: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRelationship(id);
    }
  }, [id]);

  const fetchRelationship = async (relationshipId: string) => {
    try {
      // TODO: 실제 API 엔드포인트로 변경
      const response = await fetch(`/api/agent-relationships/${relationshipId}`);
      const data: AgentRelationship = await response.json();
      setFormData({
        relationshipType: data.relationshipType,
        description: data.description || '',
      });
    } catch (error) {
      console.error('Error fetching relationship:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: 실제 API 엔드포인트로 변경
      const response = await fetch(`/api/agent-relationships/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/agent/relationship');
      } else {
        console.error('Failed to update relationship');
      }
    } catch (error) {
      console.error('Error updating relationship:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Agent 관계 수정</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="relationshipType">
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
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

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/agent/relationship')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            취소
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentRelationshipEditPage; 