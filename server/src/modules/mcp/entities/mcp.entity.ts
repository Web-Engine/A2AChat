import { ApiProperty } from '@nestjs/swagger';

export enum McpType {
  STDIO = 'stdio',
  SSE = 'sse',
}

export class Mcp {
  @ApiProperty({
    description: 'MCP의 고유 UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'MCP 타입',
    enum: McpType,
    example: McpType.STDIO,
  })
  type: McpType;

  @ApiProperty({
    description: '실행할 명령어',
    example: '/usr/bin/python3',
  })
  command: string;

  @ApiProperty({
    description: '명령어 인자 목록',
    example: ['main.py', '--port', '8080'],
    type: [String],
  })
  args: string[];

  @ApiProperty({
    description: '실행 환경 변수',
    example: { "ENV": "production", "DEBUG": "false" },
    type: 'object',
    additionalProperties: { type: 'string' },
  })
  env: Record<string, string>;

  @ApiProperty({
    description: 'MCP 이름',
    example: 'My MCP',
  })
  name: string;

  @ApiProperty({
    description: 'MCP 설명',
    example: '이 MCP는 ...',
    required: false,
  })
  description?: string;
} 