import React from 'react';
import { ChatFeed } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const IndividualChat = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <ChatFeed
        className="chat-feed"
        messages={messages}
        hasInputField={false} // Set to true if you want to include Input component within ChatFeed
      />
    </div>
  );
};

export default IndividualChat;
