import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { AgentType } from '../entities/agent.entity';

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
} 