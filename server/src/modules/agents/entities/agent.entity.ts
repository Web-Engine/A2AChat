import { ApiProperty } from '@nestjs/swagger';

export enum AgentType {
  LOCAL = 'Local',
  REMOTE = 'Remote',
}

export class Agent {
  @ApiProperty({
    description: 'Agent의 고유 식별자',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Agent 타입',
    enum: AgentType,
    example: AgentType.LOCAL,
  })
  type: AgentType;

  @ApiProperty({
    description: 'Agent의 이름',
  })
  name: string;

  @ApiProperty({
    description: 'Agent에 대한 설명',
    required: false,
  })
  description?: string;
} 