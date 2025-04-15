import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  Message,
  ChatRoom,
  ClientToServerEvents,
  ServerToClientEvents,
} from '../interfaces/websocket.interface';

@WebSocketGateway({
  cors: {
    origin: '*', // 실제 운영 환경에서는 구체적인 origin을 지정해야 합니다
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, Socket> = new Map();
  private activeRooms: Map<string, ChatRoom> = new Map();

  // 클라이언트 연결 시
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.connectedClients.set(client.id, client);
  }

  // 클라이언트 연결 해제 시
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  // 메시지 수신 및 전송
  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, message: Omit<Message, 'id' | 'timestamp'>) {
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };

    // 메시지를 채팅방의 모든 참가자에게 전송
    this.server.to(message.to).emit('messageReceived', newMessage);

    // 채팅방 메시지 업데이트
    const room = this.activeRooms.get(message.to);
    if (room) {
      room.messages.push(newMessage);
      this.activeRooms.set(message.to, room);
      this.server.to(message.to).emit('roomUpdated', room);
    }
  }

  // 채팅방 생성
  @SubscribeMessage('createRoom')
  handleCreateRoom(
    client: Socket,
    roomData: Omit<ChatRoom, 'id' | 'messages' | 'created'>,
  ) {
    const newRoom: ChatRoom = {
      ...roomData,
      id: Math.random().toString(36).substr(2, 9),
      messages: [],
      created: new Date(),
    };

    this.activeRooms.set(newRoom.id, newRoom);
    this.server.emit('roomUpdated', newRoom);
    return newRoom;
  }

  // 채팅방 참여
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    const room = this.activeRooms.get(roomId);
    if (room) {
      client.join(roomId);
      room.participants.push(client.id);
      this.activeRooms.set(roomId, room);
      this.server.to(roomId).emit('roomUpdated', room);
    }
  }

  // 채팅방 나가기
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomId: string) {
    const room = this.activeRooms.get(roomId);
    if (room) {
      client.leave(roomId);
      room.participants = room.participants.filter((id) => id !== client.id);
      this.activeRooms.set(roomId, room);
      this.server.to(roomId).emit('roomUpdated', room);
    }
  }
} 