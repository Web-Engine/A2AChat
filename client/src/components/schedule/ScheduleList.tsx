import React from 'react';
import { Link } from 'react-router-dom';
import { Schedule } from '../../models/schedule';
import { Button } from '../common/Button';

interface ScheduleListProps {
  schedules: Schedule[];
  onSelectSchedule: (schedule: Schedule) => void;
  onToggleSchedule: (scheduleId: string) => void;
}

export const ScheduleList: React.FC<ScheduleListProps> = ({
  schedules,
  onSelectSchedule,
  onToggleSchedule,
}) => {
  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const formatNextExecution = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">예약 실행 목록</h2>
        <Link
          to="/schedules/new"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          새 예약 실행 생성
        </Link>
      </div>

      {schedules.map((schedule, index) => (
        <div key={schedule.id}>
          <div 
            className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSelectSchedule(schedule)}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-medium">{schedule.name}</h3>
                <span className={`px-2 py-1 rounded ${getStatusColor(schedule.isActive)}`}>
                  {schedule.isActive ? '활성' : '비활성'}
                </span>
              </div>
              <p className="text-sm text-gray-500">{schedule.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>다음 실행: {formatNextExecution(schedule.nextExecutionAt)}</p>
                {schedule.lastExecutedAt && (
                  <p>마지막 실행: {new Date(schedule.lastExecutedAt).toLocaleString()}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSchedule(schedule.id);
                }}
                className={schedule.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
              >
                {schedule.isActive ? '비활성화' : '활성화'}
              </Button>
            </div>
          </div>
          {index < schedules.length - 1 && <div className="border-t border-gray-200" />}
        </div>
      ))}
    </div>
  );
}; 