import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScheduleList } from '@/components/schedule/ScheduleList';
import { Schedule } from '../../interfaces/schedule';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

const ScheduleListPage: React.FC = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API에서 예약 실행 목록을 가져오는 로직 구현
    // 임시 데이터
    const mockSchedules: Schedule[] = [
      {
        id: '1',
        agentId: 'agent-1',
        name: '매일 자정 실행',
        description: '매일 자정에 실행되는 문서 분석 작업',
        cronExpression: '0 0 * * *',
        parameters: {
          documentType: 'pdf',
          analysisType: 'summary',
        },
        isActive: true,
        createdAt: new Date(),
        lastExecutedAt: new Date(Date.now() - 86400000), // 1일 전
        nextExecutionAt: new Date(Date.now() + 3600000), // 1시간 후
      },
      {
        id: '2',
        agentId: 'agent-2',
        name: '주간 보고서 생성',
        description: '매주 월요일 오전 9시에 실행되는 주간 보고서 생성 작업',
        cronExpression: '0 9 * * 1',
        parameters: {
          reportType: 'weekly',
          format: 'excel',
        },
        isActive: false,
        createdAt: new Date(),
        nextExecutionAt: new Date(Date.now() + 604800000), // 7일 후
      },
    ];
    setSchedules(mockSchedules);
    setIsLoading(false);
  }, []);

  const handleSelectSchedule = (schedule: Schedule) => {
    navigate(`/schedules/${schedule.id}`);
  };

  const handleToggleSchedule = async (scheduleId: string) => {
    try {
      // TODO: API를 통한 예약 실행 활성화/비활성화 로직 구현
      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === scheduleId
            ? { ...schedule, isActive: !schedule.isActive }
            : schedule
        )
      );
    } catch (error) {
      console.error('예약 실행 상태 변경 중 오류가 발생했습니다:', error);
      // TODO: 에러 처리 UI 구현
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">예약 실행 관리</h1>
          <Button
            onClick={() => navigate('/schedules/create')}
            className="bg-blue-500 hover:bg-blue-600"
          >
            새 예약 실행 생성
          </Button>
        </div>
        <Card>
          <ScheduleList
            schedules={schedules}
            onSelectSchedule={handleSelectSchedule}
            onToggleSchedule={handleToggleSchedule}
          />
        </Card>
      </div>
    </div>
  );
};

export default ScheduleListPage; 