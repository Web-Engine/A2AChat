import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsArray, IsObject, IsOptional } from 'class-validator';
import { McpType } from '../entities/mcp.entity';

export class CreateMcpDto {
  @ApiProperty({
    description: 'MCP 타입',
    enum: McpType,
    example: McpType.STDIO,
  })
  @IsEnum(McpType)
  type: McpType;

  @ApiProperty({
    description: '실행할 명령어',
    example: '/usr/bin/python3',
  })
  @IsString()
  command: string;

  @ApiProperty({
    description: '명령어 인자 목록',
    example: ['main.py', '--port', '8080'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  args: string[];

  @ApiProperty({
    description: '실행 환경 변수',
    example: { "ENV": "production", "DEBUG": "false" },
    type: 'object',
    additionalProperties: { type: 'string' },
  })
  @IsObject()
  env: Record<string, string>;

  @ApiProperty({
    description: 'MCP 이름',
    example: 'My MCP',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'MCP 설명',
    example: '이 MCP는 ...',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
} 