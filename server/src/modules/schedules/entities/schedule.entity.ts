import { ApiProperty } from '@nestjs/swagger';

export class Schedule {
  @ApiProperty({
    description: '예약 실행의 고유 식별자',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: '실행할 Agent의 ID',
    format: 'uuid',
  })
  agentId: string;

  @ApiProperty({
    description: '실행 주기를 나타내는 Cron 표현식',
  })
  cronExpression: string;

  @ApiProperty({
    description: '예약 실행에 대한 설명',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: '예약 실행 활성화 여부',
    default: true,
  })
  enabled: boolean;
} 