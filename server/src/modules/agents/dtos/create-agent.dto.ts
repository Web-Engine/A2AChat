import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateAgentDto {
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