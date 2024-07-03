// src/components/ChatFeed.js
import React from 'react';
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const ChatFeed = ({ messages }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageBox
          key={index}
          position={message.position}
          type={message.type}
          text={message.text}
          date={new Date(message.date)}
        />
      ))}
    </div>
  );
};

export default ChatFeed;
