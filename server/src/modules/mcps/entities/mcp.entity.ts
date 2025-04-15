import { ApiProperty } from '@nestjs/swagger';

export class Mcp {
  @ApiProperty({
    description: 'MCP 서버의 URL',
    format: 'uri',
  })
  url: string;

  @ApiProperty({
    description: 'MCP 서버 인증 토큰',
  })
  token: string;

  @ApiProperty({
    description: '추가 설정 옵션',
    required: false,
    additionalProperties: true,
  })
  options?: Record<string, any>;
} 