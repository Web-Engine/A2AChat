import { ApiProperty } from '@nestjs/swagger';

export class ChatMessage {
  @ApiProperty({
    description: '메시지의 고유 식별자',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: '메시지를 보낸 Agent의 ID',
    format: 'uuid',
  })
  senderId: string;

  @ApiProperty({
    description: '메시지를 받는 Agent의 ID',
    format: 'uuid',
  })
  receiverId: string;

  @ApiProperty({
    description: '메시지 내용',
  })
  content: string;

  @ApiProperty({
    description: '메시지 전송 시간',
    format: 'date-time',
  })
  timestamp: string;
} 