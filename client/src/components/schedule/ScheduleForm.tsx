import React, { useState } from 'react';
import { Schedule } from '../../models/schedule';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';

interface ScheduleFormProps {
  initialData?: Partial<Schedule>;
  onSubmit: (schedule: Omit<Schedule, 'id' | 'createdAt' | 'lastExecutedAt' | 'nextExecutionAt'>) => void;
  onCancel: () => void;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    agentId: initialData?.agentId || '',
    name: initialData?.name || '',
    description: initialData?.description || '',
    cronExpression: initialData?.cronExpression || '',
    parameters: initialData?.parameters || {},
    isActive: initialData?.isActive ?? true,
  });

  const [newParameterKey, setNewParameterKey] = useState('');
  const [newParameterValue, setNewParameterValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddParameter = () => {
    if (newParameterKey.trim() && newParameterValue.trim()) {
      setFormData({
        ...formData,
        parameters: {
          ...formData.parameters,
          [newParameterKey.trim()]: newParameterValue.trim(),
        },
      });
      setNewParameterKey('');
      setNewParameterValue('');
    }
  };

  const handleRemoveParameter = (key: string) => {
    const newParameters = { ...formData.parameters };
    delete newParameters[key];
    setFormData({
      ...formData,
      parameters: newParameters,
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            label="예약 실행 이름"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="예약 실행 이름을 입력하세요"
            required
          />

          <Textarea
            label="설명"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="예약 실행에 대한 설명을 입력하세요"
            rows={3}
            required
          />

          <Input
            label="에이전트 ID"
            value={formData.agentId}
            onChange={(e) => setFormData({ ...formData, agentId: e.target.value })}
            placeholder="에이전트 ID를 입력하세요"
            required
          />

          <Input
            label="Cron 표현식"
            value={formData.cronExpression}
            onChange={(e) => setFormData({ ...formData, cronExpression: e.target.value })}
            placeholder="예: 0 0 * * * (매일 자정)"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              실행 파라미터
            </label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  value={newParameterKey}
                  onChange={(e) => setNewParameterKey(e.target.value)}
                  placeholder="파라미터 키"
                  className="flex-1"
                />
                <Input
                  value={newParameterValue}
                  onChange={(e) => setNewParameterValue(e.target.value)}
                  placeholder="파라미터 값"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddParameter}
                  variant="primary"
                >
                  추가
                </Button>
              </div>
              <div className="mt-2 space-y-2">
                {Object.entries(formData.parameters).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <span className="text-sm">
                      {key}: {value}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveParameter(key)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Select
            label="상태"
            value={formData.isActive ? 'active' : 'inactive'}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.value === 'active' })
            }
            options={[
              { value: 'active', label: '활성화' },
              { value: 'inactive', label: '비활성화' },
            ]}
          />
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