export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'command' | 'result';
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: string[];
  messages: Message[];
  created: Date;
}

// 클라이언트에서 서버로 보내는 이벤트
export interface ClientToServerEvents {
  // 메시지 전송
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  // 채팅방 생성
  createRoom: (room: Omit<ChatRoom, 'id' | 'messages' | 'created'>) => void;
  // 채팅방 참여
  joinRoom: (roomId: string) => void;
  // 채팅방 나가기
  leaveRoom: (roomId: string) => void;
}

// 서버에서 클라이언트로 보내는 이벤트
export interface ServerToClientEvents {
  // 메시지 수신
  messageReceived: (message: Message) => void;
  // 채팅방 업데이트
  roomUpdated: (room: ChatRoom) => void;
  // 에러 발생
  error: (error: Error) => void;
} 