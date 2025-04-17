import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({
    description: '실행할 Agent의 ID',
    format: 'uuid',
  })
  @IsUUID()
  agentId: string;

  @ApiProperty({
    description: '실행 주기를 나타내는 Cron 표현식',
  })
  @IsString()
  cronExpression: string;

  @ApiProperty({
    description: '예약 실행에 대한 설명',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: '예약 실행 활성화 여부',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  enabled?: boolean;
} 