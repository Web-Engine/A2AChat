import React, { useRef, useEffect } from 'react';
import { Message } from '../../interfaces/websocket';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface ChatScreenProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isDisabled?: boolean;
  currentUser: string;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  messages,
  onSendMessage,
  isDisabled = false,
  currentUser,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isSelf={message.from === currentUser}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={onSendMessage} isDisabled={isDisabled} />
    </div>
  );
}; 