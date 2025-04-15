import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChatScreen } from '@/components/chat/ChatScreen';
import { useWebSocket } from '../../hooks/useWebSocket';
import { Message } from '../../models/websocket';

const ChatPage: React.FC = () => {
  const { roomId } = useParams<{ roomId?: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>(roomId || 'default');
  const currentUser = 'user1'; // 실제로는 로그인한 사용자 정보를 사용해야 합니다

  const {
    sendMessage,
    joinRoom,
    onMessageReceived,
    onError,
  } = useWebSocket();

  // WebSocket 이벤트 리스너 설정
  useEffect(() => {
    const cleanupMessage = onMessageReceived((message) => {
      setMessages((prev) => [...prev, message]);
    });

    const cleanupError = onError((error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      cleanupMessage();
      cleanupError();
    };
  }, []);

  // 채팅방 참여
  useEffect(() => {
    if (roomId && roomId !== currentRoom) {
      setCurrentRoom(roomId);
    }
    joinRoom(currentRoom);
  }, [currentRoom, roomId]);

  const handleSendMessage = (content: string) => {
    sendMessage({
      from: currentUser,
      to: currentRoom,
      content,
      type: 'text',
    });
  };

  return (
    <div className="flex h-full">
      {/* 사이드바 */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="space-y-2">
            <button
              onClick={() => setCurrentRoom('default')}
              className={`w-full text-left p-3 rounded-lg ${
                currentRoom === 'default'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              기본 채팅방
            </button>
          </div>
        </div>
      </div>

      {/* 메인 채팅 영역 */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <ChatScreen
            messages={messages}
            onSendMessage={handleSendMessage}
            isDisabled={false}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 