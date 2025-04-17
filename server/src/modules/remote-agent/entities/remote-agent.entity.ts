import { ApiProperty } from '@nestjs/swagger';

export type RemoteAgentStatus = 'connected' | 'disconnected' | 'error';

export class RemoteAgent {
  @ApiProperty({
    description: 'Agent ID',
  })
  agentId: string;

  @ApiProperty({
    description: 'Remote Agent 엔드포인트',
  })
  endpoint: string;

  @ApiProperty({
    description: 'Remote Agent API 키',
    required: false,
  })
  apiKey?: string;

  @ApiProperty({
    description: 'Remote Agent 상태',
    enum: ['connected', 'disconnected', 'error'],
  })
  status: RemoteAgentStatus;

  @ApiProperty({
    description: '마지막 연결 시간',
  })
  lastConnectedAt: Date;

  @ApiProperty({
    description: '마지막 에러 메시지',
    required: false,
  })
  lastError?: string;
} 