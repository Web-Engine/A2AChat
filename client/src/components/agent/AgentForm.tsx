import React, { useState } from 'react';
import { Agent } from '../../interfaces/agent';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface AgentFormProps {
  initialData?: Partial<Agent>;
  onSubmit: (agent: Omit<Agent, 'id' | 'createdAt' | 'lastActiveAt'>) => void;
  onCancel: () => void;
}

export const AgentForm: React.FC<AgentFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    status: initialData?.status || 'inactive',
    mcpServerId: initialData?.mcpServerId || '',
    tools: initialData?.tools || [],
  });

  const [newTool, setNewTool] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddTool = () => {
    if (newTool.trim() && !formData.tools.includes(newTool.trim())) {
      setFormData({
        ...formData,
        tools: [...formData.tools, newTool.trim()],
      });
      setNewTool('');
    }
  };

  const handleRemoveTool = (tool: string) => {
    setFormData({
      ...formData,
      tools: formData.tools.filter((t) => t !== tool),
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            label="에이전트 이름"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="에이전트 이름을 입력하세요"
            required
          />

          <Textarea
            label="설명"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="에이전트에 대한 설명을 입력하세요"
            rows={3}
            required
          />

          <Input
            label="MCP 서버 ID"
            value={formData.mcpServerId}
            onChange={(e) => setFormData({ ...formData, mcpServerId: e.target.value })}
            placeholder="MCP 서버 ID를 입력하세요"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">도구</label>
            <div className="flex space-x-2">
              <Input
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
                placeholder="새 도구 추가"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddTool}
                variant="primary"
              >
                추가
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {tool}
                  <button
                    type="button"
                    onClick={() => handleRemoveTool(tool)}
                    className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
          >
            저장
          </Button>
        </div>
      </form>
    </Card>
  );
}; 