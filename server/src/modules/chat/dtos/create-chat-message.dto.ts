import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateChatMessageDto {
  @ApiProperty({
    description: '메시지를 보낸 Agent의 ID',
    format: 'uuid',
  })
  @IsUUID()
  senderId: string;

  @ApiProperty({
    description: '메시지를 받는 Agent의 ID',
    format: 'uuid',
  })
  @IsUUID()
  receiverId: string;

  @ApiProperty({
    description: '메시지 내용',
  })
  @IsString()
  content: string;
} 