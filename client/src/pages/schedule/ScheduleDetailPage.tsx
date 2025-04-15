import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ScheduleDetail } from '@/components/schedule/ScheduleDetail';
import { Schedule, ScheduleExecution } from '../../models/schedule';

const ScheduleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [executions, setExecutions] = useState<ScheduleExecution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setIsLoading(true);
        // TODO: API 호출로 대체
        const mockSchedule: Schedule = {
          id: id || '',
          name: '테스트 예약 실행',
          description: '테스트용 예약 실행입니다.',
          agentId: 'agent-1',
          cronExpression: '0 0 * * *',
          parameters: {
            param1: 'value1',
            param2: 'value2',
          },
          isActive: true,
          createdAt: new Date(),
          nextExecutionAt: new Date(Date.now() + 3600000),
          lastExecutedAt: new Date(Date.now() - 7200000),
        };

        const mockExecutions: ScheduleExecution[] = [
          {
            id: 'exec-1',
            scheduleId: id || '',
            status: 'success',
            startedAt: new Date(Date.now() - 7200000),
            completedAt: new Date(Date.now() - 7000000),
          },
          {
            id: 'exec-2',
            scheduleId: id || '',
            status: 'failed',
            startedAt: new Date(Date.now() - 10800000),
            completedAt: new Date(Date.now() - 10600000),
          },
          {
            id: 'exec-3',
            scheduleId: id || '',
            status: 'running',
            startedAt: new Date(Date.now() - 300000),
          },
        ];

        setSchedule(mockSchedule);
        setExecutions(mockExecutions);
      } catch (err) {
        setError('예약 실행 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching schedule:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [id]);

  const handleEdit = () => {
    navigate(`/schedules/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 예약 실행을 삭제하시겠습니까?')) {
      try {
        // TODO: API 호출로 대체
        console.log('Deleting schedule:', id);
        navigate('/schedules');
      } catch (err) {
        setError('예약 실행 삭제에 실패했습니다.');
        console.error('Error deleting schedule:', err);
      }
    }
  };

  const handleToggle = async () => {
    if (!schedule) return;

    try {
      // TODO: API 호출로 대체
      console.log('Toggling schedule:', id, !schedule.isActive);
      setSchedule({ ...schedule, isActive: !schedule.isActive });
    } catch (err) {
      setError('예약 실행 상태 변경에 실패했습니다.');
      console.error('Error toggling schedule:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">예약 실행을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/schedules')}
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
            예약 실행 목록으로 돌아가기
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-8">예약 실행 상세 정보</h1>
        <ScheduleDetail
          schedule={schedule}
          executions={executions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );
};

export default ScheduleDetailPage; 