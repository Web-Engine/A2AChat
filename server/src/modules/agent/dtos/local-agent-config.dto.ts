import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class LocalAgentConfigDto {
  @ApiProperty({
    description: 'LLM 모델 이름',
  })
  @IsString()
  @IsNotEmpty()
  modelName: string;

  @ApiProperty({
    description: '시스템 프롬프트',
  })
  @IsString()
  @IsNotEmpty()
  systemPrompt: string;

  @ApiProperty({
    description: '기반지식 목록',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  knowledgeBases: string[];

  @ApiProperty({
    description: 'MCP 도구 목록',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  mcpTools: string[];
} 