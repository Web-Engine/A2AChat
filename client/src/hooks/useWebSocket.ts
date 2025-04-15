import { useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  Message,
  ChatRoom,
} from '../models/websocket';

const SOCKET_URL = 'http://localhost:3000'; // 서버 URL

export const useWebSocket = () => {
  const socketRef = useRef<Socket>();

  useEffect(() => {
    // 소켓 연결
    socketRef.current = io(SOCKET_URL);

    // 연결 이벤트 리스너
    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // 메시지 전송
  const sendMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    socketRef.current?.emit('sendMessage', message);
  }, []);

  // 채팅방 생성
  const createRoom = useCallback(
    (room: Omit<ChatRoom, 'id' | 'messages' | 'created'>) => {
      socketRef.current?.emit('createRoom', room);
    },
    [],
  );

  // 채팅방 참여
  const joinRoom = useCallback((roomId: string) => {
    socketRef.current?.emit('joinRoom', roomId);
  }, []);

  // 채팅방 나가기
  const leaveRoom = useCallback((roomId: string) => {
    socketRef.current?.emit('leaveRoom', roomId);
  }, []);

  // 이벤트 리스너 등록
  const onMessageReceived = useCallback((callback: (message: Message) => void) => {
    socketRef.current?.on('messageReceived', callback);
    return () => {
      socketRef.current?.off('messageReceived', callback);
    };
  }, []);

  const onRoomUpdated = useCallback((callback: (room: ChatRoom) => void) => {
    socketRef.current?.on('roomUpdated', callback);
    return () => {
      socketRef.current?.off('roomUpdated', callback);
    };
  }, []);

  const onError = useCallback((callback: (error: Error) => void) => {
    socketRef.current?.on('error', callback);
    return () => {
      socketRef.current?.off('error', callback);
    };
  }, []);

  return {
    // 이벤트 발신 메서드
    sendMessage,
    createRoom,
    joinRoom,
    leaveRoom,
    // 이벤트 수신 메서드
    onMessageReceived,
    onRoomUpdated,
    onError,
    // 소켓 인스턴스
    socket: socketRef.current,
  };
}; 