import React from 'react';
import { ChatList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const ChatSidebar = ({ contacts, groups }) => {
  const allChats = [
    ...contacts.map(contact => ({
      ...contact,
      avatar: contact.profilePic // assuming each contact has a profilePic field
    })),
    ...groups.map(group => ({
      ...group,
      avatar: group.groupAvatar // assuming each group has a groupAvatar field
    }))
  ];

  return (
    <div className="w-1/4 bg-gray-200 h-screen overflow-y-auto">
      <ChatList
        className="chat-list"
        dataSource={allChats}
        onClick={(chat) => console.log('clicked on chat:', chat)}
      />
    </div>
  );
};

export default ChatSidebar;
