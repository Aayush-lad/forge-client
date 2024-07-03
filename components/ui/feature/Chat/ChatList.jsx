import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatList = ({ userId, onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const socket = io('http://localhost:5000');

  useEffect(() => {
    // Fetch chat rooms or groups from server (mock implementation)
    const fetchChats = async () => {
      // Replace with actual API call to fetch chat rooms/groups
      const mockChats = [
        { id: 'chatRoom1', name: 'Private Chat with User A', isPrivate: true },
        { id: 'chatRoom2', name: 'Group Chat - Team Alpha', isPrivate: false },
      ];
      setChats(mockChats);
    };

    fetchChats();

    // Cleanup socket on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Chat List</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <button onClick={() => onSelectChat(chat.id)}>
              {chat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
