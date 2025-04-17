import { ApiProperty } from '@nestjs/swagger';

export class LocalAgentConfig {
  @ApiProperty({
    description: 'LLM 모델 이름',
  })
  modelName: string;

  @ApiProperty({
    description: '시스템 프롬프트',
  })
  systemPrompt: string;

  @ApiProperty({
    description: '기반지식 목록',
    type: [String],
  })
  knowledgeBases: string[];

  @ApiProperty({
    description: 'MCP 도구 목록',
    type: [String],
  })
  mcpTools: string[];
} 