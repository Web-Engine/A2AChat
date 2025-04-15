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

// 서버로 보낼 수 있는 이벤트
export type EmitEvents = {
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  createRoom: (room: Omit<ChatRoom, 'id' | 'messages' | 'created'>) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
};

// 서버로부터 받을 수 있는 이벤트
export type ListenEvents = {
  messageReceived: (callback: (message: Message) => void) => void;
  roomUpdated: (callback: (room: ChatRoom) => void) => void;
  error: (callback: (error: Error) => void) => void;
}; 