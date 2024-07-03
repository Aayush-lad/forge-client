import React from 'react';
import { ChatFeed, Input } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const GroupChat = ({ group }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="rounded-full bg-blue-500 text-white text-center w-10 h-10 flex items-center justify-center mr-3">
            G
          </div>
          <div className="flex-1">
            <div className="font-semibold">{group.name}</div>
            <div className="text-gray-500">Group Chat</div>
          </div>
        </div>
        <ChatFeed
          className="chat-feed"
          messages={[
            {
              id: '1',
              senderName: 'John Doe',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              text: 'Hello everyone!',
              date: new Date(),
            },
            // Add more messages as needed
          ]}
          hasInputField={false} // Set to true if you want to include Input component within ChatFeed
        />
      </div>
      <div className="p-2 border-t border-gray-300">
        <Input
          placeholder="Type your message here..."
          multiline={false}
          rightButtons={
            <button
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          }
        />
      </div>
    </div>
  );
};

export default GroupChat;
