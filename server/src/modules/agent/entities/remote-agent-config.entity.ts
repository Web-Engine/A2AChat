import { ApiProperty } from '@nestjs/swagger';

export class RemoteAgentConfig {
  @ApiProperty({
    description: 'Remote Agent 엔드포인트',
  })
  endpoint: string;

  @ApiProperty({
    description: 'Remote Agent API 키',
    required: false,
  })
  apiKey?: string;
} 