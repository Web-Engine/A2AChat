import { ApiProperty } from '@nestjs/swagger';

export enum AgentType {
  LOCAL = 'Local',
  REMOTE = 'Remote',
}

export class Agent {
  @ApiProperty({
    description: 'Agent ID',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Agent 타입',
    enum: AgentType,
  })
  type: AgentType;

  @ApiProperty({
    description: 'Agent 이름',
  })
  name: string;

  @ApiProperty({
    description: 'Agent 설명',
    required: false,
  })
  description?: string;
} 