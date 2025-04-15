import React from 'react';
import { Schedule, ScheduleExecution } from '../../models/schedule';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

interface ScheduleDetailProps {
  schedule: Schedule;
  executions: ScheduleExecution[];
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}

export const ScheduleDetail: React.FC<ScheduleDetailProps> = ({
  schedule,
  executions,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const getStatusColor = (status: ScheduleExecution['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{schedule.name}</h2>
            <div className="flex items-center mt-2">
              <div className={`w-3 h-3 rounded-full ${schedule.isActive ? 'bg-green-500' : 'bg-gray-500'} mr-2`} />
              <span className="text-sm text-gray-600">
                {schedule.isActive ? '활성화' : '비활성화'}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={onToggle} variant={schedule.isActive ? 'danger' : 'primary'}>
              {schedule.isActive ? '비활성화' : '활성화'}
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
        <h3 className="text-xl font-semibold mb-4">기본 정보</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">설명</label>
            <p className="mt-1 text-gray-900">{schedule.description}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">에이전트 ID</label>
            <p className="mt-1 text-gray-900">{schedule.agentId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cron 표현식</label>
            <p className="mt-1 text-gray-900">{schedule.cronExpression}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">생성일</label>
            <p className="mt-1 text-gray-900">{formatDate(schedule.createdAt)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">다음 실행 예정</label>
            <p className="mt-1 text-gray-900">{formatDate(schedule.nextExecutionAt)}</p>
          </div>
          {schedule.lastExecutedAt && (
            <div>
              <label className="block text-sm font-medium text-gray-700">마지막 실행</label>
              <p className="mt-1 text-gray-900">{formatDate(schedule.lastExecutedAt)}</p>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">실행 파라미터</h3>
        <div className="space-y-2">
          {Object.entries(schedule.parameters).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-700">{key}</span>
              <span className="text-sm text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">실행 이력</h3>
        <div className="space-y-2">
          {executions.map((execution) => (
            <div
              key={execution.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(execution.status).replace('text-', 'bg-')}`} />
                <div>
                  <p className="text-sm font-medium">
                    {formatDate(execution.startedAt)}
                  </p>
                  {execution.completedAt && (
                    <p className="text-xs text-gray-500">
                      완료: {formatDate(execution.completedAt)}
                    </p>
                  )}
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-sm ${getStatusColor(execution.status)}`}>
                {execution.status === 'success' && '성공'}
                {execution.status === 'failed' && '실패'}
                {execution.status === 'running' && '실행 중'}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}; 