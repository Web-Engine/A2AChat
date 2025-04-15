import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional, IsObject } from 'class-validator';

export class CreateMcpDto {
  @ApiProperty({
    description: 'MCP 서버의 URL',
    format: 'uri',
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'MCP 서버 인증 토큰',
  })
  @IsString()
  token: string;

  @ApiProperty({
    description: '추가 설정 옵션',
    required: false,
    additionalProperties: true,
  })
  @IsObject()
  @IsOptional()
  options?: Record<string, any>;
} 