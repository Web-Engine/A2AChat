import { ApiProperty } from '@nestjs/swagger';
import { AgentType } from './agent-type.enum';
import { LocalAgentConfig } from './local-agent-config.entity';
import { RemoteAgentConfig } from './remote-agent-config.entity';

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

  @ApiProperty({
    description: 'Local Agent 설정',
    type: LocalAgentConfig,
    required: false,
  })
  localConfig?: LocalAgentConfig;

  @ApiProperty({
    description: 'Remote Agent 설정',
    type: RemoteAgentConfig,
    required: false,
  })
  remoteConfig?: RemoteAgentConfig;

  @ApiProperty({
    description: '생성 시간',
  })
  createdAt: Date;

  @ApiProperty({
    description: '마지막 업데이트 시간',
  })
  updatedAt: Date;
} 