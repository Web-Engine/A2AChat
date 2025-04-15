export interface Schedule {
  id: string;
  agentId: string;
  name: string;
  description: string;
  cronExpression: string;
  parameters: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  lastExecutedAt?: Date;
  nextExecutionAt: Date;
}

export interface ScheduleExecution {
  id: string;
  scheduleId: string;
  status: 'success' | 'failed' | 'running';
  startedAt: Date;
  completedAt?: Date;
  result?: any;
  error?: string;
} 