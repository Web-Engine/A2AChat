import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ScheduleForm } from '@/components/schedule/ScheduleForm';
import { Schedule } from '../../interfaces/schedule';

const ScheduleEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
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
        setSchedule(mockSchedule);
      } catch (err) {
        setError('예약 실행 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching schedule:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [id]);

  const handleSubmit = async (updatedSchedule: Omit<Schedule, 'id' | 'createdAt' | 'lastExecutedAt' | 'nextExecutionAt'>) => {
    try {
      // TODO: API를 통한 예약 실행 수정 로직 구현
      console.log('Updating schedule:', updatedSchedule);
      navigate(`/schedules/${id}`);
    } catch (error) {
      console.error('예약 실행 수정 중 오류가 발생했습니다:', error);
      // TODO: 에러 처리 UI 구현
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
            onClick={() => navigate(`/schedules/${id}`)}
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
            상세 정보로 돌아가기
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-8">예약 실행 수정</h1>
        <ScheduleForm
          initialData={schedule}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/schedules/${id}`)}
        />
      </div>
    </div>
  );
};

export default ScheduleEditPage; 