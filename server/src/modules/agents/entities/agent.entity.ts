import { ApiProperty } from '@nestjs/swagger';

export class Agent {
  @ApiProperty({
    description: 'Agent의 고유 식별자',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Agent의 이름',
  })
  name: string;

  @ApiProperty({
    description: 'Agent에 대한 설명',
    required: false,
  })
  description?: string;
} 