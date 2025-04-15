import React from 'react';
import { Message } from '../../models/websocket';

interface ChatMessageProps {
  message: Message;
  isSelf: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isSelf }) => {
  return (
    <div className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isSelf
            ? 'bg-blue-500 text-white rounded-br-3xl'
            : 'bg-gray-200 text-gray-800 rounded-bl-3xl'
        }`}
      >
        <div className="text-sm font-medium mb-1">
          {isSelf ? '나' : message.from}
        </div>
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div className="text-xs mt-1 opacity-70">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}; 