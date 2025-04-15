import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScheduleForm } from '@/components/schedule/ScheduleForm';
import { Schedule } from '../../models/schedule';

const ScheduleCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (schedule: Omit<Schedule, 'id' | 'createdAt' | 'lastExecutedAt' | 'nextExecutionAt'>) => {
    try {
      // TODO: API를 통한 예약 실행 생성 로직 구현
      console.log('Creating schedule:', schedule);
      navigate('/schedules');
    } catch (error) {
      console.error('예약 실행 생성 중 오류가 발생했습니다:', error);
      // TODO: 에러 처리 UI 구현
    }
  };

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
        <h1 className="text-3xl font-bold mb-8">새 예약 실행 생성</h1>
        <ScheduleForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/schedules')}
        />
      </div>
    </div>
  );
};

export default ScheduleCreatePage; 