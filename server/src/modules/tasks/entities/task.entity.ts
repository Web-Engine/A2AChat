import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  SUBMITTED = 'submitted',
  WORKING = 'working',
  INPUT_REQUIRED = 'input-required',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELED = 'canceled',
}

export class Part {
  @ApiProperty({
    description: 'Part 타입',
    enum: ['text', 'file', 'data'],
  })
  type: 'text' | 'file' | 'data';

  @ApiProperty({
    description: 'Part 내용',
  })
  content: any;
}

export class Message {
  @ApiProperty({
    description: '메시지 역할',
    enum: ['user', 'agent'],
  })
  role: 'user' | 'agent';

  @ApiProperty({
    description: '메시지 파트',
    type: [Part],
  })
  parts: Part[];
}

export class Task {
  @ApiProperty({
    description: 'Task ID',
  })
  id: string;

  @ApiProperty({
    description: 'Agent ID',
  })
  agentId: string;

  @ApiProperty({
    description: 'Task 상태',
    enum: TaskStatus,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'Task 메시지',
    type: [Message],
  })
  messages: Message[];

  @ApiProperty({
    description: '생성 시간',
  })
  createdAt: Date;

  @ApiProperty({
    description: '업데이트 시간',
  })
  updatedAt: Date;
} 