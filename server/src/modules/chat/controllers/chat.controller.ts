import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../entities/chat-message.entity';
import { CreateChatMessageDto } from '../dtos/create-chat-message.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @ApiOperation({ summary: '모든 채팅 메시지 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [ChatMessage] })
  findAll(): ChatMessage[] {
    return this.chatService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 채팅 메시지 조회' })
  @ApiResponse({ status: 200, description: '성공', type: ChatMessage })
  @ApiResponse({ status: 404, description: '메시지가 존재하지 않음' })
  findOne(@Param('id') id: string): ChatMessage | undefined {
    return this.chatService.findOne(id);
  }

  @Get('agent/:agentId')
  @ApiOperation({ summary: '특정 Agent의 모든 채팅 메시지 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [ChatMessage] })
  findByAgentId(@Param('agentId') agentId: string): ChatMessage[] {
    return this.chatService.findByAgentId(agentId);
  }

  @Get('conversation')
  @ApiOperation({ summary: '두 Agent 간의 대화 내용 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [ChatMessage] })
  findConversation(
    @Query('senderId') senderId: string,
    @Query('receiverId') receiverId: string,
  ): ChatMessage[] {
    return this.chatService.findConversation(senderId, receiverId);
  }

  @Post()
  @ApiOperation({ summary: '새로운 채팅 메시지 생성' })
  @ApiResponse({ status: 201, description: '생성 성공', type: ChatMessage })
  create(@Body() createChatMessageDto: CreateChatMessageDto): ChatMessage {
    return this.chatService.create(createChatMessageDto);
  }
} 