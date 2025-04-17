import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class RemoteAgentConfigDto {
  @ApiProperty({
    description: 'Remote Agent 엔드포인트',
  })
  @IsString()
  @IsNotEmpty()
  endpoint: string;

  @ApiProperty({
    description: 'Remote Agent API 키',
    required: false,
  })
  @IsString()
  @IsOptional()
  apiKey?: string;
} 