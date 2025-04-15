import { Injectable } from '@nestjs/common';
import { ChatMessage } from '../entities/chat-message.entity';
import { CreateChatMessageDto } from '../dtos/create-chat-message.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatService {
  private messages: Map<string, ChatMessage> = new Map();

  findAll(): ChatMessage[] {
    return Array.from(this.messages.values());
  }

  findOne(id: string): ChatMessage | undefined {
    return this.messages.get(id);
  }

  create(createChatMessageDto: CreateChatMessageDto): ChatMessage {
    const id = uuidv4();
    const message: ChatMessage = {
      id,
      timestamp: new Date().toISOString(),
      ...createChatMessageDto,
    };
    this.messages.set(id, message);
    return message;
  }

  findByAgentId(agentId: string): ChatMessage[] {
    return Array.from(this.messages.values()).filter(
      message => message.senderId === agentId || message.receiverId === agentId,
    );
  }

  findConversation(senderId: string, receiverId: string): ChatMessage[] {
    return Array.from(this.messages.values()).filter(
      message =>
        (message.senderId === senderId && message.receiverId === receiverId) ||
        (message.senderId === receiverId && message.receiverId === senderId),
    );
  }
} 