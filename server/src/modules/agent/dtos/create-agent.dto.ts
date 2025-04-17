import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AgentType } from '../entities/agent-type.enum';
import { LocalAgentConfigDto } from './local-agent-config.dto';
import { RemoteAgentConfigDto } from './remote-agent-config.dto';

export class CreateAgentDto {
  @ApiProperty({
    description: 'Agent 타입',
    enum: AgentType,
    example: AgentType.LOCAL,
  })
  @IsEnum(AgentType)
  type: AgentType;

  @ApiProperty({
    description: 'Agent의 이름',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Agent에 대한 설명',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Local Agent 설정',
    required: false,
  })
  @ValidateNested()
  @Type(() => LocalAgentConfigDto)
  @IsOptional()
  localConfig?: LocalAgentConfigDto;

  @ApiProperty({
    description: 'Remote Agent 설정',
    required: false,
  })
  @ValidateNested()
  @Type(() => RemoteAgentConfigDto)
  @IsOptional()
  remoteConfig?: RemoteAgentConfigDto;
} 